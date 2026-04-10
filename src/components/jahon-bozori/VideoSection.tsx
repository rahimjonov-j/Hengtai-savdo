import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, ExternalLink } from "lucide-react";
import { Section } from "./ScrollReveal";
import videoSrc from "@/assets/jahon-bozori-video.mp4";
import videoPoster from "@/assets/jahon-bozori-hero.webp";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    try {
      setHasError(false);
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.01 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo || !isSectionVisible) return;

    const attemptAutoplay = async () => {
      try {
        setHasError(false);
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    void attemptAutoplay();
  }, [isSectionVisible, shouldLoadVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isSectionVisible) return;

    video.pause();
    setIsPlaying(false);
  }, [isSectionVisible]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;

      if (videoRef.current.paused) {
        void playVideo();
      }
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      void playVideo();
      return;
    }

    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-card/50">
      <Section className="max-w-4xl mx-auto">
        <h2 className="-mt-3 mb-5 text-center text-3xl md:text-5xl font-black tracking-tight text-primary">
          VIDEONI KO'RING
        </h2>

        <div className="glass-card rounded-[2rem] p-3 md:p-4 glow-gold">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-black aspect-video">
            <video
              ref={videoRef}
              src={shouldLoadVideo ? videoSrc : undefined}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              preload={shouldLoadVideo ? "metadata" : "none"}
              poster={videoPoster}
              onClick={togglePlayback}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={() => setHasError(false)}
              onError={() => {
                setHasError(true);
                setIsPlaying(false);
              }}
            >
              Brauzeringiz video ko'rsatishni qo'llab-quvvatlamaydi.
            </video>

            {!hasError && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/85"
                aria-label={isMuted ? "Videodagi ovozni yoqish" : "Videodagi ovozni o'chirish"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isMuted ? "Ovoz uchun bosing" : "Ovoz yoqilgan"}
              </button>
            )}

            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 px-6 text-center text-white">
                <p className="max-w-md text-sm md:text-base text-white/85">
                  Video shu blokda yuklanmadi. Quyidagi tugma orqali uni alohida oynada ochishingiz mumkin.
                </p>
                <a
                  href={videoSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4" />
                  Videoni ochish
                </a>
              </div>
            )}

            {!hasError && !isPlaying && (
              <button
                type="button"
                onClick={togglePlayback}
                className="absolute inset-0 flex items-center justify-center bg-black/35"
                aria-label="Videoni davom ettirish"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-xl">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-lg font-bold text-gradient-gold md:text-2xl">
          Joy Band Qilishdan Oldin Bu videoni ko&apos;ring!
        </p>
      </Section>
    </section>
  );
}
