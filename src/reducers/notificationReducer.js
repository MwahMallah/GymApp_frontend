import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {message: '', type: 'info'},
    reducers: {
        setNotificationAction : (state, {payload}) => payload,
        clearNotification: () => ''
    }
});

export default notificationSlice.reducer;

export const {setNotificationAction, clearNotification} = notificationSlice.actions;

export function setNotification(message, type='info', timeout = 3000) {
    return (dispatch) => {
        dispatch(setNotificationAction({message, type}));
        setTimeout(() => dispatch(clearNotification()), timeout);
    }
}