import NutrientPieChart from "../NutrientPieChart/NutrientPieChart";

function PieCharts() {
    
    return (
        <div className="h-full flex flex-row">
            <div className="bg-[#DBFFBB] rounded-3xl h-[225px]">
                <NutrientPieChart />
            </div>
        </div>
    )
}

export default PieCharts