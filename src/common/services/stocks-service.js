import { BehaviorSubject } from "rxjs";

const stocksSubject = new BehaviorSubject();

export const stocks$ = stocksSubject.asObservable();

export const findall = async () => {
  const result = await fetch('https://financialmodelingprep.com/api/v3/stock/real-time-price').then(res => res.json());

  stocksSubject.next(result.stockList);

  console.log(stocksSubject.value);
};