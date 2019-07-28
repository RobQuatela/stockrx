import { BehaviorSubject } from "rxjs";
import * as activitiesStore from './activities-store';
import * as moment from 'moment';

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
  findDetail: async (stock) => {
    const profile = await effects.findProfile(stock);
    const financials = await effects.findFinancials(stock);
    const selectedStock = {
      stockInfo: stock,
      profile,
      financials,
    };

    // send off activities action
    activitiesStore.actions.add({
      id: new Date(),
      message: `Selected ${stock.symbol} to view`,
      createdAt: moment().format('H:MM:SS'),
    });

    actions.selectSuccess(selectedStock);
  },
  removeStock: (stock) => {
    // send off activities action
    activitiesStore.actions.add({
      id: new Date(),
      message: `Closed ${stock.stockInfo.symbol} detail view`,
      createdAt: moment().format('H:MM:SS'),
    });
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

export const selectedStocks$ = selectedStocksSubject.asObservable();