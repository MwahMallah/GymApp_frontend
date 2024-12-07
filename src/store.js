import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";
import exerciseReducer from "./reducers/exerciseReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers: allUsersReducer,
        allExercises: exerciseReducer
    }
});

export default store;