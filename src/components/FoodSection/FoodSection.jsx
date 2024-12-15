/*
 * Author: Anton Havlovskyi
 * VUT login: xhavlo01
*/

import { useEffect, useState } from "react"
import { addFood, initializeAllFood } from "../../reducers/foodReducer";
import { useDispatch, useSelector } from "react-redux";
import FoodEditor from "../FoodEditor/FoodEditor";

function FoodSection () {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const food = useSelector(({user, allFood}) => allFood);
    const dispatch = useDispatch();

    // Date switch
    function changeDate(e) {
        setDate(e.target.value);
    }

    // Add new default food record
    async function handleAddFood() {
        const foodName = "Apple";
        const foodSize = 200;

        const now = new Date();
        const fullTimestamp = new Date(`${date}T${now.toTimeString().split(' ')[0]}`);

        dispatch(addFood(foodName, foodSize, fullTimestamp.toISOString()));
        dispatch(initializeAllFood(date));
    }

    useEffect(() => {
        dispatch(initializeAllFood(date));
    }, [dispatch, date]);

    return (
        <div className="card flex flex-col col-span-4 rounded-3xl overflow-y-auto overflow-x-hidden">
            <div className="flex items-center justify-around space-x-4 mb-6">
                <input type="date" name=""
                    id="date" lang="en" 
                    value={date} 
                    onChange={changeDate}/>
                <button className="bg-primary text-white px-4 py-2 rounded-3xl hover:bg-green-800" onClick={handleAddFood}>Add Food</button>
            </div>
            <div className="flex flex-row justify-between pt-0 pb-0 pl-[160px] pr-[199px]">
                <p>Name</p>
                <p>Timestamp</p>
                <p>Grams</p>
                <p>Calories</p>
                <p>Action</p>
            </div>
            <div className="card flex flex-col flex-grow rounded-3xl border-gray border-solid border-2 overflow-y-auto overflow-x-hidden">
                {food.length === 0
                    ? <p>No food records for this date</p>
                    : <FoodEditor food={food}/>
                }
            </div>
        </div>
        );
}

export default FoodSection;