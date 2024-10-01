"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShimmerButton from "@/components/ui/shimmer-button";

export default function PersonalizedDietPage() {
  const router = useRouter();

  // Replace useLocation with useRouter and access state using router.query or router.asPath
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName') || '';
  console.log(firstName);
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';
  localStorage.setItem("email",email);
  const password = searchParams.get('password') || '';
    
  
  const name = firstName; 
  console.log(name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;

    // Access input values
    const age = Number(
      (target.elements.namedItem("age") as HTMLInputElement).value
    );
    const weight = Number(
      (target.elements.namedItem("weight") as HTMLInputElement).value
    );
    const height = Number(
      (target.elements.namedItem("height") as HTMLInputElement).value
    );
    const gender = (target.elements.namedItem("gender") as HTMLSelectElement)
      .value;
    const type = (target.elements.namedItem("workout") as HTMLSelectElement)
      .value;

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      console.error("Invalid input values");
      return;
    }

    const bmi = weight ? (weight / (height / 100) ** 2).toFixed(2) : "0";
    const userData = {
      name:"Manas",
      email,
      password,
      age,
      weight,
      height,
      gender,
      type,
    };

    console.log("User details submitted", userData);

    try {
      // Step 1: Sign up the user
      const signupResponse = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!signupResponse.ok) {
        throw new Error("Failed to sign up user");
      }

      const signupData = await signupResponse.json();

      // Step 2: Get the workout plan
      const workoutResponse = await fetch("http://localhost:5001/work/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bmi, age, gender, type }),
      });

      if (!workoutResponse.ok) {
        throw new Error("Failed to fetch workout plan");
      }
      

      const workoutData = await workoutResponse.json();
      console.log(workoutData);
    // localStorage.setItem("email",workoutData.email);
    
     // Get the email from local storage
const email = localStorage.getItem("email");
const bodyData = {
    id: email,
    week: "0",
  };
if (email) {
    const workResponse = await fetch('http://localhost:5001/api/getPlans', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

  if (!workResponse.ok) {
    throw new Error("Failed to fetch plans");
  }

  const res = await workResponse.json();
  
  console.log("Plans:", res);
} else {
  console.error("No email found in local storage.");
}



      console.log("Workout plan:", localStorage);
      console.log("User details submitted", signupData);
    } catch (error) {
      console.error("An error");
    }
  };


  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4">
      {/* Left side: User Details Form */}
      <div className="flex-1 p-4 md:p-8 bg-black text-white rounded-lg shadow-lg">
        <h2 className="font-bold text-xl">Let's Get to Know You</h2>
        <p className="mb-4">
          Fill out the form below to receive your personalized diet chart!
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
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
            />
          </LabelInputContainer>

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
            />
          </LabelInputContainer>

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
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender" className="text-neutral-300">
              Gender
            </Label>
            <select
              name="gender"
              id="gender"
              className="bg-zinc-800 text-white rounded-md p-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="workout" className="text-neutral-300">
              Type of workout
            </Label>
            <select
              name="workout"
              id="workout"
              className="bg-zinc-800 text-white rounded-md p-2"
            >
              <option value="full">Full Body</option>
              <option value="shoulder">Shoulder</option>
              <option value="arms">Arms</option>
              <option value="legs">Legs</option>
              <option value="core">Core</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="goal" className="text-neutral-300">
              What’s your primary goal?
            </Label>
            <select
              name="goal"
              id="goal"
              className="bg-zinc-800 text-white rounded-md p-2"
            >
              <option value="weightLoss">Weight Loss</option>
              <option value="weightGain">Weight Gain</option>
              <option value="maintain">Maintain Weight</option>
            </select>
          </LabelInputContainer>

          <ShimmerButton type="submit" className="mt-4">
            Get My Diet Chart &rarr;
          </ShimmerButton>
        </form>
      </div>

      {/* Right side: Additional Info or Graphics */}
      <div className="flex-1 p-4 bg-black text-white rounded-lg shadow mt-2">
        <h2 className="font-bold text-xl">Personalized Diet Chart</h2>
        <p className="mb-4">
          Based on the information you provide, we’ll create a customized diet
          plan just for you!
        </p>
        {/* Add any visuals or additional components here, like an infographic */}
      </div>
    </div>
  );
}

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
