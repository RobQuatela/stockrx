import React from 'react';
import StockListItem from './stock-list-item';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  stockList: {
    height: 450,
    margin: 30,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  stockListLoading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-height: 800px)': {
    stockList: {
      height: 250,
    },
  },
})

const StockList = (props) => {
  const classes = useStyles();

  const showStockList = () => {
    if (!props.loading) {
      return (
        <div className={classes.stockList}>
          {
            props.stocks.map(stock => (
              <StockListItem
                key={stock.symbol}
                stock={stock}
                handleBuyStock={props.handleBuyStock}
                handleSellStock={props.handleSellStock}
                handleSelectStock={props.handleSelectStock}
                loading={props.selectedStockLoading}
              />))}
        </div>
      );
    } else {
      return (
        <div className={`${classes.stockList} ${classes.stockListLoading}`}>
          <CircularProgress color='primary' />
        </div>
      );
    }
  }

  return showStockList();
}

export default StockList;