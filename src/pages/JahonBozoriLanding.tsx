import { useEffect } from "react";
import heroImage from "@/assets/jahon-bozori-hero.png";
import {
  MapPin, Globe, Truck, Users, XCircle, ArrowDown,
  Timer, Car, Trophy, ChevronDown,
} from "lucide-react";
import { Section } from "@/components/jahon-bozori/ScrollReveal";
import LeadForm from "@/components/jahon-bozori/LeadForm";
import ExitIntentModal from "@/components/jahon-bozori/ExitIntentModal";
import GallerySection from "@/components/jahon-bozori/GallerySection";
import ReelsSection from "@/components/jahon-bozori/ReelsSection";
import ContactSection from "@/components/jahon-bozori/ContactSection";
import VideoSection from "@/components/jahon-bozori/VideoSection";

function scrollToForm() {
  const el = document.getElementById("lead-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function BandQilishButton({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  return (
    <button
      onClick={scrollToForm}
      className={`bg-gradient-gold font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${
        size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } text-primary-foreground ${className}`}
    >
      <MapPin className="w-5 h-5" />
      Joy band qilish
    </button>
  );
}

export default function JahonBozoriLanding() {
  useEffect(() => {
    const checkScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent >= 50 && !(window as any).__tracked50) {
        (window as any).__tracked50 = true;
      }
      if (scrollPercent >= 90 && !(window as any).__tracked90) {
        (window as any).__tracked90 = true;
      }
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ExitIntentModal />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Jahon Bozori masterplan ko'rinishi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight animate-fade-in-up">
            <span className="text-gradient-gold">Vodiyda yagona</span>
            <br />
            <span className="text-foreground">33 gektarlik</span>
            <br />
            <span className="text-gradient-gold">xalqaro bozor</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Bu oddiy bozor emas — bu <span className="text-foreground font-semibold">savdo oqimi markazi</span>
          </p>
          <div className="mt-10 animate-fade-in-up animate-delay-400">
            <BandQilishButton />
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

      <VideoSection />

      {/* MUAMMO */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-10">
            Hozir savdoda eng katta <span className="text-gradient-gold">muammo</span> nima?
          </h2>
          <div className="space-y-4 mb-10">
            {["Mijoz yo'q", "Oqim yo'q", "Joy noto'g'ri"].map((item, i) => (
              <div key={i} className="glass-card rounded-xl px-6 py-4 text-lg md:text-xl font-semibold text-foreground flex items-center gap-4">
                <XCircle className="w-6 h-6 text-destructive shrink-0" />
                {item}
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
            <span className="text-gradient-gold">Jahon Bozori</span> kuchi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: MapPin, title: "33 gektar hudud", desc: "Markaziy Osiyodagi eng yirik loyihalardan biri" },
              { icon: Globe, title: "Xalqaro savdo markazi", desc: "Import-eksport uchun strategik joy" },
              { icon: Truck, title: "Kuchli logistika", desc: "Yetkazib berish tizimi ichiga qurilgan" },
              { icon: Users, title: "Doimiy mijoz oqimi", desc: "Kunlik minglab xaridorlar oqimi" },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <BandQilishButton size="sm" />
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
      <GallerySection />

      {/* DAMAS OFFER */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Car className="w-14 h-14 md:w-20 md:h-20 text-primary" />
            <Trophy className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          </div>
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
            Eng yaxshi joylar birinchi bo'lib band qilinadi
          </p>
          <div className="mt-8 glass-card rounded-2xl p-6 inline-flex items-center gap-3">
            <Timer className="w-8 h-8 text-primary" />
            <p className="text-2xl md:text-3xl font-black text-gradient-gold">Joylar cheklangan</p>
          </div>
        </Section>
      </section>

      {/* REELS */}
      <ReelsSection />

      {/* CONTACT */}
      <ContactSection />

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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:bottom-8">
        <BandQilishButton size="sm" className="shadow-2xl" />
      </div>

      <div className="h-24" />
    </div>
  );
}
