import React from 'react';
import StockListItem from './stock-list-item';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  stockList: {
    height: 400,
    margin: 30,
    padding: 10,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  stockListLoading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CircularProgressColorPrimary: {
    color: '#ace5ff',
  },
  '@media (max-height: 800px)': {
    stockList: {
      height: 200,
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
                loading={props.selectedStockLoading}
              />))}
        </div>
      );
    } else {
      return (
        <div className={`${classes.stockList} ${classes.stockListLoading}`}>
          <CircularProgress color='primary' classes={{ colorPrimary: classes.CircularProgressColorPrimary }} />
        </div>
      );
    }
  }

  return showStockList();
}

export default StockList;