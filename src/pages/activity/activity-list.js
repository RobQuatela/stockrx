import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ActivityListItem from './activity-list-item';

const useStyles = makeStyles({
  root: {
    maxHeight: 600,
    overflowY: 'auto',
  },
});

const ActivityList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.activities.map(activity => <ActivityListItem key={activity.id} activity={activity} />)}
    </div>
  )
};

export default ActivityList;