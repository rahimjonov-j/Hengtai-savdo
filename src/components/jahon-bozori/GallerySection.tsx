import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Section } from "./ScrollReveal";
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
  const imageViewerOverlaySwipeStartXRef = useRef<number | null>(null);
  const imageViewerImageSwipeStartXRef = useRef<number | null>(null);
  const hasSelectedImage = selectedImageIndex !== null;
  const activeImageIndex = selectedImageIndex ?? 0;

  const toggleButton = (
    <button
      type="button"
      onClick={() => setShowAllImages((prev) => !prev)}
      className="inline-flex items-center gap-2 text-lg font-bold text-primary transition-colors hover:text-primary/80 md:text-xl"
    >
      {showAllImages ? "Kamroq ko'rish" : "Barcha rasmlar"}
      {showAllImages ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
  );

  const markImageLoaded = (index: number) => {
    setLoadedImages((current) => (current[index] ? current : { ...current, [index]: true }));
  };

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((current) => (current === null ? 0 : Math.max(0, current - 1)));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((current) => (current === null ? 0 : Math.min(images.length - 1, current + 1)));
  };

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeImageViewer();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousImage();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

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

  const renderImageCard = (src: string, index: number) => (
    <button
      key={index}
      type="button"
      onClick={() => openImageViewer(index)}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/20 text-left glass-card"
      aria-label={`Jahon Bozori ko'rinishi ${index + 1} rasmini kattalashtirish`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] transition-opacity duration-300 ${
          loadedImages[index] ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      />
      <img
        src={src}
        alt={`Jahon Bozori ko'rinishi ${index + 1}`}
        className={`h-full w-full cursor-zoom-in object-cover transition-[transform,opacity] duration-500 ${
          loadedImages[index] ? "opacity-100 hover:scale-105" : "opacity-0"
        }`}
        loading={index < PREVIEW_IMAGE_COUNT ? "eager" : "lazy"}
        fetchPriority={index < 2 ? "high" : "auto"}
        decoding="async"
        onLoad={() => markImageLoaded(index)}
      />
    </button>
  );

  const imageViewerModal =
    hasSelectedImage && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black/90 backdrop-blur-md"
            onClick={closeImageViewer}
            role="dialog"
            aria-modal="true"
            aria-label={`Jahon Bozori ko'rinishi ${activeImageIndex + 1}`}
          >
            <div
              className="flex h-full w-full max-w-[1800px] flex-col px-3 py-3 md:px-6 md:py-5"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => {
                imageViewerOverlaySwipeStartXRef.current = event.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const swipeStartX = imageViewerOverlaySwipeStartXRef.current;
                const swipeEndX = event.changedTouches[0]?.clientX ?? null;

                if (swipeStartX !== null && swipeEndX !== null && swipeEndX - swipeStartX >= 80) {
                  closeImageViewer();
                }

                imageViewerOverlaySwipeStartXRef.current = null;
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 px-3 py-3 text-white backdrop-blur-sm md:px-5">
                <button
                  type="button"
                  onClick={closeImageViewer}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Orqaga
                </button>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>

              <div
                className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/35 px-2 py-2 md:px-4 md:py-4"
                onTouchStart={(event) => {
                  event.stopPropagation();
                  imageViewerImageSwipeStartXRef.current = event.changedTouches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  event.stopPropagation();
                  const swipeStartX = imageViewerImageSwipeStartXRef.current;
                  const swipeEndX = event.changedTouches[0]?.clientX ?? null;

                  if (swipeStartX !== null && swipeEndX !== null) {
                    const swipeDistance = swipeEndX - swipeStartX;

                    if (swipeDistance >= 80) {
                      closeImageViewer();
                    } else if (swipeDistance <= -80) {
                      goToNextImage();
                    }
                  }

                  imageViewerImageSwipeStartXRef.current = null;
                }}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] transition-opacity duration-300 ${
                    loadedImages[activeImageIndex] ? "opacity-0" : "animate-pulse opacity-100"
                  }`}
                />

                <img
                  src={images[activeImageIndex]}
                  alt={`Jahon Bozori ko'rinishi ${activeImageIndex + 1}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onLoad={() => markImageLoaded(activeImageIndex)}
                  className={`relative z-10 max-h-full max-w-full object-contain transition-opacity duration-300 ${
                    loadedImages[activeImageIndex] ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={goToPreviousImage}
                  disabled={activeImageIndex === 0}
                  className="absolute left-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-sm transition enabled:hover:scale-105 enabled:hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-35 md:left-5 md:h-14 md:w-14"
                  aria-label="Oldingi rasm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={goToNextImage}
                  disabled={activeImageIndex === images.length - 1}
                  className="absolute right-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-sm transition enabled:hover:scale-105 enabled:hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-35 md:right-5 md:h-14 md:w-14"
                  aria-label="Keyingi rasm"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <section className="px-6 py-20 md:py-28">
      <Section className="mx-auto max-w-6xl">
        <h2 className="mb-14 text-center text-3xl font-black md:text-5xl">
          <span className="text-gradient-gold">Loyiha</span> ko'rinishi
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {previewImages.map((src, index) => renderImageCard(src, index))}
        </div>

        {extraImages.length > 0 && !showAllImages ? (
          <div className="mt-6 text-center">{toggleButton}</div>
        ) : null}

        {showAllImages ? (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {extraImages.map((src, index) => renderImageCard(src, previewImages.length + index))}
            </div>

            <div className="mt-6 text-center">{toggleButton}</div>
          </div>
        ) : null}

        {imageViewerModal}
      </Section>
    </section>
  );
}
