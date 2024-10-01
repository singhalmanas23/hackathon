"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
            <li key={exercise.id}>
              <button
                onClick={() => handleExerciseClick(exercise)} // Pass the entire exercise object
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-left"
              >
                <div>
                  <span className="font-semibold">{exercise.name}</span>
                  <div className="text-sm text-gray-600">
                    Sets: {exercise.sets}, Reps: {exercise.reps}
                  </div>
                </div>
              </button>
            </li>
          ))
        ) : (
          <li>No exercises found.</li>
        )}
      </ul>
    </div>
  );
}
