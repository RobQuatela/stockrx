import { BehaviorSubject } from "rxjs";
import { map, combineLatest } from 'rxjs/operators';
import * as portfolioStore from './portfolio-store';
import * as activitiesStore from './activities-store';
import * as moment from 'moment';

const initialstate = {
  loading: true,
  stocks: [],
};

const stocksSubject = new BehaviorSubject(initialstate);

/*
  EFFECTS
*/
const effects = {
  findAll: async () => {
    const result = await fetch('https://financialmodelingprep.com/api/v3/company/stock/list').then(res => res.json());

    // launches new action for a successful api call
    actions.refreshSuccess(result.symbolsList.slice(0, 300));

    // send off activities action
    activitiesStore.actions.add({
      id: new Date(),
      message: `Refreshed available stocks`,
      createdAt: moment().format('H:MM:SS'),
    });
  }
}

/*
  ACTIONS
*/
export const actions = {
  refresh: async () => {
    // reduce new state to reflect loading
    stocksSubject.next({
      ...stocksSubject.value,
      loading: true,
    });
    // effect
    await effects.findAll();
  },
  refreshSuccess: (payload) => {
    stocksSubject.next({
      ...stocksSubject.value,
      loading: false,
      stocks: payload,
    });
  },
};

/*
  GETTERS
*/
export const availableStocksState$ = stocksSubject.asObservable();

// combine stock state data with portfolio data using combineLatest operator to
// return a new observable containing stock state modified by portfolio data
export const availableStocksStateWithSharesOwned$ =
  availableStocksState$
    .pipe(
      combineLatest(portfolioStore.portfolio$),
      map(([stocksState, portfolioState]) => {
        return {
          loading: stocksState.loading,
          stocks: stocksState.stocks.map(stock => {
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
          })
        };
      }),
    );

// return new observable containing the top 5 performing stocks based upon price per share
export const bestPerformingStocks$ = availableStocksState$
  .pipe(
    map(state => {
      const stocks = [...state.stocks];
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