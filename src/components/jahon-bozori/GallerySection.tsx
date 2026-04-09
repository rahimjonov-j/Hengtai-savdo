import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
import { Section } from "./ScrollReveal";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import gallery1 from "@/assets/gallery-1.webp";
import galleryCoveredWalkway from "@/assets/gallery-covered-walkway.webp";
import galleryWaterfrontBoulevard from "@/assets/gallery-waterfront-boulevard.webp";
import galleryMainGate from "@/assets/gallery-main-gate.webp";
import galleryTradeCourtyard from "@/assets/gallery-trade-courtyard.webp";
import galleryMarketHall1 from "@/assets/gallery-market-hall-1.webp";
import galleryMarketHall2 from "@/assets/gallery-market-hall-2.webp";
import galleryMarketHall3 from "@/assets/gallery-market-hall-3.webp";
import galleryMarketHall4 from "@/assets/gallery-market-hall-4.webp";
import galleryRenderAerialMasterplan from "@/assets/gallery-render-aerial-masterplan.webp";
import galleryRenderCentralPlazaAerial from "@/assets/gallery-render-central-plaza-aerial.webp";
import galleryRenderTerminalFront from "@/assets/gallery-render-terminal-front.webp";
import galleryRenderParkingCourt from "@/assets/gallery-render-parking-court.webp";
import galleryRenderEntryPlaza from "@/assets/gallery-render-entry-plaza.webp";
import galleryRenderSiteplanOverlay from "@/assets/gallery-render-siteplan-overlay.webp";
import galleryRenderTerminalParking from "@/assets/gallery-render-terminal-parking.webp";
import galleryRenderFruitMarket from "@/assets/gallery-render-fruit-market.webp";
import galleryRenderBoulevardView from "@/assets/gallery-render-boulevard-view.webp";
import galleryRenderMasterplanOverview from "@/assets/gallery-render-masterplan-overview.webp";

const images = [
  gallery1,
  galleryRenderAerialMasterplan,
  galleryCoveredWalkway,
  galleryRenderCentralPlazaAerial,
  galleryWaterfrontBoulevard,
  galleryRenderTerminalFront,
  galleryMainGate,
  galleryRenderEntryPlaza,
  galleryTradeCourtyard,
  galleryRenderFruitMarket,
  galleryMarketHall1,
  galleryRenderBoulevardView,
  galleryMarketHall2,
  galleryRenderTerminalParking,
  galleryMarketHall3,
  galleryRenderParkingCourt,
  galleryMarketHall4,
  galleryRenderSiteplanOverlay,
  galleryRenderMasterplanOverview,
];

const PREVIEW_IMAGE_COUNT = 6;
const previewImages = images.slice(0, PREVIEW_IMAGE_COUNT);
const extraImages = images.slice(PREVIEW_IMAGE_COUNT);

