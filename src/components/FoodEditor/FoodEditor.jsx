/*
 * Author: Anton Havlovskyi
 * VUT login: xhavlo01
*/

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFood, removeFood } from '../../reducers/foodReducer';
import { setNotification } from '../../reducers/notificationReducer';
import Notification from "../Notification/Notification";

function FoodEditor({ food }) {
    const dispatch = useDispatch();
    // Display template with time cropped to HH:MM
    const [tempFood, setTempFood] = useState(food.map(record => ({
        ...record,
        time: new Date(record.date).toTimeString().slice(0, 5),
    })));

    // Sync tempFood with changes in the food prop
    useEffect(() => {
        setTempFood(food.map(record => ({
            ...record,
            time: new Date(record.date).toTimeString().slice(0, 5),
        })));
    }, [food]);

    // Save changes => modify only the visible fields and dispatch updated record
    // Also show notification of operation result
    async function handleSave(index) {
        const updatedRecord = { ...tempFood[index] };
        const timeParts = updatedRecord.time.split(":");
        if (timeParts.length === 2) {
            const [hours, minutes] = timeParts.map(Number);
            if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
                const date = new Date(updatedRecord.date);
                date.setHours(hours, minutes, 0, 0);
                updatedRecord.date = date.toISOString();
            } else {
                dispatch(setNotification("Invalid time format. Please enter in HH:MM format."));
                return;
            }
        } else {
            dispatch(setNotification("Invalid time format. Please enter in HH:MM format."));
            return;
        }

        dispatch(updateFood(updatedRecord));
        dispatch(setNotification("Changes saved"));
    }

    // Cancel changes => revert tempFood to the original food prop
    function handleCancel() {
        setTempFood(food.map(record => ({
            ...record,
            time: new Date(record.date).toTimeString().slice(0, 5),
        })));
    }

    // Handle input changes in tempFood
    // This is needed to prevent input field "freezing"
    function handleChange(index, field, value) {
        setTempFood((prev) => {
            const updatedTempFood = [...prev];
            updatedTempFood[index] = { ...updatedTempFood[index], [field]: value };
            return updatedTempFood;
        });
    }

    // Remove food record
    async function handleRemove(record) {
        dispatch(removeFood(record));
    }

    return (
        <div>
            <Notification />
            {tempFood.map((record, index) => (
                <div key={record.id} className="pt-4 pb-4 pr-5 pl-7 border rounded-3xl shadow flex flex-row justify-between items-center mb-2">
                        <input
                            type="text"
                            value={record.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="border-l-2 border-r-2 border-primary p-2 text-center w-full"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={record.time}
                            onChange={(e) => handleChange(index, "time", e.target.value)}
                            className="border-l-2 border-r-2 border-primary p-2 text-center w-full"
                            placeholder="Time"
                        />
                        <input
                            type="text"
                            value={record.size}
                            onChange={(e) => handleChange(index, "size", e.target.value)}
                            className="border-l-2 border-r-2 border-primary p-2 text-center w-full"
                            placeholder="Grams"
                        />
                        <input
                            type="text"
                            value={Math.round(record.calories)}
                            className="border-l-2 border-r-2 border-danger-muted p-2 text-center w-full"
                            placeholder="Calories"
                        />
                        <div className="flex flex-row ml-10 gap-2 items-center justify-center">
                            <button
                                onClick={() => handleSave(index)}
                                className="bg-primary text-white px-4 py-2 rounded-3xl hover:bg-green-800"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded-3xl hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleRemove(record)}
                                className="bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
            ))}
        </div>
    );
}

export default FoodEditor;
