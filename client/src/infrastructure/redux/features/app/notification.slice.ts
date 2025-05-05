import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from '~/src/infrastructure/types/notification.type';

interface NotificationState {
    total: number;
    unreadCount: number;
    items: NotificationType[];
}

const initialState: NotificationState = {
    total: 0,
    unreadCount: 0,
    items: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationType>) => {
            state.items.unshift(action.payload);
            state.total = state.items.length;
            
            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },
        
        addNotifications: (state, action: PayloadAction<NotificationType[]>) => {
            const sortedNotifications = [...action.payload].sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            
            state.items = sortedNotifications;
            state.total = sortedNotifications.length;
            state.unreadCount = sortedNotifications.filter(n => !n.isRead).length;
        },
        
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.items.find(item => {
                if (item.type === 'INVOICE') {
                    return item.invoice_info.invoice_id === action.payload;
                } else if (item.type === 'REVIEW') {
                    return item.review_info.review_id === action.payload;
                }
                return false;
            });
            
            if (notification && !notification.isRead) {
                notification.isRead = true;
                notification.readAt = new Date().toISOString();
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        
        markAllAsRead: (state) => {
            state.items.forEach(notification => {
                if (!notification.isRead) {
                    notification.isRead = true;
                    notification.readAt = new Date().toISOString();
                }
            });
            state.unreadCount = 0;
        },
        
        deleteNotification: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex(item => {
                if (item.type === 'INVOICE') {
                    return item.invoice_info.invoice_id === action.payload;
                } else if (item.type === 'REVIEW') {
                    return item.review_info.review_id === action.payload;
                }
                return false;
            });
            
            if (index !== -1) {
                if (!state.items[index].isRead) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
                state.items.splice(index, 1);
                state.total = state.items.length;
            }
        },
        
        clearNotifications: (state) => {
            state.items = [];
            state.total = 0;
            state.unreadCount = 0;
        }
    }
});

export const {
    addNotification,
    addNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;