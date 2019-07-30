import { BehaviorSubject } from "rxjs";
import { scan, shareReplay } from "rxjs/operators";

const actions$ = new BehaviorSubject([]);

export const dispatch = (action) => {
  actions$.next(action);
}

const reduce = (state, action) => {
  let next;
  switch (action.type) {
    case 'LOG_ACTIVITY':
      next = [...state, action.payload];
      break;
    default:
      next = [...state];
  }

  window.devTools.send(action.type, next);
  return next;
}

export const activities$ = actions$
  .pipe(
    scan((acc, curr) => reduce(acc, curr)),
    shareReplay(1),
  );