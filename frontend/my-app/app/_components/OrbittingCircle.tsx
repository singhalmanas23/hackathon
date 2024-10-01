import OrbitingCircles from "@/components/ui/orbiting-circles";


export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Fitness Freak
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.whatsapp />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Icons.notion />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <Icons.googleDrive />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <Icons.dumbell />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  dumbell: () => (
    <svg
    height="100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    style={{ fill: '#2196F3' }} 
>
    <path d="M104 112c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64v64h-64c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32v-64h64c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32h-64v-64h64c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32h-64v-64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64h-64v-64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64h-64zm192 0c0-17.7-14.3-32-32-32s-32 14.3-32 32v64h-64c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32v-64h64c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32h-64v-64z" />
</svg>

  ),
  notion: () => (
    <svg
    height="100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    style={{ fill: '#3F51B5' }} // Change color here
>
    <path d="M304 0c-44.2 0-80 35.8-80 80v48c0 30.9 17.4 57.7 43.5 71.2-20.4 18.4-33.5 44.8-33.5 73.8 0 55.2 44.8 100 100 100s100-44.8 100-100c0-29-13.1-55.4-33.5-73.8C416.6 185.7 434 158.9 434 128V80c0-44.2-35.8-80-80-80zm-40 64c0-22.1 17.9-40 40-40s40 17.9 40 40v48c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48zm40 272c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60zm0 32c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80z" />
</svg>
  ),
  openai: () => (
    <svg
    height="100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    style={{ fill: '#4CAF50' }} // Change color here
>
    <path d="M320 32c-35.3 0-64 28.7-64 64v64H192c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64v-64h64c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32h-64V96c0-35.3-28.7-64-64-64zM400 224v64h-32v-64h32zm-96 0v64h-32v-64h32zM224 384h64v64h-64v-64zm96 64h64v64h-64v-64z" />
</svg>
  ),
  googleDrive: () => (
    <svg
    height="100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    style={{ fill: '#FFC107' }} // Change color here
>
    <path d="M632 64H8C3.6 64 0 67.6 0 72v368c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8zm-424 368H56V136h152v296zm184 0H240V136h152v296zm184 0H424V136h152v296z" />
</svg>
  ),
  whatsapp: () => (
    <svg
    height="100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    style={{ fill: '#FFEB3B' }} // Change color here
>
    <path d="M96 64c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 160 0 64 0 160c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-64-32 0c-17.7 0-32-14.3-32-32l0-64c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-64c0-17.7 14.3-32 32-32l32 0 0-64zm448 0l0 64 32 0c17.7 0 32 14.3 32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 17.7-14.3 32-32 32l-32 0 0 64c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-160 0-64 0-160c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32zM416 224l0 64-192 0 0-64 192 0z" />
</svg>
  ),
};
