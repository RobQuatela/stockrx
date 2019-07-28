import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#384047',
    borderRadius: 4,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    width: '100%',
    margin: '10px 0',
    display: 'grid',
    gridTemplateColumns: '5% auto 10%',
  },
  centered: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  activity: {
    borderLeft: '1px solid #1e272e',
    borderRight: '1px solid #1e272e',
    '& p': {
      alignSelf: 'center',
      marginLeft: 20,
    },
  },
  styledIcon: {
    color: '#FFFF82',
  }
})

const ActivityListItem = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Icon color='primary' classes={{ colorPrimary: classes.styledIcon }} className={classes.centered}>description</Icon>
      <div className={classes.activity}>
        <p>{props.activity.message}</p>
      </div>
      <p className={classes.centered}>{props.activity.createdAt}</p>
    </div>
  );

};

export default ActivityListItem;