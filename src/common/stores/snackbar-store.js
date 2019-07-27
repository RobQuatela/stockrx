import { BehaviorSubject } from "rxjs";

/*
  STATE OBJECTS
*/
const initialState = {
  isOpen: false,
  message: '',
}
const snackbarSubject = new BehaviorSubject(initialState);

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
  hide: () => {
    snackbarSubject.next({
      isOpen: false,
      message: '',
    });
  }
};

/*
  GETTERS
*/
export const snackbar$ = snackbarSubject.asObservable();