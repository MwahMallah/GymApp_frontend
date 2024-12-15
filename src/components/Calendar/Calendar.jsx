import PropTypes from "prop-types";
import { useRef, useState } from "react";

const Calendar = ({chosenDate, changeDate}) => {
    const currDate = new Date();
    const weekShift = useRef(0);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

    function getCurrentWeek() {
        const pivotDate = new Date(currDate);
        pivotDate.setDate(currDate.getDate() + weekShift.current * 7);

        const startOfWeek = pivotDate.getDate() - pivotDate.getDay();
        const week = [];
      
        for (let i = 1; i < 8; i++) {
            const day = new Date();
            day.setDate(startOfWeek + i);
            week.push({
                weekday: day.toDateString().slice(0, 3),
                datename: day.getDate() + " " + day.toDateString().split(" ")[1],
                date: new Date(day)
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
        <div className="card p-2 flex flex-col w-[900px]">
            <div className="flex items-center justify-center space-x-4 p-4">
                <button
                    onClick={goToPreviousWeek}
                    className="bg-primary-muted text-white px-4 py-2 rounded-lg hover:bg-primary transition">
                Previous
                </button>

                <div className="flex flex-row gap-2">
                    {currentWeek.map((day, index) => {
                        const chosenDateString = chosenDate.getDate() + " " + chosenDate.toDateString().split(" ")[1];

                        const containerStyle = day.datename === chosenDateString
                            ? 'bg-primary text-white text-center py-2 px-4 rounded-lg cursor-pointer text-lg w-20 h-20'
                            : 'bg-gray-200 text-center py-2 px-4 rounded-lg text-lg cursor-pointer hover:text-white hover:bg-primary-muted w-20 h-20';
                        const dateNameStyle = day.datename === chosenDateString
                            ? 'text-sm text-white'
                            : 'text-sm';

                        return (<div
                            key={index}
                            className={containerStyle}
                            onClick={() => changeDate(day.date)}>
                            <div>{day.weekday}</div>
                            <div className={dateNameStyle}>{day.datename}</div>
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
        </div>
    );
};

Calendar.propTypes = {
    
};

export default Calendar;