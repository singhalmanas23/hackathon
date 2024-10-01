"use client"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the CSS for the calendar

const ExerciseCalendar: React.FC = () => {
  // State to store the dates on which exercises were completed
  const [exerciseDates, setExerciseDates] = useState<Date[]>([]);

  // Function to simulate completing an exercise on a particular day
  const completeExercise = (date: Date) => {
    if (!exerciseDates.some(d => d.getTime() === date.getTime())) {
      setExerciseDates([...exerciseDates, date]);
    }
  };

  // Function to check if a day is an exercise day
  const isExerciseDay = (date: Date) => {
    return exerciseDates.some(d => d.getTime() === date.getTime());
  };

  return (
    <div>
      <h2>Exercise Calendar</h2>
      <Calendar
        tileClassName={({ date }) => {
          // Add a class to exercise days
          if (isExerciseDay(date)) {
            return 'exercise-day';
          }
        }}
      />

      <button onClick={() => completeExercise(new Date())}>
        Complete Exercise Today
      </button>

      {/* Custom CSS to mark exercise days */}
      <style>{`
        .exercise-day {
          background: #76c7c0 !important;
          color: white;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default ExerciseCalendar;
