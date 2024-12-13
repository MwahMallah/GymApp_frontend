import { useEffect, useState } from "react"
import { addFood, initializeAllFood } from "../../reducers/foodReducer";
import { useDispatch, useSelector } from "react-redux";
import FoodEditor from "../FoodEditor/FoodEditor";

function FoodSection () {
    
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const food = useSelector(({user, allFood}) => allFood);
    const dispatch = useDispatch();

    function changeDate(e) {
        console.log(e.target.value);
        setDate(e.target.value);
    }

    async function handleAddFood() {
        const foodName = "Apple";
        const foodSize = 200;
        dispatch(addFood(foodName, foodSize, date));
    }

    useEffect(() => {
        dispatch(initializeAllFood(date));
    }, [dispatch, date]);

    return (
        <div className="card flex flex-col col-span-4 rounded-3xl overflow-y-auto overflow-x-hidden">
            <div className="flex items-center space-x-4 mb-6">
                <input type="date" name=""
                    id="date" lang="en" 
                    value={date} 
                    onChange={changeDate}/>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleAddFood}>Add Food</button>
            </div>
            <div className="flex flex-row justify-between pt-0 pb-0 pl-20 pr-80">
                <p>Name</p>
                <p>Timestamp</p>
                <p>Grams</p>
                <p>Calories</p>
            </div>
            <div className="card flex flex-col flex-grow col-span-4 rounded-3xl border-gray border-solid border-2 overflow-y-auto overflow-x-hidden">
                {food.length === 0
                    ? <p>No food records for this date</p>
                    : <FoodEditor food={food}/>
                }
            </div>
        </div>
        );
}

export default FoodSection;

/* (
        <div className="card col-span-3 rounded-3xl">
            
            <h2>Food</h2>
            <label htmlFor="date"></label>
            <input type="date" name="" 
                id="date" lang="en" 
                value={date} 
                onChange={changeDate}/>
            {food.length === 0
                ? <p>No food records for this date</p>
                : <FoodEditor food={food}/>
            }
            <form action="" onSubmit={handleAddFood}>
                <label htmlFor="name">Food name: </label>
                <input type="text" name="name" id="" />
                <button type="submit">Add food</button>
            </form>
        </div>
    )*/