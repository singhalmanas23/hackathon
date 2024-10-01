"use client"
import Image from "next/image";
import Spline from "@splinetool/react-spline/next";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import AnimatedGradientButton from "@/components/ui/animated-gradient-text";
import { AnimatedListDemo } from "./_components/AnimatedL";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleClick=()=>{
    router.push('/signup');
  }
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        <div className="flex justify-center items-center">
          <div className="w-full h-[500px] lg:h-[600px]">
            <Spline scene="https://prod.spline.design/48Vs6PWEHczAUYt2/scene.splinecode" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start px-6 lg:px-12 ">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-200 text-nowrap">
            Welcome to AI Powered <br /> Fitness Assistant
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-gray-600">
            Elevate Your Strength. Your Fitness Journey Starts Here.
          </p>
          <AnimatedListDemo />
          <div className="mt-12">
            <AnimatedGradientButton onClick={handleClick}>Get Started</AnimatedGradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
