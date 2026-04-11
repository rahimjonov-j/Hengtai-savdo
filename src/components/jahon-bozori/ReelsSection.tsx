import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Play, Volume2, VolumeX } from "lucide-react";
import { Section } from "./ScrollReveal";
import mijozbn from "@/assets/mijozbn.mp4";
import reel1 from "@/assets/videos/reel-1.mp4";
import reel2 from "@/assets/videos/reel-2.mp4";
import reel3 from "@/assets/videos/reel-3.mp4";

const reels = [
  { src: mijozbn, title: "Mijozlar fikri", description: "Savdo qilayotgan mijozlarning qisqa video fikrlari" },
  { src: reel1, title: "Reel 01", description: "Majmua bo'ylab qisqa video lavha" },
  { src: reel2, title: "Reel 02", description: "Tashqi ko'rinish va kirish qismi" },
  { src: reel3, title: "Reel 03", description: "Loyiha taqdimotidan qisqa kadr" },
];

export default function ReelsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);

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

    setActiveVideoIndex(index);

    if (video.paused || video.ended) {
      pauseOtherVideos(index);
      video.muted = isMuted;

      try {
        await video.play();
      } catch {
        setPlayingVideoIndex(null);
      }

      return;
    }

    video.pause();
  };

  const handlePlay = (index: number) => {
    pauseOtherVideos(index);
    setActiveVideoIndex(index);
    setPlayingVideoIndex(index);
  };

  const handlePause = (index: number) => {
    setPlayingVideoIndex((currentIndex) => (currentIndex === index ? null : currentIndex));
  };

  useEffect(() => {
    const videos = videoRefs.current;
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideos(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 }
    );

    if (sectionRef.current) {
      preloadObserver.observe(sectionRef.current);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      preloadObserver.disconnect();
      observer.disconnect();
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      videos.forEach((video) => video?.pause());
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = isMuted;

      if (!isSectionVisible || index !== activeVideoIndex) {
        video.pause();
      }
    });

    if (!isSectionVisible) return;

    const activeVideo = videoRefs.current[activeVideoIndex];
    if (!activeVideo) return;

    activeVideo.muted = isMuted;
    void activeVideo.play().catch(() => {
      setPlayingVideoIndex(null);
    });
  }, [activeVideoIndex, isMuted, isSectionVisible]);

  const scrollToVideo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const clampedIndex = Math.max(0, Math.min(reels.length - 1, index));
    setActiveVideoIndex(clampedIndex);
    container.scrollTo({
      top: clampedIndex * container.clientHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      const nextIndex = Math.round(container.scrollTop / container.clientHeight);
      const clampedIndex = Math.max(0, Math.min(reels.length - 1, nextIndex));
      setActiveVideoIndex(clampedIndex);
    }, 120);
  };

  const shouldMountVideoSource = (index: number) =>
    shouldLoadVideos && Math.abs(index - activeVideoIndex) <= 1;

  return (
    <section className="py-20 md:py-28 px-6 bg-card/50">
      <Section className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-black md:text-5xl">
          <span className="text-gradient-gold">Reels</span> va Videolar
        </h2>
        <div className="flex justify-center">
          <div ref={sectionRef} className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-black/80 p-[3px] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="overflow-hidden rounded-[2.45rem] bg-black">
                <div
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="hide-scrollbar h-[72vh] min-h-[34rem] max-h-[46rem] overflow-y-auto snap-y snap-mandatory overscroll-y-contain scroll-smooth bg-black"
                >
                  {reels.map((video, i) => (
                    <article key={video.title} className="h-full snap-start">
                      <div className="relative h-full bg-black">
                      <button
                        type="button"
                        onClick={() => {
                          void togglePlayback(i);
                        }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-transparent [touch-action:pan-y]"
                        aria-label={`${video.title} videoni ${playingVideoIndex === i ? "to'xtatish" : "ishga tushirish"}`}
                      >
                        {playingVideoIndex !== i && (
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform hover:scale-105">
                            <Play className="ml-1 h-7 w-7 fill-current" />
                          </span>
                        )}
                      </button>

                        <video
                          ref={(element) => {
                            videoRefs.current[i] = element;
                          }}
                          src={shouldMountVideoSource(i) ? video.src : undefined}
                          className="block h-full w-full object-cover"
                          muted={isMuted}
                          loop
                          playsInline
                          preload={shouldMountVideoSource(i) ? (i === activeVideoIndex ? "auto" : "metadata") : "none"}
                          title={video.title}
                          onPlay={() => handlePlay(i)}
                          onPause={() => handlePause(i)}
                          onEnded={() => handlePause(i)}
                        >
                          Brauzeringiz video ko'rsatishni qo'llab-quvvatlamaydi.
                        </video>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{video.title}</p>
                          <p className="mt-2 text-lg font-semibold text-white">{video.description}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                  <div className="pointer-events-auto rounded-full border border-white/10 bg-black/45 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    Reels feed
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMuted((currentValue) => !currentValue);
                    }}
                    className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition hover:scale-105"
                    aria-label={isMuted ? "Videolar ovozini yoqish" : "Videolar ovozini o'chirish"}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>

                <div className="ml-auto flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      scrollToVideo(activeVideoIndex - 1);
                    }}
                    disabled={activeVideoIndex === 0}
                    className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Oldingi videoga o'tish"
                  >
                    <ChevronUp className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToVideo(activeVideoIndex + 1);
                    }}
                    disabled={activeVideoIndex === reels.length - 1}
                    className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Keyingi videoga o'tish"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
