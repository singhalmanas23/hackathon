"use client"
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import heroThumbnail from '/thumb.jpeg';



export default function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://youtu.be/THYXQReFg5E?si=WjOiTya8JxDpTkPi"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://youtu.be/THYXQReFg5E?si=WjOiTya8JxDpTkPi"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
        
      />
    </div>
  );
}