export default function GallerySection() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const pendingJumpToIndexRef = useRef<number | null>(null);
  const wheelNavigationAtRef = useRef(0);
  const hasSelectedImage = selectedImageIndex !== null;
  const activeImageIndex = selectedImageIndex ?? 0;
  const toggleButton = (
    <button
      type="button"
      onClick={() => setShowAllImages((prev) => !prev)}
      className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-primary transition-colors hover:text-primary/80"
    >
      {showAllImages ? "Kamroq ko'rish" : "Barcha rasmlar"}
      {showAllImages ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
  );

  const markImageLoaded = (index: number) => {
    setLoadedImages((current) => (current[index] ? current : { ...current, [index]: true }));
  };

  const openImageViewer = (index: number) => {
    pendingJumpToIndexRef.current = index;
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImageIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        if (carouselApi) {
          carouselApi.scrollPrev();
          return;
        }

        setSelectedImageIndex((current) => {
          const nextIndex = current === null ? 0 : Math.max(0, current - 1);
          pendingJumpToIndexRef.current = nextIndex;
          return nextIndex;
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        if (carouselApi) {
          carouselApi.scrollNext();
          return;
        }

        setSelectedImageIndex((current) => {
          const nextIndex = current === null ? 0 : Math.min(images.length - 1, current + 1);
          pendingJumpToIndexRef.current = nextIndex;
          return nextIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [carouselApi, selectedImageIndex]);

  useEffect(() => {
    if (!carouselApi) return;

    const syncSelectedImage = () => {
      const nextIndex = carouselApi.selectedScrollSnap();
      if (pendingJumpToIndexRef.current === nextIndex) {
        pendingJumpToIndexRef.current = null;
      }
      setSelectedImageIndex(nextIndex);
    };

    syncSelectedImage();
    carouselApi.on("select", syncSelectedImage);
    carouselApi.on("reInit", syncSelectedImage);

    return () => {
      carouselApi.off("select", syncSelectedImage);
      carouselApi.off("reInit", syncSelectedImage);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || selectedImageIndex === null) return;

    if (pendingJumpToIndexRef.current !== selectedImageIndex) return;

    carouselApi.scrollTo(selectedImageIndex, true);
  }, [carouselApi, selectedImageIndex]);

  useEffect(() => {
    let isCancelled = false;
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;

    const preloadImage = (src: string, index: number) => {
      const image = new Image();
      let isDone = false;

      const finalize = () => {
        if (isDone || isCancelled) return;
        isDone = true;
        markImageLoaded(index);
      };

      image.decoding = "async";
      image.onload = finalize;
      image.onerror = finalize;
      image.src = src;

      if (image.complete) {
        finalize();
        return;
      }

      if (typeof image.decode === "function") {
        void image.decode().then(finalize).catch(() => {});
      }
    };

    const preloadPreviewImages = () => {
      previewImages.forEach((src, index) => preloadImage(src, index));
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(preloadPreviewImages, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(preloadPreviewImages, 300);
    }

    return () => {
      isCancelled = true;

      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!showAllImages) return;

    let isCancelled = false;

    extraImages.forEach((src, offset) => {
      const image = new Image();
      const imageIndex = PREVIEW_IMAGE_COUNT + offset;
      let isDone = false;

      const finalize = () => {
        if (isDone || isCancelled) return;
        isDone = true;
        markImageLoaded(imageIndex);
      };

      image.decoding = "async";
      image.onload = finalize;
      image.onerror = finalize;
      image.src = src;

      if (image.complete) {
        finalize();
        return;
      }

      if (typeof image.decode === "function") {
        void image.decode().then(finalize).catch(() => {});
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [showAllImages]);

  useEffect(() => {
    if (selectedImageIndex === null) return;

    [selectedImageIndex - 1, selectedImageIndex, selectedImageIndex + 1]
      .filter((index) => index >= 0 && index < images.length)
      .forEach((index) => {
        const image = new Image();
        let isDone = false;

        const finalize = () => {
          if (isDone) return;
          isDone = true;
          markImageLoaded(index);
        };

        image.decoding = "async";
        image.onload = finalize;
        image.onerror = finalize;
        image.src = images[index];

        if (image.complete) {
          finalize();
          return;
        }

        if (typeof image.decode === "function") {
          void image.decode().then(finalize).catch(() => {});
        }
      });
  }, [selectedImageIndex]);

  const handleModalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!carouselApi) return;

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (Math.abs(dominantDelta) < 24) return;

    const now = Date.now();
    if (now - wheelNavigationAtRef.current < 420) {
      event.preventDefault();
      return;
    }

    wheelNavigationAtRef.current = now;
    event.preventDefault();

    if (dominantDelta > 0) {
      carouselApi.scrollNext();
      return;
    }

    carouselApi.scrollPrev();
  };

  const renderImageCard = (src: string, index: number) => (
    <button
      key={index}
      type="button"
      onClick={() => openImageViewer(index)}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card bg-black/20 text-left"
      aria-label={`Jahon Bozori ko'rinishi ${index + 1} rasmini kattalashtirish`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] transition-opacity duration-300 ${loadedImages[index] ? "opacity-0" : "animate-pulse opacity-100"}`}
      />
      <img
        src={src}
        alt={`Jahon Bozori ko'rinishi ${index + 1}`}
        className={`h-full w-full cursor-zoom-in object-cover transition-[transform,opacity] duration-500 ${loadedImages[index] ? "opacity-100 hover:scale-105" : "opacity-0"}`}
        loading={index < PREVIEW_IMAGE_COUNT ? "eager" : "lazy"}
        fetchPriority={index < 2 ? "high" : "auto"}
        decoding="async"
        onLoad={() => markImageLoaded(index)}
      />
    </button>
  );

  return (
    <section className="py-20 md:py-28 px-6">
      <Section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
          <span className="text-gradient-gold">Loyiha</span> ko'rinishi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((src, i) => renderImageCard(src, i))}
        </div>

        {extraImages.length > 0 && !showAllImages && (
          <div className="mt-6 text-center">
            {toggleButton}
          </div>
        )}

        {showAllImages && (
          <div className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {extraImages.map((src, i) => renderImageCard(src, previewImages.length + i))}
            </div>

            <div className="mt-6 text-center">
              {toggleButton}
            </div>
          </div>
        )}

        {hasSelectedImage && (
          <div
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md px-4 py-6 md:px-8 md:py-10"
            onClick={() => {
              pendingJumpToIndexRef.current = null;
              setSelectedImageIndex(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Jahon Bozori ko'rinishi ${activeImageIndex + 1}`}
          >
            <button
              type="button"
              onClick={() => {
                pendingJumpToIndexRef.current = null;
                setSelectedImageIndex(null);
              }}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-8 md:top-8"
              aria-label="Rasmni yopish"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex min-h-full items-center justify-center">
              <div
                className="w-full max-w-6xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between gap-3 text-white">
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                  <p className="hidden text-sm text-white/75 md:block">
                    Swipe, scroll yoki strelka tugmalari bilan barcha rasmlarni ko'ring
                  </p>
                </div>

                <div
                  className="relative"
                  onWheelCapture={handleModalWheel}
                >
                  <Carousel
                    setApi={setCarouselApi}
                    opts={{ align: "start", startIndex: activeImageIndex, duration: 32 }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-0 will-change-transform">
                      {images.map((src, index) => (
                        <CarouselItem key={src} className="pl-0">
                          <div className="relative flex min-h-[60vh] items-center justify-center">
                            <div
                              aria-hidden="true"
                              className={`absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] transition-opacity duration-300 ${loadedImages[index] ? "opacity-0" : "animate-pulse opacity-100"}`}
                            />
                            <img
                              src={src}
                              alt={`Jahon Bozori ko'rinishi ${index + 1}`}
                              loading={Math.abs(index - activeImageIndex) <= 1 ? "eager" : "lazy"}
                              fetchPriority={Math.abs(index - activeImageIndex) <= 1 ? "high" : "auto"}
                              decoding="async"
                              onLoad={() => markImageLoaded(index)}
                              className={`max-h-[78vh] w-full rounded-[1.75rem] object-contain shadow-2xl transition-opacity duration-300 ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  <button
                    type="button"
                    onClick={() => carouselApi?.scrollPrev()}
                    disabled={activeImageIndex === 0}
                    className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 md:left-4"
                    aria-label="Oldingi rasm"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => carouselApi?.scrollNext()}
                    disabled={activeImageIndex === images.length - 1}
                    className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-sm transition enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 md:right-4"
                    aria-label="Keyingi rasm"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={`h-2.5 rounded-full transition-all ${index === activeImageIndex ? "w-8 bg-primary" : "w-2.5 bg-white/35 hover:bg-white/55"}`}
                      aria-label={`${index + 1}-rasmga o'tish`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>
    </section>
  );
}
