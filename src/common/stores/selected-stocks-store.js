import { BehaviorSubject } from "rxjs";
import * as activitiesStore from './activities-store';
import * as moment from 'moment';
import { tap, withLatestFrom, scan } from "rxjs/operators";

const initialState = {
  stocks: [],
  loading: false,
};

const selectedStocksSubject = new BehaviorSubject(initialState);
const actions$ = new BehaviorSubject(initialState);

const effects = {
  findProfile: async (stock) => {
    const result = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${stock.symbol}`).then(res => res.json());

    return result.profile;
  },
  findFinancials: async (stock) => {
    const result = await fetch(`https://financialmodelingprep.com/api/v3/financials/income-statement/${stock.symbol}`).then(res => res.json());
    return result.financials;
  },
  findDetail: async (stock) => {
    const profile = await effects.findProfile(stock);
    const financials = await effects.findFinancials(stock);
    const selectedStock = {
      stockInfo: stock,
      profile,
      financials,
    };

    // send off activities action
    activitiesStore.dispatch({
      type: 'LOG_ACTIVITY',
      payload: {
        id: new Date(),
        message: `Refreshed available stocks`,
        createdAt: moment().format('H:MM:SS'),
      }
    });

    actions.selectSuccess(selectedStock);
  },
  removeStock: (stock) => {
    // send off activities action
    activitiesStore.dispatch({
      type: 'LOG_ACTIVITY',
      payload: {
        id: new Date(),
        message: `Refreshed available stocks`,
        createdAt: moment().format('H:MM:SS'),
      }
    });
  },
};

export const dispatch = (action) => {
  actions$.next(action);
}

export const actions = {
  select: async (stock) => {
    // if stock is not already in the list
    if (selectedStocksSubject.value.stocks.findIndex(x => x.symbol === stock.symbol) === -1) {
      // mutate state to show loading
      selectedStocksSubject.next({
        ...selectedStocksSubject.value,
        loading: true,
      });

      await effects.findDetail(stock);
    }
  },
  selectSuccess: (stock) => {
    // mutate state to show new available stock state
    selectedStocksSubject.next({
      ...selectedStocksSubject.value,
      stocks: [...selectedStocksSubject.value.stocks, stock],
      loading: false,
    });
  },
  remove: (stock) => {
    // remove stock from available stock state
    selectedStocksSubject.next({
      ...selectedStocksSubject.value,
      stocks: selectedStocksSubject.value.stocks.filter(x => x.stockInfo.symbol !== stock.stockInfo.symbol),
    });

    // side effects for remove....launch activity action
    effects.removeStock(stock);
  },
};

const reducer = (state, action) => {
  let next;
  console.log(action.type);
  switch (action.type) {
    case 'SELECT_STOCK':
      next = {
        ...state,
        loading: true,
      };
      break;
    case 'SELECT_STOCK_SUCCESS':
      next = {
        ...state,
        loading: false,
        stocks: [...state.stocks, action.payload],
      };
      break;
    case 'SELECT_STOCK_FAIL':
      next = {
        ...state,
        loading: false,
      };
      break;
    case 'REMOVE_STOCK':
      next = {
        ...state,
        stocks: state.stocks.filter(x => x.stockInfo.symbol !== action.payload.stockInfo.symbol),
      };
      break;
    default:
      next = {
        ...state,
      };
  }

  window.devTools.send(action.type, next);

  return next;
}

export const selectedStocks1$ = selectedStocksSubject.asObservable();
export const selectedStocks$ = actions$
  .asObservable()
  .pipe(
    scan((acc, curr) => reducer(acc, curr)),
  );

const findSelectedStockEffect$ = actions$
  .pipe(
    tap(action => {
      if (action.type === 'SELECT_STOCK') {
        const stock = action.payload
        activitiesStore.dispatch({
          type: 'LOG_ACTIVITY',
          id: new Date(),
          message: `Selected ${stock.name} stock to view`,
          createdAt: moment().format('H:MM:SS'),
        })
      }
    }),
    withLatestFrom(selectedStocks$),
    tap(async ([action, state]) => {
      if (action.type === 'SELECT_STOCK') {
        if (!stockIsDuplicate(action.payload, state.stocks)) {
          try {
            const stock = action.payload;
            const stockProfileResult = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${stock.symbol}`).then(res => res.json());
            const stockIncomeStatementResult = await fetch(`https://financialmodelingprep.com/api/v3/financials/income-statement/${stock.symbol}`).then(res => res.json());

            const selectedStock = {
              stockInfo: stock,
              profile: stockProfileResult.profile,
              financials: stockIncomeStatementResult.financials,
            };

            dispatch({
              type: 'SELECT_STOCK_SUCCESS',
              payload: selectedStock,
            });
          } catch (err) {
            dispatch({
              type: 'SELECT_STOCK_FAIL',
              payload: err,
            });
          }
        } else {
          dispatch({
            type: 'SELECT_STOCK_FAIL',
          });
        }
      }
    }),
  );

const removeSelectedStockEffect$ = actions$
  .pipe(
    tap(action => {
      if (action.type === 'SELECT_STOCK') {
        activitiesStore.dispatch({
          type: 'LOG_ACTIVITY',
          id: new Date(),
          message: `Removed ${action.payload.name} stock from view`,
          createdAt: moment().format('H:MM:SS'),
        })
      }
    }),
  );

findSelectedStockEffect$.subscribe();
removeSelectedStockEffect$.subscribe();

const stockIsDuplicate = (selectedStock, stocks) => {
  return stocks.findIndex(x => x.stockInfo.symbol === selectedStock.symbol) > - 1;
}