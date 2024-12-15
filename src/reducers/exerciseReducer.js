import { createSlice } from "@reduxjs/toolkit";

import { setUser } from "./userReducer";
import { getExercisesServer, addExerciseServer, updateExerciseServer, removeExerciseServer } from "../services/exerciseService";
import { getUser } from "../services/userService";

const exerciseSlice = createSlice({
    name: "exercise",
    initialState: [],
    reducers: {
        setExercises: (state, { payload }) => Array.isArray(payload) ? payload : state,
        addExerciseReducer: (state, {payload}) => state.concat(payload),
        removeExerciseReducer: (state, {payload}) => {
            return state.filter(e => e.id !== payload.id)
        },
        updateExerciseReducer: (state, {payload}) => state.map(
            e => e.id === payload.id
                ? payload
                : e
        )
    }
})

export default exerciseSlice.reducer;

const {setExercises, updateExerciseReducer, addExerciseReducer, removeExerciseReducer} = exerciseSlice.actions;

export function addExercise(date, exercise) {
    return async function(dispatch) {
        const newExercise = await addExerciseServer(exercise, date);
        const updatedUser = await getUser(newExercise.user);
        dispatch(setUser(updatedUser));
        dispatch(addExerciseReducer(newExercise));
    }
}

export function updateExercise(exercise) {
    return async function(dispatch) {
        const updatedExercise = await updateExerciseServer(exercise);
        const updatedUser = await getUser(updatedExercise.user);
        dispatch(setUser(updatedUser));
        dispatch(updateExerciseReducer(updatedExercise));
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
        dispatch(removeExerciseReducer(exercise));
    }
}