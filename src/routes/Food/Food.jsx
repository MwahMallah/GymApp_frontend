/*
 * Author: Anton Havlovskyi
 * VUT login: xhavlo01
*/

import FoodSection from "../../components/FoodSection/FoodSection";

function Food() {
    return (
        <div className="grow grid grid-cols-4 gap-8 mx-8 mb-10 overflow-y-auto overflow-x-hidden">
            <FoodSection />
        </div>
    )
}

export default Food