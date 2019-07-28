import React from 'react';
import { Icon, IconButton, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as numeral from 'numeral';

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
  stockListItem: {
    display: 'grid',
    gridTemplateColumns: '15% auto 30% 10%',
    backgroundColor: '#1e272e',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    margin: 10,
    padding: '10px 16px',
    borderRadius: 4,
    width: '42%',
    '& h1, h2, h3, h4, h5, h6': {
      margin: 0,
      alignSelf: 'center',
    },
    '& h4': {
      fontSize: '2rem',
      color: '#3cff3c',
    },
  }
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
          <Icon>remove_circle_outline</Icon>
        </IconButton>
      );
    }
  }

  const formatMoney = (value) => `$${numeral(value).format('(0,0.00)')}`;

  return (
    <div className={classes.stockListItem}>
      <Button onClick={() => props.handleSelectStock(props.stock)}>
        <h5>{props.stock.symbol}</h5>
      </Button>
      <div className={classes.centered}>
        <h4>{formatMoney(props.stock.price)}</h4>
      </div>
      <div className={classes.centered}>
        <IconButton
          color='primary'
          classes={{ colorPrimary: classes.colorPrimary }}
          onClick={() => props.handleBuyStock(props.stock)}
        >
          <Icon>add_circle_outline</Icon>
        </IconButton>
        {showSellStockButton()}
      </div>
      {
        !props.loading ? <h3>{props.stock.sharesOwned}</h3> : <CircularProgress />
      }
    </div>
  )
};

export default StockListItem;