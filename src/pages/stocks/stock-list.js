import React from 'react';
import './stock-list.css';
import StockListItem from './stock-list-item';
import { CircularProgress } from '@material-ui/core';

const StockList = (props) => {

  const showStockList = () => {
    if (!props.loading) {
      return (
        <div className='stock-list'>
          {
            props.stocks.map(stock => (
              <StockListItem
                key={stock.symbol}
                stock={stock}
                handleBuyStock={props.handleBuyStock}
                handleSellStock={props.handleSellStock}
              />))}
        </div>
      );
    } else {
      return (
        <div className='stock-list stock-list-loading'>
          <CircularProgress color='primary' />
        </div>
      );
    }
  }

  return showStockList();
}

export default StockList;