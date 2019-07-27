import { BehaviorSubject } from "rxjs";

const initialState = {
  stocks: [],
  loading: false,
};

const selectedStocksSubject = new BehaviorSubject(initialState);

const effects = {
  findProfile: async (stock) => {
    const result = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${stock.symbol}`).then(res => res.json());

    return result.profile;
  },
  findFinancials: async (stock) => {
    const result = await fetch(`https://financialmodelingprep.com/api/v3/financials/income-statement/${stock.symbol}`).then(res => res.json());
    return result.financials;
  },
};

export const actions = {
  select: async (stock) => {
    // if stock is not already in the list
    if (selectedStocksSubject.value.stocks.findIndex(x => x.symbol === stock.symbol) === -1) {
      // mutate state to show loading
      selectedStocksSubject.next({
        ...selectedStocksSubject.value,
        loading: true,
      });

      const profile = await effects.findProfile(stock);
      const financials = await effects.findFinancials(stock);
      const selectedStock = {
        stockInfo: stock,
        profile,
        financials,
      };

      selectedStocksSubject.next({
        ...selectedStocksSubject.value,
        stocks: [...selectedStocksSubject.value.stocks, selectedStock],
        loading: false,
      });
    }
  },
  remove: (stock) => {
    selectedStocksSubject.next({
      ...selectedStocksSubject.value,
      stocks: selectedStocksSubject.value.stocks.filter(x => x.stockInfo.symbol !== stock.stockInfo.symbol),
    });
  },
};

export const selectedStocks$ = selectedStocksSubject.asObservable();