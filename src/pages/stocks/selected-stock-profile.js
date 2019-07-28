import React from 'react';
import { makeStyles } from '@material-ui/core';
import * as numeral from 'numeral';

const useStyles = makeStyles({
  profile: {
    display: 'grid',
    gridTemplateColumns: '10% auto',
    gridTemplateRows: '20% auto 20%',
    '& h5, h6': {
      color: 'black',
      margin: 0,
      marginBottom: 10,
    },
    '& h6': {
      justifySelf: 'end',
    },
    '& h5': {
      marginLeft: 20,
      fontWeight: 400,
    },
  },
});

const SelectedStockProfile = (props) => {
  const classes = useStyles();

  const formatMoney = (value) => `$${numeral(value).format('(0,0.00)')}`;

  return (
    <div className={classes.profile}>
      <h6>Name</h6><h5>{props.profile.companyName}</h5>
      <h6>Description:</h6><h5>{props.profile.description}</h5>
      <h6>Stock Price:</h6><h5>{formatMoney(props.profile.price)}</h5>
    </div>
  );
}

export default SelectedStockProfile;