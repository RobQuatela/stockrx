import { BehaviorSubject } from "rxjs";
import { scan, shareReplay } from "rxjs/operators";

const initialState = {
  isOpen: false,
  title: '',
  content: '',
};

const actions$ = new BehaviorSubject(initialState);

export const dispatch = (action) => {
  actions$.next(action);
};

const reducer = (state, action) => {
  let next;
  switch (action.type) {
    case 'SHOW_DIALOG':
      next = {
        ...state,
        ...action.payload,
        isOpen: true,
      };
      break;
    case 'HIDE_DIALOG':
      next = {
        ...state,
        title: '',
        content: '',
        isOpen: false,
      }
      break;
    default:
      return {
        ...state,
      };
  }

  window.devTools.send(action.type, next);

  return next;
};

export const dialog$ = actions$
  .pipe(
    scan((acc, curr) => reducer(acc, curr)),
    shareReplay(1),
  );