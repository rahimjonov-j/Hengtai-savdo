import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
      document.body.style.overflow = previousOverflow;
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
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm px-3 py-4 md:px-6 md:py-6"
            onClick={closeImageViewer}
            role="dialog"
            aria-modal="true"
            aria-label={`Jahon Bozori ko'rinishi ${activeImageIndex + 1}`}
          >
            <div className="mx-auto flex h-full max-w-[1500px] flex-col" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 px-3 py-3 text-white backdrop-blur-sm md:px-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                  <p className="hidden text-sm text-white/70 md:block">
                    `Esc` yoki tashqariga bosib yopishingiz mumkin
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeImageViewer}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                  aria-label="Rasmni yopish"
                >
                  <X className="h-4 w-4" />
                  Yopish
                </button>
              </div>

              <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 px-2 py-2 md:px-4 md:py-4">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] transition-opacity duration-300 ${loadedImages[activeImageIndex] ? "opacity-0" : "animate-pulse opacity-100"}`}
                />
                <img
                  src={images[activeImageIndex]}
                  alt={`Jahon Bozori ko'rinishi ${activeImageIndex + 1}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onLoad={() => markImageLoaded(activeImageIndex)}
                  className={`relative z-10 max-h-full max-w-full object-contain transition-opacity duration-300 ${loadedImages[activeImageIndex] ? "opacity-100" : "opacity-0"}`}
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

              <div className="mt-3 overflow-x-auto pb-1">
                <div className="flex min-w-max items-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`overflow-hidden rounded-xl border transition-all ${
                        index === activeImageIndex
                          ? "border-primary shadow-[0_0_0_1px_rgba(214,158,0,0.45)]"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`${index + 1}-rasmga o'tish`}
                    >
                      <img
                        src={images[index]}
                        alt={`Jahon Bozori preview ${index + 1}`}
                        className="h-14 w-20 object-cover md:h-16 md:w-24"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
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
