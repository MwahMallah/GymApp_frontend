import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserServer } from "../services/loginService";
import { getUser } from "../services/userService";
import { setToken } from "../services/loginService";

import { setNotification } from "./notificationReducer";
import { updateUserServer } from "../services/userService";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, {payload}) => payload,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAuth.fulfilled, (state, { payload }) => {
                return payload; // Update state with the authenticated user
            })
            .addCase(loginUserAuth.rejected, (state, { payload, dispatch }) => {
                dispatch(setNotification(payload, 'error'));
                return null; // Reset state or retain based on your logic
            });
    },
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

export const loginUserAuth = createAsyncThunk(
    "user/loginUserAuth",
    async (userAuth, { rejectWithValue }) => {
        try {
            setToken(userAuth.token); // Set token for subsequent API calls
            const user = await getUser(userAuth.id); // Fetch user details
            return user; // Payload for fulfilled case
        } catch (error) {
            return rejectWithValue(error.message); // Payload for rejected case
        }
    }
);

export function updateUser(updatedUser) {
    return async dispatch => {
        try {
            const updatedUserFromServer = await updateUserServer(updatedUser);
            dispatch(setUser(updatedUserFromServer));
            dispatch(setNotification('Profile updated!'));
        } catch (e) {
            dispatch(setNotification(e.message, 'error'));
        }
    }
}