import { BehaviorSubject } from "rxjs";
import * as snackBarStore from './snackbar-store';
import * as notificationsStore from './notifications-store';
import * as activitiesStore from './activities-store';
import * as numeral from 'numeral';
import * as moment from 'moment';

/*
  STATE OBJECT
*/
const initialState = {
  stocks: [
    {
      symbol: 'INTC',
      price: 51.58,
      shares: 2,
    },
    {
      symbol: 'CMCSA',
      price: 44.63,
      shares: 10,
    },
    {
      symbol: 'KMI',
      price: 20.86,
      shares: 25,
    },
  ],
  wallet: 10000,
  name: 'Rob Quatela',
  createdAt: new Date(),
};

const portfolioSubject = new BehaviorSubject(initialState);

/*
  EFFECTS
*/
const effects = {
  buyStock: (stock, portfolioState) => {
    // copy current state object: stocks
    const stocks = [...portfolioState.stocks];
    let wallet = portfolioState.wallet;

    // look for a match with the stock purchased within the current portofolio stock
    // if there is a match, increment the number of shares owned
    // if there is no match, add the stock to the portfolio stocks
    const match = stocks.findIndex(x => x.symbol === stock.symbol);

    if (match > - 1) {
      stocks[match].shares++;
    } else {
      stocks.push({
        symbol: stock.symbol,
        price: stock.price,
        shares: 1,
      });
    }

    // decrement wallet amount for purchasing stock
    wallet = wallet - stock.price;

    // send off snackbar action
    snackBarStore.actions.show(`Purchased 1 share of ${stock.symbol} stock for your portfolio`);

    // send off notifications action
    notificationsStore.actions.add({
      id: new Date(),
      message: `Your portfolio is now at $${numeral(stocks.map(x => x.price * x.shares).reduce((a, b) => a + b)).format('0,0.00')}`,
      createdAt: moment().fromNow(),
    });

    // send off notifications action
    activitiesStore.actions.add({
      id: new Date(),
      message: `Purchased 1 share of ${stock.symbol} stock for your portfolio`,
      createdAt: moment().format('HH:MM:SS'),
    });

    // return new portfolio state object
    actions.buyStockSuccess({ wallet, stocks });
  },
  sellStock: (stock, portfolioState) => {
    // make copy of current state object: stocks
    let stocks = [...portfolioState.stocks];
    let wallet = portfolioState.wallet;

    // look for a match with the stock purchased within the current portofolio stock
    // if there is a match, decrement the number of shares owned
    // if the shares owned of that stock is 0, then remove that stock from the portfolio
    const matchIndex = stocks.findIndex(x => x.symbol === stock.symbol);
    if (matchIndex > -1) {
      if (stocks[matchIndex].shares !== 0) {
        stocks[matchIndex].shares--;
      } else {
        stocks = stocks.filter(x => x.symbol !== stock.symbol);
      }
    }

    wallet = wallet + stock.price;

    // send off snackbar action
    snackBarStore.actions.show(`Sold 1 share of ${stock.symbol} stock from your portfolio`);

    // send off notifications action
    notificationsStore.actions.add({
      id: new Date(),
      message: `Your portfolio is now at $${numeral(stocks.map(x => x.price * x.shares).reduce((a, b) => a + b)).format('0,0.00')}`,
      createdAt: moment().fromNow(),
    });

    // send off activities action
    activitiesStore.actions.add({
      id: new Date(),
      message: `Sold 1 share of ${stock.symbol} stock from your portfolio`,
      createdAt: moment().format('H:MM:SS'),
    });

    // give the behavior subject a new state
    actions.sellStockSuccess({ wallet, stocks });
  },
}

/*
  ACTIONS
*/
export const actions = {
  buyStock: (stock) => {
    // effect
    effects.buyStock(stock, portfolioSubject.value);

  },
  buyStockSuccess: (payload) => {
    portfolioSubject.next({
      ...portfolioSubject.value,
      wallet: payload.wallet,
      stocks: payload.stocks,
    });
  },
  sellStock: (stock) => {
    // effect
    effects.sellStock(stock, portfolioSubject.value);
  },
  sellStockSuccess: (payload) => {
    portfolioSubject.next({
      ...portfolioSubject.value,
      wallet: payload.wallet,
      stocks: payload.stocks,
    });
  }
};

/*
GETTERS
*/
export const portfolio$ = portfolioSubject.asObservable();