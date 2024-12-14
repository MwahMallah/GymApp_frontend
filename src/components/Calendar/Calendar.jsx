import React, { useState } from "react";

const WeekSwitcher = () => {
  var shift = 0;
  var currDate = new Date();

  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  function getCurrentWeek() {
    //var currDate = new Date();
    currDate.setDate(currDate.getDate() + shift);
    const startOfWeek = currDate.getDate() - currDate.getDay();
    const week = [];
  
    for (let i = 1; i < 8; i++) {
      const day = new Date(currDate);
      day.setDate(startOfWeek + i);
      week.push({
        name: day.toDateString().slice(0, 3),
        date: day.getDate() + " " + day.toDateString().split(" ")[1],
      });
    }
    return week;
  }
  
  const goToPreviousWeek = () => {
    shift = -7;
    setCurrentWeek(getCurrentWeek());
  };
  
  const goToNextWeek = () => {
    shift = 7;
    setCurrentWeek(getCurrentWeek());
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-4">
      <button
        onClick={goToPreviousWeek}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {currentWeek.map((day, index) => (
          <div
            key={index}
            className="bg-gray-200 text-center py-2 px-4 rounded-lg text-lg"
          >
            <div>{day.name}</div>
            <div className="text-sm text-gray-600">{day.date}</div>
          </div>
        ))}
      </div>

      <button
        onClick={goToNextWeek}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Next
      </button>
    </div>
  );
};

export default WeekSwitcher;