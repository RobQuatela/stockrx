import React from 'react';
import StockListItem from './stock-list-item';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  stockList: {
    height: 400,
    margin: 30,
    padding: 10,
    //backgroundColor: '#384047',
    //boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    //borderRadius: 4,
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