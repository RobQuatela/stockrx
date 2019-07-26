import { BehaviorSubject } from "rxjs";

/*
  STATE OBJECTS
*/

const snackbarSubject = new BehaviorSubject({
  isOpen: false,
  message: '',
});

/*
  ACTIONS
*/
export const actions = {
  show: (message) => {
    snackbarSubject.next({
      isOpen: true,
      message,
    });
  },
};

/*
  GETTERS
*/
export const snackbar$ = snackbarSubject.asObservable();