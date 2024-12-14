import PropTypes from "prop-types";
import { useRef, useState } from "react";

const Calendar = ({chosenDate}) => {
    const currDate = new Date();
    const weekShift = useRef(0);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

    function getCurrentWeek() {
        const pivotDate = new Date(currDate);
        pivotDate.setDate(currDate.getDate() + weekShift.current * 7);

        const startOfWeek = pivotDate.getDate() - pivotDate.getDay();
        const week = [];
      
        for (let i = 1; i < 8; i++) {
            const day = new Date(pivotDate);
            day.setDate(startOfWeek + i);
            week.push({
                name: day.toDateString().slice(0, 3),
                date: day.getDate() + " " + day.toDateString().split(" ")[1],
            });
        }
        return week;
    }
    
    const goToPreviousWeek = () => {
        weekShift.current -= 1;
        setCurrentWeek(getCurrentWeek());
    };
    
    const goToNextWeek = () => {
        weekShift.current += 1;
        setCurrentWeek(getCurrentWeek());
    };

    return (
        <div className="flex items-center justify-center space-x-4 p-4">
            <button
                onClick={goToPreviousWeek}
                className="bg-primary-muted text-white px-4 py-2 rounded-lg hover:bg-primary transition">
              Previous
            </button>

            <div className="flex flex-row gap-2">
                {currentWeek.map((day, index) => {
                    const chosenDateString = chosenDate.getDate() + " " + chosenDate.toDateString().split(" ")[1];

                    const containerStyle = day.date === chosenDateString
                        ? 'bg-primary text-white text-center py-2 px-4 rounded-lg text-lg w-20 h-20'
                        : 'bg-gray-200 text-center py-2 px-4 rounded-lg text-lg w-20 h-20';

                    return (<div
                        key={index}
                        className={containerStyle}>
                        <div>{day.name}</div>
                        <div className="text-sm text-gray-600">{day.date}</div>
                    </div>)
                })}
            </div>

            <button
                onClick={goToNextWeek}
                className="bg-primary-muted text-white px-4 py-2 rounded-lg hover:bg-primary transition"
            >
              Next
            </button>
        </div>
    );
};

Calendar.propTypes = {
    
};

export default Calendar;