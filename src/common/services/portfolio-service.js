import { BehaviorSubject } from "rxjs";

/*
  STATE OBJECT
*/
const portfolioState = {
  stocks: [
    {
      symbol: 'PALL',
      price: 20.00,
      shares: 20,
    },
  ],
  wallet: 10000,
  name: 'Rob Quatela',
  createdAt: new Date(),
};

const portfolioSubject = new BehaviorSubject(portfolioState);

/*
  EFFECTS
*/
const buyStockEffect = (stock, portfolioState) => {
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

  wallet = wallet - stock.price;
  
  // return new portfolio state object
  return {
    ...portfolioState,
    wallet,
    stocks,
  };
}

const sellStockEffect = (stock, portfolioState) => {
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

  // give the behavior subject a new state
  return {
    ...portfolioState,
    wallet,
    stocks,
  };
}

/*
  ACTIONS
*/
export const buyStock = (stock) => {
  // effect
  const newPortfolioState = buyStockEffect(stock, portfolioSubject.value);
  // push new state
  portfolioSubject.next(newPortfolioState);
}

export const sellStock = (stock) => {
  // effect
  const newPortfolioState = sellStockEffect(stock, portfolioSubject.value);
  // push new state
  portfolioSubject.next(newPortfolioState);
}

/*
GETTERS
*/
export const portfolio$ = portfolioSubject.asObservable();