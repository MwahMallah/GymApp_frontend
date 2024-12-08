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
            console.log(userAuth);
            setToken(userAuth.token);
            const user = await getUser(userAuth.id);
            window.localStorage.setItem("user", JSON.stringify(user));
            dispatch(setUser(user));
        } catch (e) {
            dispatch(setNotification(e.message, 'error'));
        }
    }
}