import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Section } from "./ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import galleryCoveredWalkway from "@/assets/gallery-covered-walkway.jpg";
import galleryWaterfrontBoulevard from "@/assets/gallery-waterfront-boulevard.jpg";
import galleryMainGate from "@/assets/gallery-main-gate.jpg";
import galleryTradeCourtyard from "@/assets/gallery-trade-courtyard.jpg";
import galleryMarketHall1 from "@/assets/gallery-market-hall-1.jpg";
import galleryMarketHall2 from "@/assets/gallery-market-hall-2.jpg";
import galleryMarketHall3 from "@/assets/gallery-market-hall-3.jpg";
import galleryMarketHall4 from "@/assets/gallery-market-hall-4.jpg";

const images = [
  gallery1,
  galleryCoveredWalkway,
  galleryWaterfrontBoulevard,
  galleryMainGate,
  galleryTradeCourtyard,
  galleryMarketHall1,
  galleryMarketHall2,
  galleryMarketHall3,
  galleryMarketHall4,
];

export default function GallerySection() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const previewImages = images.slice(0, 6);
  const extraImages = images.slice(6);
  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;
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

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  const renderImageCard = (src: string, index: number) => (
    <button
      key={index}
      type="button"
      onClick={() => setSelectedImageIndex(index)}
      className="aspect-[4/3] rounded-2xl overflow-hidden glass-card text-left"
      aria-label={`Jahon Bozori ko'rinishi ${index + 1} rasmini kattalashtirish`}
    >
      <img
        src={src}
        alt={`Jahon Bozori ko'rinishi ${index + 1}`}
        className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
        loading="lazy"
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

        {selectedImage && (
          <div
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md px-4 py-6 md:px-8 md:py-10"
            onClick={() => setSelectedImageIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Jahon Bozori ko'rinishi ${selectedImageIndex + 1}`}
          >
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
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
                <img
                  src={selectedImage}
                  alt={`Jahon Bozori ko'rinishi ${selectedImageIndex + 1}`}
                  className="max-h-[85vh] w-full rounded-[1.75rem] object-contain shadow-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </Section>
    </section>
  );
}
