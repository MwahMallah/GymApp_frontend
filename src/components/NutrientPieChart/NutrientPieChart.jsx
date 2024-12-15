import Selector from "../Selector/Selector";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState } from "react";
import { startOfWeek, endOfWeek, isWithinInterval, addWeeks } from "date-fns";
import ActivePieSlice from "../ActivePieSlice/ActivePieSlice";

function NutrientPieChart() {
    const food = useSelector(({user}) => user.food);
    const [weekOffset, setWeekOffset] = useState(0);

    const currentDate = new Date();

    const adjustedDate = addWeeks(currentDate, weekOffset);
    const startOfCurrentWeek = startOfWeek(adjustedDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(adjustedDate, { weekStartsOn: 1 });    

    const weeklyData = food.filter(f => {
        const exerciseDate = new Date(f.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });    

    // Aggregate nutrients
    const totals = weeklyData.reduce(
        (acc, item) => {
            acc.proteins += item.proteins || 0;
            acc.fats += item.fats || 0;
            acc.carbs += item.carbs || 0;
            return acc;
        },
        { proteins: 0, fats: 0, carbs: 0 }
    );

    const COLORS = ["#B5F180", "#97DB57", "#6FA63A"];

    // Prepare data for the PieChart
    const pieData = [
        { name: "Proteins", value: parseFloat(totals.proteins.toFixed(1)), fill: COLORS[0] },
        { name: "Fats", value: parseFloat(totals.fats.toFixed(1)), fill: COLORS[1] },
        { name: "Carbs", value: parseFloat(totals.carbs.toFixed(1)), fill: COLORS[2] },
    ];

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
                <h2>Nutrients</h2>
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

export default NutrientPieChart