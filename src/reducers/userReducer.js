import { createSlice } from "@reduxjs/toolkit";
import { loginUserServer } from "../services/loginService";
import { getUser } from "../services/userService";
import { setToken } from "../services/loginService";

import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, {payload}) => payload,
    }
});

export default userSlice.reducer;
export const {setUser} = userSlice.actions;

export function loginUser(username, pwd) {
    return async dispatch => {
        try {
            const userAuth = await loginUserServer(username, pwd);
            window.localStorage.setItem("userAuth", JSON.stringify(userAuth));
            setToken(userAuth.token);
            const user = await getUser(userAuth.id);
            dispatch(setUser(user));
        } catch (e) {
            dispatch(setNotification(e.message, 'error'));
        }
    }
}

export function loginUserAuth(userAuth) {
    return async dispatch => {
        try {
            setToken(userAuth.token);
            const user = await getUser(userAuth.id);
            dispatch(setUser(user));
        } catch (e) {
            dispatch(setNotification(e.message, 'error'));
        }
    }
}