import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";
import exerciseReducer from "./reducers/exerciseReducer";
import foodReducer from "./reducers/foodReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers: allUsersReducer,
        allExercises: exerciseReducer,
        allFood: foodReducer,
        notification: notificationReducer
    }
});

export default store;