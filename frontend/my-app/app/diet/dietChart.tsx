// components/DietChart.tsx
"use client";
import { useState, useEffect } from "react";

// Component to display Personalized Diet Chart
interface DietChartProps {
  bmi: number;
  age: number;
  gender: string;
}

const DietChart = ({ bmi, age, gender }: DietChartProps) => {
  const [dietChart, setDietChart] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Only proceed if BMI, age, and gender are valid
    if (bmi > 0 && age > 0 && gender) {
      console.log("DietChart useEffect triggered with bmi:", bmi);
      setLoading(true);
      setDietChart(null); // Reset dietChart before showing new data

      const timer = setTimeout(() => {
        // Set the static diet chart data
        setDietChart({
          meals: [
            { time: "Breakfast", description: "Oats with fruits and nuts" },
            { time: "Lunch", description: "Grilled chicken with salad and quinoa" },
            { time: "Snack", description: "Greek yogurt with berries" },
            { time: "Dinner", description: "Vegetable stir-fry with tofu" },
          ],
        });
        setLoading(false);
        console.log("Static diet chart set");
      }, 5000); // 5-second delay

      // Cleanup the timer if the component unmounts or props change
      return () => clearTimeout(timer);
    }
  }, [bmi, age, gender]);

  return (
    <div className="flex-1 p-4 bg-black text-white rounded-lg shadow mt-2">
      {loading ? (
        <p>Loading your personalized diet plan...</p>
      ) : (
        dietChart && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Diet Plan:</h3>
            <ul className="list-disc pl-5">
              {dietChart.meals.map((meal: any, index: number) => (
                <li key={index}>
                  <strong>{meal.time}:</strong> {meal.description}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default DietChart;
