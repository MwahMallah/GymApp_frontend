import { useSelector } from "react-redux";
import { useState } from "react";

import ExerciseList from "../ExerciseList/ExerciseList";
import Selector from "../Selector/Selector";

import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const currentDate = new Date();
const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

function TrackingHistory() {
    const exercises = useSelector(({user}) => user.exercises);
    const exercisesThisWeek = exercises.filter(e => {
        const exerciseDate = new Date(e.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });
    const uniqueExerciseNames = [...new Set(exercisesThisWeek.map(e => e.name))];

    const [selectedExerciseType, setSelectedExerciseType] = useState("");

    function handleExerciseSelection(e) {``
        const newSelectedExerciseType = e.target.value;
        setSelectedExerciseType(newSelectedExerciseType);
    }

    const filteredExercises = selectedExerciseType === "" 
        ? exercisesThisWeek
        : exercisesThisWeek.filter(e => e.name === selectedExerciseType);

    return (
        <>
            <h2>Tracking History (this week)</h2>
            <Selector options={uniqueExerciseNames} 
                handleSelectionChange={handleExerciseSelection}/>
            <ExerciseList exercises={filteredExercises}/>        
        </>
    )
}

export default TrackingHistory