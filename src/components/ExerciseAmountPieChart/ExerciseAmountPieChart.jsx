/*
 * Author: Maksim Dubrovin
 * Login: xdubro01
 */

import Selector from "../Selector/Selector";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState } from "react";
import { startOfWeek, endOfWeek, isWithinInterval, subWeeks, addWeeks } from "date-fns";
import ActivePieSlice from "../ActivePieSlice/ActivePieSlice";

function ExerciseAmountPieChart() {
    const exercises = useSelector(({user}) => user.exercises);
    // const [weekOffset, setWeekOffset] = useState(0);

    const currentDate = new Date();

    const getWeeklyData = (weekOffset) => {
        const currentDate = new Date();
        const startOfSelectedWeek = startOfWeek(subWeeks(currentDate, weekOffset), { weekStartsOn: 1 });
        const endOfSelectedWeek = endOfWeek(subWeeks(currentDate, weekOffset), { weekStartsOn: 1 });

        return exercises.filter((f) => {
            const exerciseDate = new Date(f.date);
            return exerciseDate >= startOfSelectedWeek && exerciseDate <= endOfSelectedWeek;
        });
    };

    // Data for every week
    const currentWeekData = getWeeklyData(0);
    const lastWeekData = getWeeklyData(1);
    const twoWeeksAgoData = getWeeklyData(2);

    const COLORS = ["#BCB5FE", "#9E96DF", "#776AEA"];

    // turn to data format for PieChart
    const pieData = [
        {name: 'Current week', value: currentWeekData.length, fill: COLORS[0]}, 
        {name: 'Previous week', value: lastWeekData.length, fill: COLORS[1]}, 
        {name: '2 weeks ago', value: twoWeeksAgoData.length, fill: COLORS[2]}, 
    ]

    const [activeIndex, setActiveIndex] = useState(-1);
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(-1);
    }; 
    
    return (
        <>
            <div className="flex flex-row justify-between items-center mx-7 mt-1">
                <h2>Exercise Amount</h2>
            </div>
            <ResponsiveContainer width={250} height={200} style={{ marginTop: "-10px" }}>
                <PieChart width={200} height={250}>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={75}
                        fill="#8884d8"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                        activeIndex={activeIndex}
                        activeShape={ActivePieSlice}>
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.fill}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default ExerciseAmountPieChart