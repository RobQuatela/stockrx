import { BehaviorSubject } from "rxjs";
import { scan } from "rxjs/operators";

/*
  STATE OBJECTS
*/
const initialState = {
  isOpen: false,
  message: '',
}

const actions$ = new BehaviorSubject(initialState);

export const dispatch = (action) => {
  actions$.next(action);
}

const reducer = (state, action) => {
  let next;
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      next = {
        ...state,
        isOpen: true,
        message: action.payload,
      };
      break;
    case 'HIDE_SNACKBAR':
      next = {
        ...state,
        isOpen: false,
        message: '',
      };
      break;
    default:
      next = {
        ...state,
      };
  }

  window.devTools.send(action.type, next);

  return next;
}

/*
  GETTERS
*/
export const snackbar$ = actions$
  .asObservable()
  .pipe(
    scan((acc, curr) => reducer(acc, curr))
  );