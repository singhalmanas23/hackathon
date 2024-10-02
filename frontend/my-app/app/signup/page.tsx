"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/ui/border-beam";
import { OrbitingCirclesDemo } from "../_components/OrbittingCircle";
import { useRouter } from "next/navigation";

export default function Page() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    twitterpassword: "",
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert form data to query string
    const queryString = new URLSearchParams(formData).toString();

    // Navigate to the personalized diet page with form data
    router.push(`/diet?${queryString}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4">
      {/* Left side: Signup Form */}
      <div className="relative flex-1 p-4 md:p-8 bg-black text-white rounded-lg shadow-lg overflow-hidden">
        <BorderBeam size={200} duration={12} delay={9} className="absolute inset-0 z-0" />
        
        <h2 className="font-bold text-xl z-10 relative">Let's get started</h2>

        <form className="my-8 relative z-10" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-white">First name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={formData.firstname}
                onChange={handleInputChange}
                className="bg-zinc-800 text-white placeholder:text-gray-600"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-neutral-300">Last name</Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                value={formData.lastname}
                onChange={handleInputChange}
                className="bg-zinc-800 text-white placeholder:text-gray-600"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-zinc-800 text-white placeholder:text-gray-600"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-neutral-300">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-zinc-800 text-white placeholder:text-gray-600"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="twitterpassword" className="text-neutral-300">Confirm password</Label>
            <Input
              id="twitterpassword"
              placeholder="••••••••"
              type="password"
              value={formData.twitterpassword}
              onChange={handleInputChange}
              className="bg-zinc-800 text-white placeholder:text-gray-600"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-zinc-800 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <SocialButton type="button" icon={<IconBrandGithub />} text="GitHub" />
            <SocialButton type="button" icon={<IconBrandGoogle />} text="Google" />
          </div>
        </form>
      </div>

      {/* Right side: Orbiting Circles */}
      <div className="flex-1 p-4 bg-black text-white rounded-lg shadow mt-32">
        <OrbitingCirclesDemo />
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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

const SocialButton = ({
  type,
  icon,
  text,
}: {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon: React.ReactNode;
  text: string;
}) => (
  <button
    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input bg-zinc-800"
    type={type}
  >
    {icon}
    <span className="text-neutral-300 text-sm">{text}</span>
    <BottomGradient />
  </button>
);
