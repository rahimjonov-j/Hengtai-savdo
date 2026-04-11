import { lazy, Suspense, useEffect, useState } from "react";
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
  MapPin, ArrowDown, UserX, ChartNoAxesColumnDecreasing, MapPinOff,
  Timer, ChevronDown, Send, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeferredSection from "@/components/DeferredSection";
import { Section } from "@/components/jahon-bozori/ScrollReveal";
import LeadForm from "@/components/jahon-bozori/LeadForm";

const ExitIntentModal = lazy(() => import("@/components/jahon-bozori/ExitIntentModal"));
const GallerySection = lazy(() => import("@/components/jahon-bozori/GallerySection"));
const ReelsSection = lazy(() => import("@/components/jahon-bozori/ReelsSection"));
const ContactSection = lazy(() => import("@/components/jahon-bozori/ContactSection"));
const VideoSection = lazy(() => import("@/components/jahon-bozori/VideoSection"));

function scrollToForm() {
  const el = document.getElementById("lead-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const TELEGRAM_URL = "https://t.me/jahonbozorivodiy";

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
    alt: "33 gektar hudud masterplan ko'rinishi",
    title: "33 gektar hudud",
    desc: "Markaziy Osiyodagi eng yirik loyihalardan biri",
  },
  {
    image: gallery2,
    alt: "Xalqaro savdo markazi ko'rinishi",
    title: "Xalqaro savdo markazi",
    desc: "Qimmatli Investitsiya Maydoni: O‘rta Osiyo savdo taraqqiyotining markaziy tugunini egallang, mintaqaviy o‘sish dividendlaridan bahramand bo‘ling.",
  },
  {
    image: logisticImage,
    alt: "Kuchli logistika tarmog'i",
    title: "Kuchli logistika",
    desc: "Hamkorlikdagi Logistika Tarmog‘i: Yetakchi logistika kompaniyalari bilan strategik hamkorlikda eng maqbul marshrutlarni taqdim etamiz.",
  },
  {
    image: galleryMainGate,
    alt: "Doimiy mijoz oqimi",
    title: "Doimiy mijoz oqimi",
    desc: "Kunlik minglab xaridorlar oqimi",
  },
  {
    image: omborImage,
    alt: "Aqlli ombor",
    title: "Aqlli ombor",
    desc: "Yuqori Standartli Saqlash: Doimiy Haroratli Ombor, Yuqori Standartli Ombor, Bojxona Ombori kabi ko‘p funksiyali konfiguratsiyalar.",
  },
  {
    image: galleryTradeCourtyard,
    alt: "Barcha faoliyat turi uchun mos",
    title: "Barcha faoliyat turi uchun mos",
    desc: "Har qanday faoliyat turi: Yengil sanoat, qurilish materiallari, maishiy texnika, to‘qimachilik, oziq-ovqat va boshqa tarmoqlar uchun ajratilgan maydonlar.",
  },
];

const problemItems = [
  { icon: UserX, label: "Mijoz yo'q" },
  { icon: ChartNoAxesColumnDecreasing, label: "Oqim yo'q" },
  { icon: MapPinOff, label: "Joy noto'g'ri" },
];

