"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DemoVid from "../_components/DemoVid";


interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
}

export default function ExercisePage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleDemoVideoClick = (exercise: Exercise) => {
    setSelectedExercise(exercise); // Set the selected exercise for the demo video
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    console.log(storedEmail);
    setEmail(storedEmail);

    const fetchExercises = async () => {
      if (storedEmail) {
        try {
          const bodyData = { id: storedEmail, week: 0 };

          const response = await fetch('http://localhost:5001/api/getPlans', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          });

          console.log('Response status:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error("Failed to fetch exercises");
          }

          const data = await response.json();
          console.log("Fetched exercises:", data);

          if (data.success && data.plans) {
            setExercises(data.plans);
          } else {
            console.error("No exercises found in response");
          }
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      }
    };

    fetchExercises();
  }, []);

  const handleExerciseClick = (exercise: Exercise) => {
    console.log("Selected exercise:", exercise);
    router.push(`/posture?exerciseId=${encodeURIComponent(exercise.name)}&sets=${encodeURIComponent(exercise.sets)}&reps=${encodeURIComponent(exercise.reps)}`);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl mb-4">Select an Exercise</h1>
      <ul className="space-y-2">
        {exercises.length > 0 ? (
          exercises.map((exercise: Exercise) => (
            <li key={exercise.id} className="flex items-center mb-2">
              <button
                onClick={() => handleExerciseClick(exercise)}
                className="p-2 border text-white rounded hover:bg-blue-600 w-[300px] text-left"
              >
                <div>
                  <span className="font-semibold">{exercise.name}</span>
                  <div className="text-sm text-gray-200">
                    Sets: {exercise.sets}, Reps: {exercise.reps}
                  </div>
                </div>
              </button>

              <div className="flex space-x-2 ml-4">
                <button
                  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                  onClick={() => handleDemoVideoClick(exercise)}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                    <span>Demo video</span>
                    <svg
                      fill="none"
                      height="16"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.75 8.75L14.25 12L10.75 15.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  onClick={<DemoVid/>}
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No exercises found.</li>
        )}
      </ul>

    </div>
  );
}
