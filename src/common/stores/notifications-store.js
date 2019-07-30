import { BehaviorSubject } from "rxjs";
import { scan, shareReplay } from "rxjs/operators";

const initialState = [];

const actions$ = new BehaviorSubject(initialState);

export const dispatch = (action) => {
  actions$.next(action);
}

const reduce = (state, action) => {
  let next;
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      next = [...state, action.payload];
      break;
    case 'REMOVE_NOTIFICATION':
      next = state.filter(x => x.id !== action.payload);
      break;
    case 'CLEAR_NOTIFICATIONS':
      next = [];
      break;
    default:
      next = state;
  }

  window.devTools.send(action.type, next);

  return next;
}

/*
  GETTERS
*/
export const notifications$ = actions$
  .pipe(
    scan((state, action) => reduce(state, action)),
    shareReplay(1),
  );