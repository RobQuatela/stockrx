import React, { useState, useEffect } from 'react';
import StockList from './stock-list';
import * as stocksService from '../../common/services/stocks-service';
import * as portfolioService from '../../common/services/portfolio-service';
import './stocks-provider.css';

const StocksProvider = () => {
  const [state, setState] = useState({
    loading: true,
    stocks: [],
    filteredStocks: [],
  });

  useEffect(() => {
    stocksService.stocksStateWithSharesOwned$.subscribe(stockServiceState => {
      setState({
        loading: stockServiceState.loading,
        stocks: stockServiceState.stocks,
        filteredStocks: stockServiceState.stocks,
      });
    });

    //return subscription.unsubscribe();
  }, []);

  // const handleRefresh = async () => {
  //   await stocksService.findall();
  // }

  // const handleSearch = (word) => {
  //   if (word === '') {
  //     setState({
  //       ...state,
  //       filteredStocks: state.stocks,
  //     });
  //   } else {
  //     setState({
  //       ...state,
  //       filteredStocks: state.stocks.filter(x => x.symbol.toLowerCase().indexOf(word.toLowerCase()) > -1),
  //     });
  //   }
  // }

  const handleBuyStock = (stock) => {
    portfolioService.buyStock(stock);
  }

  const handleSellStock = (stock) => {
    portfolioService.sellStock(stock);
  }

  return (
    <div className='stocks-provider'>
      {/* <StocksMenu 
        handleRefresh={handleRefresh} 
        handleSearch={handleSearch}
      /> */}
      <h2>Stocks</h2>
      <StockList 
        loading={state.loading}
        stocks={state.filteredStocks}
        handleBuyStock={handleBuyStock}
        handleSellStock={handleSellStock}
      />
    </div>
  );
};

export default StocksProvider;