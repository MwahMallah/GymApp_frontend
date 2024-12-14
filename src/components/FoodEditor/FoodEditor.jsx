import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFood, removeFood } from '../../reducers/foodReducer';
import { setNotification } from '../../reducers/notificationReducer';
import Notification from "../Notification/Notification";

function FoodEditor({ food }) {
    const dispatch = useDispatch();
    const [tempFood, setTempFood] = useState(food.map(record => ({
        ...record,
        time: new Date(record.date).toTimeString().slice(0, 5), // Extract initial HH:MM
    })));

    // Sync tempFood with changes in the food prop
    useEffect(() => {
        setTempFood(food.map(record => ({
            ...record,
            time: new Date(record.date).toTimeString().slice(0, 5),
        })));
    }, [food]);

    // Save changes: modify only the visible fields and dispatch updated record
    async function handleSave(index) {
        const updatedRecord = { ...tempFood[index] };
        const timeParts = updatedRecord.time.split(":");
        if (timeParts.length === 2) {
            const [hours, minutes] = timeParts.map(Number);
            if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
                const date = new Date(updatedRecord.date);
                date.setHours(hours, minutes, 0, 0); // Update timestamp with valid time
                updatedRecord.date = date.toISOString();
            } else {
                dispatch(setNotification("Invalid time format. Please enter in HH:MM format."));
                return;
            }
        } else {
            dispatch(setNotification("Invalid time format. Please enter in HH:MM format."));
            return;
        }

        // Dispatch the updated record to Redux
        dispatch(updateFood(updatedRecord));
        dispatch(setNotification("Changes saved"));
    }

    // Cancel changes: revert tempFood to the original food prop
    function handleCancel() {
        setTempFood(food.map(record => ({
            ...record,
            time: new Date(record.date).toTimeString().slice(0, 5),
        })));
    }

    // Handle input changes in tempFood
    function handleChange(index, field, value) {
        setTempFood((prev) => {
            const updatedTempFood = [...prev];
            updatedTempFood[index] = { ...updatedTempFood[index], [field]: value };
            return updatedTempFood;
        });
    }

    async function handleRemove(record) {
        dispatch(removeFood(record));
    }

    return (
        <div>
            <Notification />
            {tempFood.map((record, index) => (
                <div key={record.id} className="p-4 border rounded-lg shadow flex flex-row justify-between mb-2">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <input
                            type="text"
                            value={record.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="border rounded p-2"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={record.time}
                            onChange={(e) => handleChange(index, "time", e.target.value)}
                            className="border rounded p-2"
                            placeholder="Time"
                        />
                        <input
                            type="text"
                            value={record.size}
                            onChange={(e) => handleChange(index, "size", e.target.value)}
                            className="border rounded p-2"
                            placeholder="Grams"
                        />
                        <input
                            type="text"
                            value={record.calories}
                            onChange={(e) => handleChange(index, "calories", e.target.value)}
                            className="border rounded p-2"
                            placeholder="Calories"
                        />
                        
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => handleSave(index)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleRemove(record)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
