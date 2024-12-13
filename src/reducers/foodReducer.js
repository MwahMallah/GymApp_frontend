import { createSlice } from "@reduxjs/toolkit";

import { setUser } from "./userReducer.js";
import { getFoodServer, addFoodServer, removeFoodServer } from "../services/foodService.js";
import { getUser } from "../services/userService.js";

const foodSlice = createSlice({
    name: "food",
    initialState: [],
    reducers: {
        setFood: (state, { payload }) => Array.isArray(payload) ? payload : state,
        addFoodReducer: (state, {payload}) => state.concat(payload),
        removeFoodReducer: (state, { payload }) => state.filter(e => e.id !== payload.id),
        updateFoodReducer: (state, { payload }) => state.map(item => item.id === payload.id ? { ...item, ...payload } : item),
    }
})

export default foodSlice.reducer;

const { setFood, addFoodReducer, removeFoodReducer, updateFoodReducer } = foodSlice.actions;

export function addFood(foodName, foodSize, date) {
    return async function(dispatch) {
        const newFood = await addFoodServer(foodName, foodSize, date);
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

export function updateFood(foodArray) {
    return async function(dispatch) {
        await Promise.all(
            foodArray.map(async (food) => {
                await updateFoodServer(food);
            })
        );
        foodArray.forEach(food => {
            dispatch(updateFoodReducer(food));
        });
    };
}