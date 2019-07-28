import { BehaviorSubject } from "rxjs";

const activitiesSubject = new BehaviorSubject([]);

export const actions = {
  add: (activity) => activitiesSubject.next([...activitiesSubject.value, activity]),
};

export const activities$ = activitiesSubject.asObservable();