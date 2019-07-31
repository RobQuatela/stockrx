import { BehaviorSubject } from "rxjs";
import * as activitiesStore from './activities-store';
import * as dialogStore from './dialog-store';
import * as moment from 'moment';
import { tap, withLatestFrom, scan, shareReplay } from "rxjs/operators";

const initialState = {
  stocks: [],
  loading: false,
};

const actions$ = new BehaviorSubject(initialState);

export const dispatch = (action) => {
  actions$.next(action);
}

// reducer to create new state object to pass to subscribers of observable
const reducer = (state, action) => {
  let next;
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
    case 'REMOVE_SELECTED_STOCK':
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

export const selectedStocks$ = actions$
  .asObservable()
  .pipe(
    scan((acc, curr) => reducer(acc, curr)),
    shareReplay(1),
  );

const findSelectedStockEffect$ = actions$
  .pipe(
    tap(action => {
      if (action.type === 'SELECT_STOCK') {
        activitiesStore.dispatch({
          type: 'LOG_ACTIVITY',
          payload: {
            id: new Date(),
            message: `Selected ${action.payload.symbol} stock to view`,
            createdAt: moment().format('H:MM:SS'),
          },
        })
      }
    }),
    withLatestFrom(selectedStocks$),
    tap(async ([action, state]) => {
      if (action.type === 'SELECT_STOCK') {
        // if stock is not already on the selected stocks list, get information and add to list
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
          // if stock is already on list, dispatch actions to update selected stock state, as well as an action to modal store to
          // handle modal dialog
          dispatch({
            type: 'SELECT_STOCK_FAIL',
          });

          // call out to dialog store to dispatch action to show error dialog
          dialogStore.dispatch({
            type: 'SHOW_DIALOG',
            payload: {
              title: 'Duplicate Stock',
              content: `Unable to open ${action.payload.symbol}. It is already open`,
            },
          });
        }
      }
    }),
  );

const removeSelectedStockEffect$ = actions$
  .pipe(
    tap(action => {
      if (action.type === 'REMOVE_SELECTED_STOCK') {
        activitiesStore.dispatch({
          type: 'LOG_ACTIVITY',
          payload: {
            id: new Date(),
            message: `Removed ${action.payload.stockInfo.symbol} stock from view`,
            createdAt: moment().format('H:MM:SS'),
          },
        });
      }
    }),
  );

findSelectedStockEffect$.subscribe();
removeSelectedStockEffect$.subscribe();

const stockIsDuplicate = (selectedStock, stocks) => {
  return stocks.findIndex(x => x.stockInfo.symbol === selectedStock.symbol) > - 1;
}