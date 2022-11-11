import {configureStore} from '@reduxjs/toolkit';

import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import notificationsReducer from "../features/notifications/notificationsSlice";
import {apiSlice} from "../features/api/apiSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        notifications: notificationsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;