import { lazy, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import heroImage from "@/assets/jahon-bozori-hero.webp";
import prizeImage from "@/assets/prize-cutout.webp";
import galleryRenderMasterplanOverview from "@/assets/gallery-render-masterplan-overview.webp";
import gallery2 from "@/assets/gallery-2.webp";
import galleryMainGate from "@/assets/gallery-main-gate.webp";
import logisticImage from "@/assets/logistic.webp";
import omborImage from "@/assets/ombor.webp";
import galleryTradeCourtyard from "@/assets/gallery-trade-courtyard.webp";
import {
  type LucideIcon,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MapPin,
  MapPinOff,
  Timer,
  UserX,
  X,
  ChartNoAxesColumnDecreasing,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeferredSection from "@/components/DeferredSection";
import { Section } from "@/components/jahon-bozori/ScrollReveal";

const GallerySection = lazy(() => import("@/components/jahon-bozori/GallerySection"));
const ReelsSection = lazy(() => import("@/components/jahon-bozori/ReelsSection"));
const ContactSection = lazy(() => import("@/components/jahon-bozori/ContactSection"));
const VideoSection = lazy(() => import("@/components/jahon-bozori/VideoSection"));

type StrengthCard =
  | {
      title: string;
      desc: string;
      image: string;
      alt: string;
      icon?: never;
    }
  | {
      title: string;
      desc: string;
      icon: LucideIcon;
      image?: never;
      alt?: never;
    };

const strengthCards: StrengthCard[] = [
  {
    image: galleryRenderMasterplanOverview,
    alt: "33.3 gektar hudud masterplan ko'rinishi",
    title: "33.3 gektar hudud",
    desc: "Markaziy Osiyodagi eng yirik loyihalardan biri.",
  },
  {
    image: gallery2,
    alt: "Xalqaro savdo markazi ko'rinishi",
    title: "Xalqaro savdo markazi",
    desc: "Qimmatli investitsiya maydoni va mintaqaviy savdo taraqqiyotining kuchli markazi.",
  },
  {
    image: logisticImage,
    alt: "Kuchli logistika tarmog'i",
    title: "Kuchli logistika",
    desc: "Yetakchi logistika kompaniyalari bilan strategik hamkorlikdagi eng maqbul marshrutlar.",
  },
  {
    image: galleryMainGate,
    alt: "Doimiy mijoz oqimi",
    title: "Doimiy mijoz oqimi",
    desc: "Kunlik minglab xaridorlar oqimi savdo nuqtalaringizni doimiy harakatda ushlab turadi.",
  },
  {
    image: omborImage,
    alt: "Aqlli ombor",
    title: "Aqlli ombor",
    desc: "Doimiy haroratli ombor, yuqori standartli saqlash va bojxona ombori imkoniyatlari.",
  },
  {
    image: galleryTradeCourtyard,
    alt: "Barcha faoliyat turi uchun mos",
    title: "Barcha faoliyat turi uchun mos",
    desc: "Yengil sanoat, qurilish materiallari, maishiy texnika, to'qimachilik, oziq-ovqat va boshqa tarmoqlar uchun mos maydonlar.",
  },
];

const problemItems = [
  { icon: UserX, label: "Mijoz yo'q" },
  { icon: ChartNoAxesColumnDecreasing, label: "Oqim yo'q" },
  { icon: MapPinOff, label: "Joy noto'g'ri" },
];

function BandQilishButton({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  return (
    <Link
      to="/joy-band-qilish"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${
        size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } ${className}`}
    >
      <MapPin className="h-5 w-5" />
      Joy band qilish
    </Link>
  );
}

function FactsLink({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/faktlar"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-105 hover:gap-3 active:scale-95 animate-pulse-glow ${className}`}
    >
      Faktlar sahifasiga o'tish
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

function SectionPlaceholder({
  className = "",
  heightClass = "h-72 md:h-80",
}: {
  className?: string;
  heightClass?: string;
}) {
  return (
    <section className={`px-6 py-20 md:py-28 ${className}`} aria-hidden="true">
      <div
        className={`mx-auto w-full max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.03] animate-pulse ${heightClass}`}
      />
    </section>
  );
}

type TrackingWindow = Window & {
  __tracked50?: boolean;
  __tracked90?: boolean;
};

export default function JahonBozoriLanding() {
  const [activeStrengthCardIndex, setActiveStrengthCardIndex] = useState<number | null>(null);
  const strengthCardSwipeStartXRef = useRef<number | null>(null);
  const activeStrengthCard = activeStrengthCardIndex !== null ? strengthCards[activeStrengthCardIndex] : null;

  const closeStrengthCard = () => {
    setActiveStrengthCardIndex(null);
  };

  useEffect(() => {
    const trackingWindow = window as TrackingWindow;

    const checkScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent >= 50 && !trackingWindow.__tracked50) {
        trackingWindow.__tracked50 = true;
      }
      if (scrollPercent >= 90 && !trackingWindow.__tracked90) {
        trackingWindow.__tracked90 = true;
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (activeStrengthCardIndex === null) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeStrengthCard();
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeStrengthCardIndex]);

  const strengthCardModal =
    activeStrengthCard && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[70] bg-black/88 backdrop-blur-md animate-in fade-in-0 duration-300"
            onClick={closeStrengthCard}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="flex h-full w-full flex-col overflow-hidden bg-background/96"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-4 backdrop-blur-sm md:px-6">
                <button
                  type="button"
                  onClick={closeStrengthCard}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Orqaga
                </button>
                <button
                  type="button"
                  aria-label="Yopish"
                  onClick={closeStrengthCard}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className="flex min-h-0 flex-1 items-stretch justify-center overflow-hidden px-0 py-0 md:px-2 md:py-2"
                onTouchStart={(event) => {
                  strengthCardSwipeStartXRef.current = event.changedTouches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  const swipeStartX = strengthCardSwipeStartXRef.current;
                  const swipeEndX = event.changedTouches[0]?.clientX ?? null;

                  if (swipeStartX !== null && swipeEndX !== null && Math.abs(swipeEndX - swipeStartX) >= 80) {
                    closeStrengthCard();
                  }

                  strengthCardSwipeStartXRef.current = null;
                }}
              >
                <div className="flex min-h-full w-full flex-col border-y border-white/10 bg-card/90 shadow-[0_30px_120px_rgba(0,0,0,0.55)] md:my-4 md:min-h-0 md:max-w-[96vw] md:rounded-[2rem] md:border md:p-3">
                  {activeStrengthCard.image ? (
                    <div className="relative overflow-hidden bg-black/60 md:rounded-[1.6rem] md:border md:border-white/10">
                      <img
                        src={activeStrengthCard.image}
                        alt={activeStrengthCard.alt}
                        className="h-[52vh] w-full object-cover brightness-[0.92] contrast-110 saturate-[0.98] md:h-[70vh] md:object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,74,0.18),transparent_42%)]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/45" />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center rounded-[1.6rem] border border-white/10 bg-black/40">
                      <activeStrengthCard.icon className="h-16 w-16 text-primary" />
                    </div>
                  )}

                  <div className="flex-1 px-5 pb-8 pt-6 md:px-6 md:pb-6">
                    <h3 className="text-3xl font-black text-foreground md:text-4xl">{activeStrengthCard.title}</h3>
                    <p className="mt-3 max-w-4xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                      {activeStrengthCard.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Jahon Bozori masterplan ko'rinishi"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,74,0.08),transparent_38%),linear-gradient(90deg,rgba(0,0,0,0.28),transparent_22%,transparent_78%,rgba(0,0,0,0.28))]" />
        </div>

        <div className="absolute left-1/2 top-6 z-20 w-full max-w-6xl -translate-x-1/2 px-6 sm:top-8 sm:px-8 lg:px-10">
          <div className="flex justify-center animate-fade-in-up">
            <div className="inline-flex max-w-full items-center justify-center gap-3 rounded-[1.75rem] border border-primary/30 bg-background/35 px-5 py-4 text-sm font-semibold text-foreground shadow-lg backdrop-blur-md md:px-6 md:py-4 md:text-base">
              <span className="text-gradient-gold">FARG'ONA VA MARG'ILON SHAHAR MARKAZIDA</span>
              <MapPin className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 pb-24 pt-28 text-center sm:px-8 md:pt-32 lg:px-10 lg:pb-28">
          <div className="w-full max-w-5xl">
            <div className="mx-auto w-full max-w-[56rem]">
              <h1 className="animate-fade-in-up pb-3 text-[clamp(2.3rem,10vw,5.5rem)] font-black leading-[1.08] tracking-[-0.04em] sm:text-[clamp(3rem,6vw,5.5rem)]">
                <span className="block whitespace-nowrap text-gradient-gold">Vodiyda yagona</span>
                <span className="block text-foreground">33.3 gektarlik</span>
                <span className="block text-gradient-gold">xalqaro bozor</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up animate-delay-200 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-[1.05rem]">
                O&apos;rta Osiyo va Yevroosiyo bozorlariga ochilgan asosiy eshik.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      <DeferredSection
        rootMargin="420px 0px"
        fallback={<SectionPlaceholder className="bg-card/50" heightClass="h-[22rem] md:h-[28rem]" />}
      >
        <VideoSection />
      </DeferredSection>

      <section className="px-6 py-20 md:py-28">
        <Section className="mx-auto max-w-3xl text-center">
          <h2 className="mb-10 text-3xl font-black text-foreground md:text-5xl">
            Hozir savdoda eng katta <span className="text-gradient-gold">muammo</span> nima?
          </h2>
          <div className="mb-10 space-y-4">
            {problemItems.map((item, index) => (
              <div
                key={index}
                className="glass-card flex items-center gap-4 rounded-xl px-6 py-4 text-lg font-semibold text-foreground md:text-xl"
              >
                <item.icon className="h-6 w-6 shrink-0 text-destructive" />
                {item.label}
              </div>
            ))}
          </div>
          <div className="text-xl font-bold text-gradient-gold md:text-2xl">
            Bu loyiha aynan shu muammoni hal qiladi
          </div>
        </Section>
      </section>

      <section className="bg-card/50 px-6 py-20 md:py-28">
        <Section className="mx-auto max-w-4xl">
          <h2 className="mb-14 text-center text-3xl font-black md:text-5xl">
            <span className="text-gradient-gold">Jahon Bozorining</span> Eng{" "}
            <span className="text-gradient-gold">Katta Kuchi</span> Nimada?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {strengthCards.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveStrengthCardIndex(index)}
                className={`glass-card group w-full rounded-2xl text-left transition-all duration-300 hover:scale-[1.01] hover:border-primary/30 ${
                  item.image ? "overflow-hidden p-4 md:p-5" : "p-6 md:p-8"
                }`}
              >
                {item.image ? (
                  <div className="relative mb-5 overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="aspect-[16/10] w-full scale-[1.04] object-cover brightness-[0.74] contrast-125 saturate-[0.95] transition-transform duration-700 group-hover:scale-[1.08]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,74,0.14),transparent_42%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/18 to-black/52" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/62 to-transparent" />
                  </div>
                ) : (
                  <item.icon className="mb-4 h-10 w-10 text-primary" />
                )}
                <h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </button>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FactsLink className="text-lg md:text-xl" />
          </div>
        </Section>
      </section>

      <section className="px-6 py-20 md:py-28">
        <Section className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
            Bu yerda siz joy olmaysiz...
          </h2>
          <p className="mt-6 text-2xl font-black text-gradient-gold md:text-4xl">
            Siz savdo qiladigan tizimga kirasiz
          </p>
          <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-gradient-gold" />
        </Section>
      </section>

      <DeferredSection rootMargin="520px 0px" fallback={<SectionPlaceholder heightClass="h-[28rem] md:h-[34rem]" />}>
        <GallerySection />
      </DeferredSection>

      <section className="bg-card/50 px-6 py-20 md:py-28">
        <Section className="mx-auto max-w-3xl text-center">
          <img
            src={prizeImage}
            alt="5 ta Damas sovg'asi"
            className="mx-auto mb-2 block h-auto w-full max-w-[36rem] md:mb-3 md:max-w-[42rem]"
            loading="lazy"
            decoding="async"
          />
          <h2 className="mb-4 text-3xl font-black text-foreground md:text-5xl">
            <span className="text-gradient-gold">5 ta Damas</span>dan bittasini yutib oling
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            Joy band qilgan xaridorlar Damas yutib olish imkoniyatiga ega bo'ladi.
          </p>
        </Section>
      </section>

      <section className="px-6 py-20 md:py-28">
        <Section className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-black text-foreground md:text-5xl">
            Bunday imkoniyatlar <span className="text-gradient-gold">har kuni chiqmaydi</span>
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            Cheklangan joylar mavjud. Eksklyuziv joylashish dasturidan bahramand bo'ling.
          </p>
          <div className="glass-card mt-8 inline-flex items-center gap-3 rounded-2xl p-6">
            <Timer className="h-8 w-8 text-primary" />
            <p className="text-2xl font-black text-gradient-gold md:text-3xl">Joylar cheklangan</p>
          </div>
        </Section>
      </section>

      <DeferredSection
        rootMargin="620px 0px"
        fallback={<SectionPlaceholder className="bg-card/50" heightClass="h-[34rem] md:h-[42rem]" />}
      >
        <ReelsSection />
      </DeferredSection>

      <DeferredSection rootMargin="420px 0px" fallback={<SectionPlaceholder heightClass="h-64 md:h-72" />}>
        <ContactSection />
      </DeferredSection>

      <footer className="border-t border-white/10 bg-card/30 px-6 py-4 md:py-5">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground md:text-base">
            &copy; 2026 Jahon Bozori. Designed and developed by{" "}
            <a
              href="https://www.zamon-agency.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              Zamon Agency
            </a>
            .
          </p>
        </div>
      </footer>

      {strengthCardModal}

      <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <BandQilishButton
          size="sm"
          className="w-full rounded-none px-6 py-4 text-base shadow-[0_-18px_40px_rgba(0,0,0,0.28)] animate-none"
        />
      </div>

      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <BandQilishButton
          size="sm"
          className="rounded-full px-7 py-4 text-base shadow-[0_18px_40px_rgba(0,0,0,0.32)] animate-none"
        />
      </div>

      <div className="h-16 md:hidden" />
    </div>
  );
}