function BandQilishButton({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  return (
    <button
      onClick={scrollToForm}
      className={`bg-gradient-gold font-bold rounded-full inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${
        size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } text-primary-foreground ${className}`}
    >
      <MapPin className="w-5 h-5" />
      Joy band qilish
    </button>
  );
}

function TelegramButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer"
      className={`bg-gradient-gold font-bold rounded-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg text-primary-foreground transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${className}`}
    >
      <Send className="w-5 h-5" />
      Telegramga o'tish
    </a>
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
  const [shouldMountExitIntentModal, setShouldMountExitIntentModal] = useState(false);

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
    const enableModal = () => setShouldMountExitIntentModal(true);

    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(enableModal, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = window.setTimeout(enableModal, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {shouldMountExitIntentModal ? (
        <Suspense fallback={null}>
          <ExitIntentModal />
        </Suspense>
      ) : null}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Jahon Bozori masterplan ko'rinishi"
            className="w-full h-full object-cover"
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
              <span className="leading-snug text-center text-gradient-gold">
                FARG'ONA VA MARG'ILON SHAHAR MARKAZIDA
              </span>
              <MapPin className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 pb-24 pt-28 text-center sm:px-8 md:pt-32 lg:px-10 lg:pb-28">
          <div className="w-full max-w-5xl">
            <div className="mx-auto w-full max-w-[56rem]">
              <h1 className="animate-fade-in-up text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.94] tracking-[-0.04em]">
                <span className="block text-gradient-gold">Vodiyda yagona</span>
                <span className="block text-foreground">33 gektarlik</span>
                <span className="block text-gradient-gold">xalqaro bozor</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up animate-delay-200 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-[1.05rem]">
                O&apos;rta Osiyo va Yevroosiyo bozorlariga ochilgan asosiy eshik.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-in-up animate-delay-400 sm:flex-row">
                <BandQilishButton className="min-w-[17rem]" />
                <TelegramButton className="min-w-[17rem]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* LEAD FORM — early position */}
      <section id="lead-form" className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center text-foreground mb-4">
            <span className="text-gradient-gold">Joy band qiling</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Ismingiz va raqamingizni qoldiring — biz siz bilan bog'lanamiz
          </p>
          <LeadForm />
        </Section>
      </section>

      <DeferredSection
        rootMargin="420px 0px"
        fallback={<SectionPlaceholder className="bg-card/50" heightClass="h-[22rem] md:h-[28rem]" />}
      >
        <VideoSection />
      </DeferredSection>

      {/* MUAMMO */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-10">
            Hozir savdoda eng katta <span className="text-gradient-gold">muammo</span> nima?
          </h2>
          <div className="space-y-4 mb-10">
            {problemItems.map((item, i) => (
              <div key={i} className="glass-card rounded-xl px-6 py-4 text-lg md:text-xl font-semibold text-foreground flex items-center gap-4">
                <item.icon className="w-6 h-6 text-destructive shrink-0" />
                {item.label}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-gradient-gold">
            Bu loyiha aynan shu muammoni hal qiladi
            <ArrowDown className="w-6 h-6 text-primary" />
          </div>
        </Section>
      </section>

      {/* LOYIHA KUCHI */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
            <span className="text-gradient-gold">Jahon Bozorining</span> Eng <span className="text-gradient-gold">Katta Kuchi</span> Nimada?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengthCards.map((item, i) => (
              <div
                key={i}
                className={`glass-card group rounded-2xl transition-colors hover:border-primary/30 ${
                  item.image ? "overflow-hidden p-4 md:p-5" : "p-6 md:p-8"
                }`}
              >
                {item.image ? (
                  <div className="relative mb-5 overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="aspect-[16/10] w-full object-cover blur-[0.35px] brightness-[0.74] contrast-120 saturate-[0.95] scale-[1.04] transition-transform duration-700 group-hover:scale-[1.08]"
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
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <FactsLink className="text-lg md:text-xl" />
          </div>
        </Section>
      </section>

      {/* VALUE */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
            Bu yerda siz joy olmaysiz…
          </h2>
          <p className="mt-6 text-2xl md:text-4xl font-black text-gradient-gold">
            Siz savdo qiladigan tizimga kirasiz
          </p>
          <div className="mt-10 w-24 h-1 bg-gradient-gold mx-auto rounded-full" />
        </Section>
      </section>

      {/* GALLERY */}
      <DeferredSection rootMargin="520px 0px" fallback={<SectionPlaceholder heightClass="h-[28rem] md:h-[34rem]" />}>
        <GallerySection />
      </DeferredSection>

      {/* DAMAS OFFER */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-3xl mx-auto text-center">
          <img
            src={prizeImage}
            alt="5 ta Damas sovg'asi"
            className="mx-auto mb-2 block h-auto w-full max-w-[36rem] md:mb-3 md:max-w-[42rem]"
            loading="lazy"
            decoding="async"
          />
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            <span className="text-gradient-gold">5 ta Damas</span>dan bittasini yutib oling
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Joy band qiling va Damas yutib olish imkoniyatiga ega bo'ling
          </p>
          <div className="mt-10">
            <BandQilishButton size="sm" />
          </div>
        </Section>
      </section>

      {/* FOMO */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            Bunday imkoniyatlar <span className="text-gradient-gold">har kuni chiqmaydi</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Cheklangan joylar mavjud.Eksklyuziv Joylashish Dasturidan Bahramand Bo&apos;ling.
          </p>
          <div className="mt-8 glass-card rounded-2xl p-6 inline-flex items-center gap-3">
            <Timer className="w-8 h-8 text-primary" />
            <p className="text-2xl md:text-3xl font-black text-gradient-gold">Joylar cheklangan</p>
          </div>
        </Section>
      </section>

      {/* REELS */}
      <DeferredSection
        rootMargin="620px 0px"
        fallback={<SectionPlaceholder className="bg-card/50" heightClass="h-[34rem] md:h-[42rem]" />}
      >
        <ReelsSection />
      </DeferredSection>

      {/* CONTACT */}
      <DeferredSection rootMargin="420px 0px" fallback={<SectionPlaceholder heightClass="h-64 md:h-72" />}>
        <ContactSection />
      </DeferredSection>

      {/* CTA — bottom form repeat */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center text-foreground mb-4">
            <span className="text-gradient-gold">Hoziroq joy band qiling</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Chegirmali narxlardan foydalaning
          </p>
          <LeadForm />
        </Section>
      </section>

      {/* STICKY CTA */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <BandQilishButton size="sm" className="shadow-2xl" />
      </div>

      <div className="h-24" />
    </div>
  );
}
