import { useEffect, useState } from "react"
import FoodEditor from "../../components/FoodEditor/FoodEditor";
import { addFood, initializeAllFood } from "../../reducers/foodReducer";
import { useDispatch, useSelector } from "react-redux";

function Food() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const food = useSelector(({user, allFood}) => allFood);
    const dispatch = useDispatch();

    function changeDate(e) {
        console.log(e.target.value);
        setDate(e.target.value);
    }

    async function handleAddFood(e) {
        e.preventDefault();
        const foodName = e.target.name.value;
        dispatch(addFood(date, foodName));
    }

    useEffect(() => {
        dispatch(initializeAllFood(date));
    }, [dispatch, date]);

    return (
        <div>
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
    )
}

export default Food