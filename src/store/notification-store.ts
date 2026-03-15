import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  portal: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  add: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  unreadCount: () => number;
}

let notifCounter = 0;

export const useNotificationStore = create<NotificationStore>()(
  immer((set, get) => ({
    notifications: [],

    add: (n) => set((state) => {
      notifCounter++;
      state.notifications.unshift({
        ...n,
        id: `notif-${notifCounter}`,
        timestamp: new Date(),
        read: false,
      });
      if (state.notifications.length > 100) state.notifications.pop();
    }),

    markRead: (id) => set((state) => {
      const n = state.notifications.find((n) => n.id === id);
      if (n) n.read = true;
    }),

    markAllRead: () => set((state) => {
      state.notifications.forEach((n) => { n.read = true; });
    }),

    remove: (id) => set((state) => {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    }),

    unreadCount: () => get().notifications.filter((n) => !n.read).length,
  }))
);
