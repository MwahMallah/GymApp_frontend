import { useState } from "react"
import { useDispatch } from "react-redux";
import { removeFood, updateFood } from '../../reducers/foodReducer';

function FoodEditor({ food }) {
    const dispatch = useDispatch();

    const [tempFood, setTempFood] = useState([...food]);

    async function handleRemove(food) {
        dispatch(removeFood(food));
    }

    // Handle input changes for a specific record
    function handleChange(index, field, value) {
        const updatedTempFood = [...tempFood];
        updatedTempFood[index][field] = value;
        setTempFood(updatedTempFood);
    };

    // Save changes: dispatch the updated food data to the Redux store
    async function handleSave() {
        dispatch(updateFood(tempFood)); // Send updated data to Redux store
    };

    // Cancel changes: revert tempFood to match the original prop
    function handleCancel() {
        setTempFood([...food]); // Reset temporary data to match the prop
    };

    return (
        <div>
        {tempFood.map((record, index) => (
            <div className="p-4 border rounded-lg shadow flex flex-row gap-4 mb-2">
                <div key={record.id} className="grid grid-cols-4 gap-4 items-center">
                    <input
                        type="text"
                        value={record.name}
                        onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                        }
                        className="border rounded p-2"
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={record.date}
                        onChange={(e) =>
                            handleChange(index, "date", e.target.value)
                        }
                        className="border rounded p-2"
                        placeholder="Time"
                    />
                    <input
                        type="text"
                        value={record.size}
                        onChange={(e) =>
                            handleChange(index, "size", e.target.value)
                        }
                        className="border rounded p-2"
                        placeholder="Grams"
                    />
                    <input
                        type="text"
                        value={record.size}
                        onChange={(e) =>
                            handleChange(index, "size", e.target.value)
                        }
                        className="border rounded p-2"
                        placeholder="Calories"
                    />
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        > Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        > Cancel
                        </button>
                        <button
                            onClick={handleRemove}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        > Remove
                        </button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
}

export default FoodEditor;
