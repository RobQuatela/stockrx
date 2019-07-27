import React from 'react';
import { makeStyles } from '@material-ui/styles';
import * as numeral from 'numeral';

const useStyles = makeStyles({
  root: {
    margin: 30,
    backgroundColor: '#384047',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    display: 'grid',
    borderRadius: 4,
    gridTemplateColumns: '20% auto',
    gridTemplateRows: '33% 33% auto',
  },
  extraSpace: {
    margin: 15,
  },
  endAlign: {
    justifySelf: 'end',
  },
  resultPad: {
    marginLeft: 30,
  },
});

const PortfolioDetail = (props) => {
  const classes = useStyles();

  const formatMoney = (value) => `$${numeral(value).format('(0,0.00)')}`;

  return (
    <div className={classes.root}>
      <h4 className={`${classes.endAlign} ${classes.extraSpace}`}>Name:</h4>
      <h2 className={`${classes.resultPad} ${classes.extraSpace}`}>{props.name}</h2>
      <h4 className={`${classes.endAlign} ${classes.extraSpace}`}>Portfolio Total:</h4>
      <h2 className={`${classes.resultPad} ${classes.extraSpace}`} style={{color: '#3cff3c'}}>{formatMoney(props.stockstotal)}</h2>
      <h4 className={`${classes.endAlign} ${classes.extraSpace}`}>Shares Owned:</h4>
      <h2 className={`${classes.resultPad} ${classes.extraSpace}`}>{props.sharestotal}</h2>
    </div>
  );
};

export default PortfolioDetail;