import React, { useState, useEffect } from 'react';
import StockList from './stock-list';
import * as stocksStore from '../../common/stores/stocks-store';
import * as portfolioStore from '../../common/stores/portfolio-store';
import './stocks-provider.css';
import StockCharts from './stock-charts';

const StocksProvider = () => {
  const [state, setState] = useState({
    loading: true,
    stocks: [],
    filteredStocks: [],
  });

  useEffect(() => {
    const subscription = stocksStore.stocksStateWithSharesOwned$.subscribe(stockServiceState => {
      setState({
        loading: stockServiceState.loading,
        stocks: stockServiceState.stocks,
        filteredStocks: stockServiceState.stocks,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleBuyStock = (stock) => {
    portfolioStore.actions.buyStock(stock);
  }

  const handleSellStock = (stock) => {
    portfolioStore.actions.sellStock(stock);
  }

  return (
    <div className='stocks-provider'>
      <StockCharts
        data={{ datasets: [{ data: [10, 20, 30] }], labels: ['Red', 'Yellow', 'Blue'] }}
      />
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