import { BehaviorSubject } from "rxjs";
import { map, combineLatest, scan, shareReplay, tap } from 'rxjs/operators';
import * as portfolioStore from './portfolio-store';
import * as activitiesStore from './activities-store';
import * as moment from 'moment';

const initialstate = {
  loading: true,
  stocks: [],
  error: false,
};

const actions$ = new BehaviorSubject(initialstate);

// dispatch function is used to accumulate actions in the Actions subject
// and perform side effects
export const dispatch = async (action) => {
  actions$.next(action);
};

// reduce the state the actions$ observable is sending to subscribers
// to include properties that you would like to have depending on the action dispatched
const reduce = (state, action) => {
  let next;
  switch (action.type) {
    case 'REFRESH_AVAILABLE_STOCKS':
      next = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case 'REFRESH_AVAILABLE_STOCKS_SUCCESS':
      next = {
        ...state,
        loading: false,
        error: false,
        stocks: action.payload,
      };
      break;
    case 'REFRESH_AVAILABLE_STOCKS_FAIL':
      next = {
        ...state,
        loading: false,
        error: true,
      };
      break;
    default:
      next = {
        ...state,
      };
  }

  window.devTools.send(action.type, next);
  return next;
};

/*
  GETTERS
*/
export const availableStocksState$ = actions$
  .pipe(
    // accumulated state is the last action the action subject has
    // the current state is the newest action that was added to the subject
    scan((acc, curr) => reduce(acc, curr)),
    // share replay will only display the last piece of state to all subscribers
    shareReplay(1),
  );

// combine stock state data with portfolio data using combineLatest operator to
// return a new observable containing stock state modified by portfolio data
export const availableStocksStateWithSharesOwned$ =
  availableStocksState$
    .pipe(
      combineLatest(portfolioStore.portfolio$),
      map(([stocksState, portfolioState]) => {
        return {
          error: stocksState.error,
          loading: stocksState.loading,
          stocks: stocksState.stocks ? stocksState.stocks.map(stock => {
            const index = portfolioState.stocks.findIndex(x => x.symbol === stock.symbol);
            let sharesOwned = 0;
            if (index > -1) {
              sharesOwned = portfolioState.stocks[index].shares;
            }
            return {
              symbol: stock.symbol,
              price: stock.price,
              sharesOwned,
            };
          }) : [],
        };
      }),
    );

// return new observable containing the top 5 performing stocks based upon price per share
export const bestPerformingStocks$ = availableStocksState$
  .pipe(
    map(state => {
      const stocks = state.stocks ? [...state.stocks] : [];
      const orderedStocks = stocks.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });

      return orderedStocks.slice(0, 5);
    }),
  );


/*
EFFECTS
*/
const findall$ = actions$
  .pipe(
    tap(async action => {
      if (action.type === 'REFRESH_AVAILABLE_STOCKS') {
        try {
          const result = await fetch('https://financialmodelingprep.com/api/v3/company/stock/list').then(res => res.json());

          // launches new action for a successful api call
          dispatch({ type: 'REFRESH_AVAILABLE_STOCKS_SUCCESS', payload: result.symbolsList.slice(0, 100) });

          // send off activities action
          activitiesStore.dispatch({
            type: 'LOG_ACTIVITY',
            payload: {
              id: new Date(),
              message: `Refreshed available stocks`,
              createdAt: moment().format('H:MM:SS'),
            }
          });
        } catch (err) {
          // send action to create new state for failed refresh
          dispatch({ type: 'REFRESH_AVAILABLE_STOCKS_FAIL' });

          // send off activity logging
          activitiesStore.dispatch({
            type: 'LOG_ACTIVITY',
            payload: {
              id: new Date(),
              message: `Failed to refresh available stocks`,
              createdAt: moment().format('H:MM:SS'),
            }
          });
        }
      }
    }));

findall$.subscribe();