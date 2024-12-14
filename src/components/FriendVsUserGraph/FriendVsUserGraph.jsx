import { useSelector } from "react-redux";
import { useState } from "react";

import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { CartesianGrid, ResponsiveContainer, LineChart, Line, Legend, XAxis, YAxis, Tooltip } from "recharts";
import PropTypes from "prop-types";

import Selector from "../Selector/Selector";

const currentDate = new Date();
const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const userGraphColor = '#6FBC22';
const friendGraphColor = '#f7ad38';

function FriendVsUserGraph({friend}) {
    const exercises = useSelector(({user}) => user.exercises);
    const userExercisesThisWeek = exercises.filter(e => {
        const exerciseDate = new Date(e.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });

    const friendExercisesThisWeek = friend.exercises.filter(e => {
        const exerciseDate = new Date(e.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });

    const uniqueExerciseNames = [...new Set([
        ...userExercisesThisWeek.map(e => e.name),
        ...friendExercisesThisWeek.map(e => e.name)
    ])];
    const statNames = ['Day Max', 'Day Sum'];

    console.log(userExercisesThisWeek);
    console.log(friendExercisesThisWeek);

    function handleExerciseTypeSelection(e) {
        const newSelectedExerciseType = e.target.value;
        setSelectedExerciseType(newSelectedExerciseType);
    }

    function handleExerciseStatSelection(e) {
        const newSelectedExerciseStat = e.target.value;
        setSelectedExerciseStat(newSelectedExerciseStat);
    }

    const [selectedExerciseType, setSelectedExerciseType] = useState(uniqueExerciseNames[0]);
    const [selectedExerciseStat, setSelectedExerciseStat] = useState(statNames[0]);

    const getDayOfWeek = (dateString) => {
        return days[new Date(dateString).getDay()];
    };

    const chosenUserExercises = userExercisesThisWeek
        .filter(e => selectedExerciseType === "" || e.name === selectedExerciseType);
    const chosenFriendExercises = friendExercisesThisWeek
        .filter(e => selectedExerciseType === "" || e.name === selectedExerciseType);

    function getData(exercises) {
        let data = [];
        if (selectedExerciseStat === 'Day Max') {
            const weightMaxInDay = exercises.map(e => {
                return {
                    day: getDayOfWeek(e.date),
                    weight: e.sets.reduce((acc, set) => Math.max(acc, set.weight), 0)
                }
            });
    
            data = days.map((day) => {
                const weigthMaxFromDay = weightMaxInDay.find(w => w.day === day);
                return {
                    day,
                    weight: weigthMaxFromDay ? weigthMaxFromDay.weight : 0
                }
            })
        } else if (selectedExerciseStat === 'Day Sum') {
            const weigthSumInDay = exercises.map(e => {
                return {
                    day: getDayOfWeek(e.date),
                    weight: e.sets.reduce((acc, set) => acc + set.weight * set.reps, 0)
                }
            });
    
            data = days.map((day) => {
                const weightSumFromDay = weigthSumInDay.find(w => w.day === day);
                return {
                    day,
                    weight: weightSumFromDay ? weightSumFromDay.weight : 0
                }
            })
        }    

        return data;
    }

    const userData = getData(chosenUserExercises);
    const friendData = getData(chosenFriendExercises);
    const mergedData = days.map(day => ({
        day,
        userWeight: userData.find(d => d.day === day)?.weight || 0,
        friendWeight: friendData.find(d => d.day === day)?.weight || 0,
    }));

    return (
        <div className="flex flex-col items-center mt-3">
            <div className="flex flex-row gap-2 justify-between mx-5 my-2 items-center">
                <h2>Comparison with you (this week)</h2>
                <div className="flex flex-row gap-3">
                    <Selector options={statNames} 
                        handleSelectionChange={handleExerciseStatSelection}/>
                    <Selector options={uniqueExerciseNames} 
                        handleSelectionChange={handleExerciseTypeSelection}/>
                </div>
            </div>
            <ResponsiveContainer width="90%" height={300}>
                <LineChart data={mergedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="userWeight" stroke={userGraphColor} name="You" />
                    <Line type="monotone" dataKey="friendWeight" stroke={friendGraphColor} name="Friend" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

FriendVsUserGraph.propTypes = {
    friend: PropTypes.shape({
        exercises: PropTypes.array
    })
}

export default FriendVsUserGraph