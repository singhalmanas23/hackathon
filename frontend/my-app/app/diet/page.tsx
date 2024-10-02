"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShimmerButton from "@/components/ui/shimmer-button";
import DietChart from "./dietChart";


// Helper component for label and input container
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default function PersonalizedDietPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const firstName = searchParams.get("firstName") || "";
  const email = searchParams.get("email") || "";

  // State to manage form inputs and BMI
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [gender, setGender] = useState<string>("male");
  const [bmi, setBmi] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Calculate BMI
    const calculatedBmi = weight && height ? weight / (height / 100) ** 2 : 0;
    setBmi(Number(calculatedBmi.toFixed(2)));

    console.log("Form submitted with:", {
      name: firstName || "User",
      email,
      age,
      weight,
      height,
      gender,
    });

    // Display the static diet chart after 5 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 bg-gray-900 min-h-screen">
      {/* Left side: User Details Form */}
      <div className="flex-1 p-4 md:p-8 bg-black text-white rounded-lg shadow-lg">
        <h2 className="font-bold text-xl">Let's Get to Know You</h2>
        <p className="mb-4">
          Fill out the form below to receive your personalized diet chart!
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* Age Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="age" className="text-neutral-300">
              Your Age
            </Label>
            <Input
              name="age"
              id="age"
              placeholder="Enter your age"
              type="number"
              className="bg-zinc-800 text-white placeholder:text-gray-600"
              onChange={(e) => setAge(Number(e.target.value))}
              required
            />
          </LabelInputContainer>

          {/* Weight Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="weight" className="text-neutral-300">
              Your Weight (kg)
            </Label>
            <Input
              name="weight"
              id="weight"
              placeholder="Enter your weight"
              type="number"
              className="bg-zinc-800 text-white placeholder:text-gray-600"
              onChange={(e) => setWeight(Number(e.target.value))}
              required
            />
          </LabelInputContainer>

          {/* Height Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="height" className="text-neutral-300">
              Your Height (cm)
            </Label>
            <Input
              name="height"
              id="height"
              placeholder="Enter your height"
              type="number"
              className="bg-zinc-800 text-white placeholder:text-gray-600"
              onChange={(e) => setHeight(Number(e.target.value))}
              required
            />
          </LabelInputContainer>

          {/* Gender Selection */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender" className="text-neutral-300">
              Gender
            </Label>
            <select
              name="gender"
              id="gender"
              className="bg-zinc-800 text-white rounded-md p-2"
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </LabelInputContainer>

          {/* Submit Button */}
          <ShimmerButton type="submit" className="mt-4">
            Get My Diet Chart &rarr;
          </ShimmerButton>
        </form>
      </div>

      {/* Right side: Personalized Diet Chart */}
      <div className="flex-1 p-4 bg-black text-white rounded-lg shadow mt-2">
        <h2 className="font-bold text-xl">Personalized Diet Chart</h2>
        <p className="mb-4">
          Based on the information you provide, we’ll create a customized diet
          plan just for you!
        </p>

        {loading ? (
          <p>Loading your personalized diet plan...</p>
        ) : (
          <DietChart bmi={bmi} age={age} gender={gender} />
        )}
      </div>
    </div>
  );
}
