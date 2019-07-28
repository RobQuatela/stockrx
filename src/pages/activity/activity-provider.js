import React, { useState, useEffect } from 'react';
import ActivityList from './activity-list';
import { makeStyles } from '@material-ui/styles';
import * as activitiesService from '../../common/stores/activities-store';

const useStyles = makeStyles({
  root: {
    margin: 30,
  },
});

const ActivityProvider = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const subscription = activitiesService.activities$.subscribe(a => {
      setActivities(a);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={classes.root}>
      <h4>My Actvity</h4>
      <ActivityList
        activities={activities} 
      />
    </div>
  )
};

export default ActivityProvider;