import { BehaviorSubject } from "rxjs";

const initialState = [];

const notificationsSubject = new BehaviorSubject(initialState);

export const actions = {
  add: (notification) => {
    notificationsSubject.next([...notificationsSubject.value, notification]);
  },
  remove: (id) => {
    let notifications = [...notificationsSubject.value];
    notifications = notifications.filter(x => x.id !== id);
    notificationsSubject.next(notifications);
  },
  clear: () => {
    notificationsSubject.next(initialState);
  },
}

/*
  GETTERS
*/

export const notifications$ = notificationsSubject.asObservable();