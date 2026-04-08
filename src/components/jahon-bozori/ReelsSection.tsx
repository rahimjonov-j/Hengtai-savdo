import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Section } from "./ScrollReveal";
import reel1 from "@/assets/videos/reel-1.mp4";
import reel2 from "@/assets/videos/reel-2.mp4";
import reel3 from "@/assets/videos/reel-3.mp4";

const reels = [
  { src: reel1, title: "Video 1" },
  { src: reel2, title: "Video 2" },
  { src: reel3, title: "Video 3" },
];

export default function ReelsSection() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const pauseOtherVideos = (currentIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== currentIndex && video && !video.paused) {
        video.pause();
      }
    });
  };

  const togglePlayback = async (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused || video.ended) {
      pauseOtherVideos(index);

      try {
        await video.play();
        setActiveVideoIndex(index);
      } catch {
        setActiveVideoIndex(null);
      }

      return;
    }

    video.pause();
    setActiveVideoIndex((currentIndex) => (currentIndex === index ? null : currentIndex));
  };

  const handlePlay = (index: number) => {
    pauseOtherVideos(index);
    setActiveVideoIndex(index);
  };

  const handlePause = (index: number) => {
    setActiveVideoIndex((currentIndex) => (currentIndex === index ? null : currentIndex));
  };

  useEffect(() => {
    return () => {
      videoRefs.current.forEach((video) => video?.pause());
    };
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 bg-card/50">
      <Section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
          <span className="text-gradient-gold">Reels</span> va videolar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reels.map((video, i) => (
            <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden glass-card bg-black">
              <button
                type="button"
                onClick={() => {
                  void togglePlayback(i);
                }}
                className="absolute inset-x-0 top-0 bottom-14 z-10 flex items-center justify-center bg-transparent [touch-action:pan-y]"
                aria-label={`${video.title} videoni ${activeVideoIndex === i ? "to'xtatish" : "ishga tushirish"}`}
              >
                {activeVideoIndex !== i && (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform hover:scale-105">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                )}
              </button>

              <video
                ref={(element) => {
                  videoRefs.current[i] = element;
                }}
                className="h-full w-full cursor-pointer object-cover"
                controls
                preload="metadata"
                playsInline
                controlsList="nodownload noplaybackrate"
                title={video.title}
                onPlay={() => handlePlay(i)}
                onPause={() => handlePause(i)}
                onEnded={() => handlePause(i)}
              >
                <source src={video.src} type="video/mp4" />
                Brauzeringiz video ko'rsatishni qo'llab-quvvatlamaydi.
              </video>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
