import NutrientPieChart from "../NutrientPieChart/NutrientPieChart";
import ExerciseTypePieChart from "../ExerciseTypePieChart/ExerciseTypePieChart";
import ExerciseAmountPieChart from "../ExerciseAmountPieChart/ExerciseAmountPieChart";

function PieCharts() {
    
    return (
        <div className="h-full flex flex-row gap-8">
            <div className="bg-[#DBFFBB] rounded-3xl h-[225px] w-[280px]">
                <NutrientPieChart />
            </div>
            <div className="bg-[#FDF0DD] rounded-3xl h-[225px] w-[280px]">
                <ExerciseTypePieChart />
            </div>
            <div className="bg-[#E6E4F7] rounded-3xl h-[225px] w-[280px]">
                <ExerciseAmountPieChart />
            </div>
        </div>
    )
}

export default PieCharts