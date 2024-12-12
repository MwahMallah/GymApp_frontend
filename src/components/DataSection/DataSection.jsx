
import TrackingHistory from "../TrackingHistory/TrackingHistory";

function DataSection() {
    return (
        <div className="card col-span-3 rounded-3xl flex flex-col h-full gap-2">
            <div className="flex-grow-[1] border-2 rounded-3xl">
                <TrackingHistory />
            </div>
            <div className="flex-grow-[1]">
                <div className="bg-gray-600 h-[200px] w-full">

                </div>
            </div>
        </div>
    )
}

export default DataSection