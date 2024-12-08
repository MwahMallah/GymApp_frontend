import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";
import exerciseReducer from "./reducers/exerciseReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers: allUsersReducer,
        allExercises: exerciseReducer,
        notification: notificationReducer
    }
});

export default store;