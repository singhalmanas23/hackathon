"use client";
import { CalendarRange } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarDemo } from "../_components/calenderDemo";

// Exercise Interface
interface Exercise {
  name: string;
  status: boolean;
}

// DayCard Props Interface
interface DayCardProps {
  day: string;
  exercises: Exercise[];
  shiftDayRight: () => void; // Function to shift day
}

// DayCard Component
const DayCard = ({ day, exercises, shiftDayRight }: DayCardProps) => {
  const router = useRouter();

  // Function to handle exercise click and navigate
  const handleExerciseClick = (exName: string, status: boolean) => {
    router.push(
      `/dashboard?exerciseName=${encodeURIComponent(
        exName
      )}&status=${encodeURIComponent(status)}`
    );
  };

  return (
    <div className="p-6 border rounded-lg shadow-md  bg-neutral-900 dark:border-gray-700 w-[500px]">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{day}</h2>
      <ul className="space-y-2">
        {exercises.map((exercise, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => handleExerciseClick(exercise.name, exercise.status)}
          >
            <span className="dark:text-white">{exercise.name}</span>
            <span
              className={`${
                exercise.status ? "text-green-500" : "text-red-500"
              }`}
            >
              {exercise.status ? "Completed" : "Incomplete"}
            </span>
          </li>
        ))}
      </ul>
      {/* Shift Button included inside the card */}
      <button
        onClick={shiftDayRight}
        className="mt-4 w-full py-2 bg- text-white rounded hover:bg-blue-600"
      >
        →
      </button>
    </div>
  );
};

// Dashboard Component
export default function Dashboard() {
  const [days, setDays] = useState([
    {
      day: "Monday",
      exercises: [
        { name: "Push-ups", status: true },
        { name: "Sit-ups", status: true},
        { name: "Squats", status: false },
        { name: "Lunges", status: true },
        { name: "Plank", status: true },
      ],
    },
    {
      day: "Tuesday",
      exercises: [
        { name: "Jumping Jacks", status: false },
        { name: "Burpees", status: true },
        { name: "Mountain Climbers", status: false },
        { name: "High Knees", status: true },
        { name: "Butt Kicks", status: true },
      ],
    },
    {
      day: "Wednesday",
      exercises: [
        { name: "Pull-ups", status: true },
        { name: "Dips", status: false },
        { name: "Leg Raises", status: true },
        { name: "Crunches", status: false },
        { name: "Plank", status: true },
      ],
    },
    {
      day: "Thursday",
      exercises: [
        { name: "Sprints", status: true },
        { name: "Jump Rope", status: false },
        { name: "Box Jumps", status: true },
        { name: "Lunges", status: false },
        { name: "Push-ups", status: true },
      ],
    },
    {
      day: "Friday",
      exercises: [
        { name: "Squats", status: false },
        { name: "Deadlifts", status: true },
        { name: "Bench Press", status: false },
        { name: "Rows", status: true },
        { name: "Overhead Press", status: true },
      ],
    },
    {
      day: "Saturday",
      exercises: [
        { name: "Jogging", status: true },
        { name: "Cycling", status: false },
        { name: "Swimming", status: true },
        { name: "Boxing", status: false },
        { name: "Yoga", status: true },
      ],
    },
    {
      day: "Sunday",
      exercises: [{ name: "Rest Day", status: true }],
    },
  ]);

  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  // Function to shift to the next day
  const shiftDayRight = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex + 1) % days.length);
  };

  return (
    <div className="p-8 space-y-8 dark:bg-gray-900 min-h-screen  justify-center items-center flex flex-col">
        <h2 className="text-7xl font-serif">Welcome to your personalized dashboard</h2>
      <div className="flex flex-row">
      <DayCard
        day={days[currentDayIndex].day}
        exercises={days[currentDayIndex].exercises}
        shiftDayRight={shiftDayRight}
      />
      <div className="ml-48">
      <CalendarDemo/>
      </div>
      
      </div>
    </div>
  );
}
