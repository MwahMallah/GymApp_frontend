import { useSelector } from "react-redux";
import { useState } from "react";

import Selector from "../Selector/Selector";

import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

import { BarChart, Bar, Cell, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";


const barColor = '#c6f799';
const selectedBarColor = '#f7ad38';

const currentDate = new Date();
const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function TrackingHistory() {
    const exercises = useSelector(({user}) => user.exercises);
    const exercisesThisWeek = exercises.filter(e => {
        const exerciseDate = new Date(e.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });

    const uniqueExerciseNames = [...new Set(exercisesThisWeek.map(e => e.name))];
    const statNames = ['Day Max', 'Day Sum'];

    const [selectedExerciseType, setSelectedExerciseType] = useState(uniqueExerciseNames[0]);
    const [selectedExerciseStat, setSelectedExerciseStat] = useState(statNames[0]);

    const [activeIndex, setActiveIndex] = useState(null);

    function handleExerciseTypeSelection(e) {
        const newSelectedExerciseType = e.target.value;
        setSelectedExerciseType(newSelectedExerciseType);
    }

    function handleExerciseStatSelection(e) {
        const newSelectedExerciseStat = e.target.value;
        setSelectedExerciseStat(newSelectedExerciseStat);
    }

    const getDayOfWeek = (dateString) => {
        return days[new Date(dateString).getDay()];
    };

    const chosenExercises = exercisesThisWeek
        .filter(e => selectedExerciseType === "" || e.name === selectedExerciseType);

    let data = [];
    if (selectedExerciseStat === 'Day Max') {
        const weightMaxInDay = chosenExercises.map(e => {
            return {
                day: getDayOfWeek(e.date),
                weight: e.sets.reduce((acc, set) => Math.max(acc, set.weight), 0)
            }
        });

        console.log(weightMaxInDay);

        data = days.map((day) => {
            const weigthMaxFromDay = weightMaxInDay.find(w => w.day === day);
            return {
                day,
                weight: weigthMaxFromDay ? weigthMaxFromDay.weight : 0
            }
        })
    } else if (selectedExerciseStat === 'Day Sum') {
        const weigthSumInDay = chosenExercises.map(e => {
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

    return (
        <>
            <div className="flex flex-row justify-between mx-5 my-2 items-center">
                <h2>Tracking History (this week)</h2>
                <div className="flex flex-row gap-3">
                    <Selector options={statNames} 
                        handleSelectionChange={handleExerciseStatSelection}/>
                    <Selector options={uniqueExerciseNames} 
                        handleSelectionChange={handleExerciseTypeSelection}/>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="day"/>
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="5 5"/>
                    <Tooltip cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#f4f6f4', borderRadius: '8px', color: '#000' }}
                        itemStyle={{ color: '#F7AD3A' }}/>
                    <Bar
                        dataKey="weight"
                        fill="#8884d8"
                        onMouseOver={(data, index) => setActiveIndex(index)}
                        onMouseOut={() => setActiveIndex(null)}
                        radius={[15, 15, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell cursor="pointer" 
                                fill={index === activeIndex ? selectedBarColor : barColor} 
                                key={`cell-${index}`} />
                        ))} 
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default TrackingHistory