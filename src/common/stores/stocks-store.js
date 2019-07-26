import { BehaviorSubject } from "rxjs";
import { map, combineLatest } from 'rxjs/operators';
import * as portfolioStore from './portfolio-store';

const stockState = {
  loading: true,
  stocks: [],
};

const stocksSubject = new BehaviorSubject(stockState);

export const stockState$ = stocksSubject.asObservable();

export const stocksStateWithSharesOwned$ =
  stockState$
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

export const findall = async () => {
  stocksSubject.next({
    ...stocksSubject.value,
    loading: true,
  });

  const result = await fetch('https://financialmodelingprep.com/api/v3/stock/real-time-price').then(res => res.json());

  stocksSubject.next({
    loading: false,
    stocks: result.stockList.slice(0, 200),
  });
};