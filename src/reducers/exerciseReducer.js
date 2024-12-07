import { createSlice } from "@reduxjs/toolkit";

import { setUser } from "./userReducer";
import { getExercisesServer, addExerciseServer, removeExerciseServer } from "../services/exerciseService";
import { getUser } from "../services/userService";

const exerciseSlice = createSlice({
    name: "exercise",
    initialState: [],
    reducers: {
        setExercises: (state, {payload}) => payload,
        addExerciseReducer: (state, {payload}) => state.concat(payload),
        removeExerciseReducer: (state, {payload}) => {
            console.log(state);
            return state.filter(e => e.id !== payload.id)
        }
    }
})

export default exerciseSlice.reducer;

const {setExercises, addExerciseReducer, removeExerciseReducer} = exerciseSlice.actions;

export function addExercise(date, exercise) {
    return async function(dispatch) {
        const newExercise = await addExerciseServer(exercise, date);
        const updatedUser = await getUser(newExercise.user);
        dispatch(setUser(updatedUser));
        dispatch(addExerciseReducer(newExercise));
    }
}

export function initializeAllExercises(date) {
    return async function (dispatch) {
        const exercises = await getExercisesServer(date);
        dispatch(setExercises(exercises))
    }
}

export function removeExercise(exercise) {
    return async function (dispatch) {
        await removeExerciseServer(exercise.id);
        dispatch(setExercises(exercise))
        dispatch(removeExerciseReducer(exercise));
    }
}