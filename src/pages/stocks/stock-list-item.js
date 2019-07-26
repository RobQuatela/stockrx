import React from 'react';
import './stock-list-item.css';
import { Icon, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  colorPrimary: {
    color: '#04a9f4',
  },
  colorSecondary: {
    color: 'red',
  },
  centered: {
    alignSelf: 'center',
  },
});

const StockListItem = (props) => {
  const classes = useStyles();

  // if the shares owned of a stock is greater than 0, show this component
  const showSellStockButton = () => {
    if (props.stock.sharesOwned > 0) {
      return (
        <IconButton
          color='primary'
          classes={{ colorPrimary: classes.colorSecondary }}
          onClick={() => props.handleSellStock(props.stock)}
        >
          <Icon>thumb_down</Icon>
        </IconButton>
      );
    }
  }

  return (
    <div className='stock-list-item'>
      <h5>{props.stock.symbol}</h5>
      <div className={classes.centered}>
        <h4>${props.stock.price}</h4>
      </div>
      <div className={classes.centered}>
        <IconButton
          color='primary'
          classes={{ colorPrimary: classes.colorPrimary }}
          onClick={() => props.handleBuyStock(props.stock)}
        >
          <Icon>thumb_up</Icon>
        </IconButton>
        {showSellStockButton()}
      </div>
      <h3>{props.stock.sharesOwned}</h3>
    </div>
  )
};

export default StockListItem;