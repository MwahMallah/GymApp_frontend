/*
 * Author: Maksim Dubrovin
 * Login: xdubro01
 */

import TrackingHistory from "../TrackingHistory/TrackingHistory";
import PieCharts from "../PieCharts/PieCharts";

function DataSection() {
    return (
        <div className="card col-span-3 rounded-3xl flex flex-col h-full gap-2">
            <div className="flex-grow-[1] border-2 rounded-3xl">
                <TrackingHistory />
            </div>
            <div className="flex-grow-[1]">
                <div className="h-[200px] w-full">
                    <PieCharts />
                </div>
            </div>
        </div>
    )
}

export default DataSection