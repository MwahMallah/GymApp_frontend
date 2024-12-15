import { useEffect, useState } from "react"
import { addExercise, initializeAllExercises, updateExercise } from "../../reducers/exerciseReducer";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../../components/Calendar/Calendar";
import ExerciseList from "../../components/ExerciseList/ExerciseList";

function Exercises() {
    const exercises = useSelector(({allExercises}) => allExercises);
    const dispatch = useDispatch();

    const [chosenDate, setChosenDate] = useState(new Date());

    function changeDate(newDate) {
        setChosenDate(newDate);
    }

    async function handleAddExercise(newExercise) {
        const currentDate = chosenDate.toISOString().split('T')[0];
        dispatch(addExercise(currentDate, newExercise));
    }

    async function handleUpdateExercise(newExercise) {
        console.log(newExercise);
        dispatch(updateExercise(newExercise));
    }

    useEffect(() => {
        const currentDate = chosenDate.toISOString().split('T')[0];
        dispatch(initializeAllExercises(currentDate));
    }, [dispatch, chosenDate]);

    const filteredExercises = exercises.filter(e => {
        const exerciseDate = new Date(e.date); 
        return (
            exerciseDate.getFullYear() === chosenDate.getFullYear() &&
            exerciseDate.getMonth() === chosenDate.getMonth() &&
            exerciseDate.getDate() === chosenDate.getDate()
        );
    });
    console.log(exercises);

    return (
        <div className="flex flex-col mx-8 items-center gap-4 rounded-3xl overflow-y-auto overflow-x-hidden">
            <Calendar chosenDate={chosenDate} changeDate={changeDate}/>
            <ExerciseList exercises={filteredExercises} 
                handleAddExercise={handleAddExercise} 
                handleUpdateExercise={handleUpdateExercise}/>
        </div>
    )
}

export default Exercises