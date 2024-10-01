import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function AnimatedGradientButton({
  children,
  className,
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-black px-6 py-2 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]  dark:bg-black/40 focus:outline-none",
        className
      )}
    >
      <div
        className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
      />

      <span className="relative z-10 text-white ">{children}</span>
    </button>
  );
}
