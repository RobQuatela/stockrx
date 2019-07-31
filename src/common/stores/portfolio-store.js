import { BehaviorSubject } from "rxjs";
import * as snackBarStore from './snackbar-store';
import * as notificationsStore from './notifications-store';
import * as activitiesStore from './activities-store';
import * as numeral from 'numeral';
import * as moment from 'moment';
import { tap, withLatestFrom, scan, shareReplay } from "rxjs/operators";

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

const actions$ = new BehaviorSubject(initialState);

export const dispatch = (action) => {
  actions$.next(action);
}

const reduce = (state, action) => {
  let next;
  switch (action.type) {
    case 'BUY_STOCK_SUCCESS':
      next = {
        ...state,
        wallet: action.payload.wallet,
        stocks: action.payload.stocks,
      }
      break;
    case 'SELL_STOCK_SUCCESS':
      next = {
        ...state,
        wallet: action.payload.wallet,
        stocks: action.payload.stocks,
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

/*
GETTERS
*/
export const portfolio$ = actions$
  .pipe(
    scan((acc, curr) => reduce(acc, curr)),
    shareReplay(1),
  );

/*
  SIDE EFFECTS
*/
const buyStockEffect$ = actions$
  .pipe(
    withLatestFrom(portfolio$),
    tap(([action, state]) => {
      if (action.type === 'BUY_STOCK') {
        // copy current state object: stocks
        const stocks = [...state.stocks];
        let wallet = state.wallet;

        // look for a match with the stock purchased within the current portofolio stock
        // if there is a match, increment the number of shares owned
        // if there is no match, add the stock to the portfolio stocks
        const match = stocks.findIndex(x => x.symbol === action.payload.symbol);

        if (match > - 1) {
          stocks[match].shares++;
        } else {
          stocks.push({
            symbol: action.payload.symbol,
            price: action.payload.price,
            shares: 1,
          });
        }

        // decrement wallet amount for purchasing stock
        wallet = wallet - action.payload.price;

        // send off snackbar action
        snackBarStore.dispatch({
          type: 'SHOW_SNACKBAR',
          payload: `Purchased 1 share of ${action.payload.name} stock for your portfolio`
        });

        // send off notifications action
        notificationsStore.dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date(),
            message: `Your portfolio is now at $${numeral(stocks.map(x => x.price * x.shares).reduce((a, b) => a + b)).format('0,0.00')}`,
            createdAt: moment().fromNow(),
          }
        });

        // send off notifications action
        activitiesStore.dispatch({
          type: 'LOG_ACTIVITY',
          payload: {
            id: new Date(),
            message: `Refreshed available stocks`,
            createdAt: moment().format('H:MM:SS'),
          }
        });

        // send off buy stock success action
        dispatch({ type: 'BUY_STOCK_SUCCESS', payload: { wallet, stocks } });
      }
    }),
  );

const sellStockEffect$ = actions$
  .pipe(
    withLatestFrom(portfolio$),
    tap(([action, state]) => {
      if (action.type === 'SELL_STOCK') {
        // make copy of current state object: stocks
        let stocks = [...state.stocks];
        let wallet = state.wallet;

        // look for a match with the stock purchased within the current portofolio stock
        // if there is a match, decrement the number of shares owned
        // if the shares owned of that stock is 0, then remove that stock from the portfolio
        const matchIndex = stocks.findIndex(x => x.symbol === action.payload.symbol);
        if (matchIndex > -1) {
          if (stocks[matchIndex].shares > 1) {
            stocks[matchIndex].shares--;
          } else {
            stocks[matchIndex].shares--;
            stocks = stocks.filter(x => x.symbol !== action.payload.symbol);
          }
        }

        wallet = wallet + action.payload.price;

        // send off snackbar action
        snackBarStore.dispatch({
          type: 'SHOW_SNACKBAR',
          payload: `Sold 1 share of ${action.payload.symbol} stock from your portfolio`
        });

        // send off notifications action
        notificationsStore.dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: new Date(),
            message: `Your portfolio is now at $${numeral(stocks.map(x => x.price * x.shares).reduce((a, b) => a + b)).format('0,0.00')}`,
            createdAt: moment().fromNow(),
          }
        });

        // send off activities action
        activitiesStore.dispatch({
          type: 'LOG_ACTIVITY',
          payload: {
            id: new Date(),
            message: `Refreshed available stocks`,
            createdAt: moment().format('H:MM:SS'),
          }
        });

        // give the behavior subject a new state
        dispatch({ type: 'SELL_STOCK_SUCCESS', payload: { wallet, stocks } });
      }
    }),
  );

buyStockEffect$.subscribe();
sellStockEffect$.subscribe();