import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell, Tooltip } from "recharts";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const currentDate = new Date();
const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

function PieCharts() {
    const food = useSelector(({user}) => user.food);

    const weeklyData = food.filter(f => {
        const exerciseDate = new Date(f.date);
        return isWithinInterval(exerciseDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
    });    

    console.log(weeklyData);

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

    // Prepare data for the PieChart
    const pieData = [
        { name: "Proteins", value: parseFloat(totals.proteins.toFixed(1)) },
        { name: "Fats", value: parseFloat(totals.fats.toFixed(1)) },
        { name: "Carbs", value: parseFloat(totals.carbs.toFixed(1)) },
    ];

    const COLORS = ["#B5F180", "#97DB57", "#6FA63A"];

    return (
        <div className="h-full flex flex-row">
            <div className="bg-[#DBFFBB] rounded-3xl h-[225px]">
                <div className="flex flex-row justify-between mx-7 mt-1">
                    <h2>Nutrients</h2>
                    <h2>select</h2>
                </div>
                <ResponsiveContainer width={250} height={200}>
                    <PieChart width={200} height={250}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={75}
                            fill="#8884d8"
                            label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PieCharts