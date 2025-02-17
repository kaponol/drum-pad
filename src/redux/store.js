import { configureStore } from '@reduxjs/toolkit';
import sendReducer from './firstninesongs';

export const store = configureStore({
    reducer: {
        send: sendReducer,
    },
});