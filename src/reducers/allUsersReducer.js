import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersServer, 
    getAllUsersFilteredServer, 
    addFriendServer,
    removeFriendServer } from "../services/userService";
import { setUser } from "./userReducer";

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: [],
    reducers: {
        setAllUsers: (state, {payload}) => payload
    }
});

export default allUsersSlice.reducer;
export const {setAllUsers} = allUsersSlice.actions;

export function getAllUsers() {
    return async dispatch => {
        const usersFromServer = await getAllUsersServer();
        dispatch(setAllUsers(usersFromServer));
    }
}

export function setAllUsersFiltered(filter) {
    return async dispatch => {
        const usersFromServer = await getAllUsersFilteredServer(filter);
        dispatch(setAllUsers(usersFromServer));
    }
}

export function addFriend(id) {
    return async dispatch => {
        const updatedUser = await addFriendServer(id);
        console.log("Updated user: ", updatedUser);
        dispatch(setUser(updatedUser));
    }
}

export function removeFriend(id) {
    return async dispatch => {
        const updatedUser = await removeFriendServer(id);
        console.log("Updated user: ", updatedUser);
        dispatch(setUser(updatedUser));
    }
}