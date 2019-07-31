import React from 'react';
import { Dialog, makeStyles, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import * as dialogStore from '../stores/dialog-store';

const useStyles = makeStyles({
  root: {
    padding: 30,
    width: 500,
  }
})
const SharedDialog = (props) => {
  const classes = useStyles();

  const handleClose = () => dialogStore.dispatch({
    type: 'HIDE_DIALOG',
  });

  return (
    <Dialog open={props.open} classes={{ paperWidthSm: classes.root }}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SharedDialog;