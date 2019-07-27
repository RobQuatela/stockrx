import React from 'react';
import { makeStyles, Paper, IconButton, Icon } from '@material-ui/core';
import SelectedStockFinancials from './selected-stock-financials';
import SelectedStockProfile from './selected-stock-profile';

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  companyDetail: {
    color: '#000',
    padding: 30,
    paddingTop: 0,
  },
});

const SelectedStock = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton color='secondary' onClick={() => props.onremovestock(props.stock)}>
        <Icon>close</Icon>
      </IconButton>
      <div className={classes.companyDetail}>
        <h4>Profile</h4>
        <SelectedStockProfile
          profile={props.stock.profile}
        />
        <h4>Financial Performance</h4>
        <div className='financials'>
          {props.stock.financials.length > 0 ?
            <SelectedStockFinancials
              financials={props.stock.financials}
            />
            :
            <div>
              <p>No financial information</p>
            </div>
          }
        </div>
      </div>
    </Paper>
  );
};

export default SelectedStock;