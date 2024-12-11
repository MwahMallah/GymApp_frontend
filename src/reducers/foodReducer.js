import { createSlice } from "@reduxjs/toolkit";

import { setUser } from "./userReducer";
import { getFoodServer, addFoodServer, removeFoodServer } from "../services/foodService";
import { getUser } from "../services/userService";

const foodSlice = createSlice({
    name: "food",
    initialState: [],
    reducers: {
        setFood: (state, { payload }) => Array.isArray(payload) ? payload : state,
        addFoodReducer: (state, {payload}) => state.concat(payload),
        removeFoodReducer: (state, { payload }) => {
            // console.log('Current state:', state);
            return state.filter(e => e.id !== payload.id);
        },
    }
})

export default foodSlice.reducer;

const {setFood, addFoodReducer, removeFoodReducer} = foodSlice.actions;

export function addFood(date, food) {
    return async function(dispatch) {
        const newFood = await addFoodServer(food, date);
        const updatedUser = await getUser(newFood.user);
        dispatch(setUser(updatedUser));
        dispatch(addFoodReducer(newFood));
    }
}

export function initializeAllFood(date) {
    return async function (dispatch) {
        const food = await getFoodServer(date);
        dispatch(setFood(food))
    }
}

export function removeFood(food) {
    return async function (dispatch) {
        await removeFoodServer(food.id);
        dispatch(removeFoodReducer(food));
    };
}