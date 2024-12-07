import { useEffect, useState } from "react"
import ExerciseEditor from "../../components/ExerciseEditor/ExerciseEditor";
import { addExercise, initializeAllExercises } from "../../reducers/exerciseReducer";
import { useDispatch, useSelector } from "react-redux";

function Exercises() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const exercises = useSelector(({user, allExercises}) => allExercises);
    const dispatch = useDispatch();

    function changeDate(e) {
        console.log(e.target.value);
        setDate(e.target.value);
    }

    async function handleAddExercise(e) {
        e.preventDefault();
        const exerciseName = e.target.name.value;
        dispatch(addExercise(date,exerciseName));
    }

    useEffect(() => {
        dispatch(initializeAllExercises(date));
    }, [dispatch, date]);

    return (
        <div>
            <h2>Exercises</h2>
            <label htmlFor="date"></label>
            <input type="date" name="" 
                id="date" lang="en" 
                value={date} 
                onChange={changeDate}/>
            {exercises.length === 0
                ? <p>No exercises for this date</p>
                : <ExerciseEditor exercises={exercises}/>
            }
            <form action="" onSubmit={handleAddExercise}>
                <label htmlFor="name">Exercise name: </label>
                <input type="text" name="name" id="" />
                <button type="submit">Add exercise</button>
            </form>
        </div>
    )
}

export default Exercises