import Selector from "../Selector/Selector";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState } from "react";
import { startOfWeek, endOfWeek, isWithinInterval, addWeeks } from "date-fns";
import ActivePieSlice from "../ActivePieSlice/ActivePieSlice";

function ExerciseTypePieChart() {
    const exercises = useSelector(({user}) => user.exercises);
    const [weekOffset, setWeekOffset] = useState(0);

    const currentDate = new Date();

    const adjustedDate = addWeeks(currentDate, weekOffset);
    const startOfCurrentWeek = startOfWeek(adjustedDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(adjustedDate, { weekStartsOn: 1 });    

    const weeklyData = exercises.filter(f => {
        const exerciseDate = new Date(f.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });    

    const COLORS = ["#FADCAF", "#FCCA7F", "#FFB84C"];

    //Group exercises by type and count them
    const exerciseCounts = weeklyData.reduce((acc, item) => {
        const type = item.type || "Unknown"; // if there is no type, so "Unknown"
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    // turn to data format for PieChart
    const pieData = Object.keys(exerciseCounts).map((key, index) => ({
        name: key,
        value: exerciseCounts[key],
        fill: COLORS[index % COLORS.length], // Зацикливаем цвета
    }));

    function handleDateSelect(e) {
        const newWeekOffsetString = e.target.value;
        if (newWeekOffsetString === 'This week') {
            setWeekOffset(0);
        } else if (newWeekOffsetString === 'Last week') {
            setWeekOffset(1);
        }
    }

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
                <h2>Muscle Group</h2>
                <Selector options={['This week', 'Last week']} 
                    handleSelectionChange={handleDateSelect}/>
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

export default ExerciseTypePieChart