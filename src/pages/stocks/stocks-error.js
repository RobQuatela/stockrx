import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'red',
  },
});

const StocksError = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h4>We are sorry, the Financial Modeling Prep API is down</h4>
      <p>
        For detailed financial information, please visit
        <a className={classes.link} target='_blank' rel='noopener noreferrer' href='https://financialmodelingprep.com'>
          &nbsp; Financial Modeling Prep
        </a>
      </p>
    </div>
  );
};

export default StocksError;