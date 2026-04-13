import { useRef } from "react";
import heroImage from "@/assets/jahon-bozori-hero.webp";
import LeadForm from "@/components/jahon-bozori/LeadForm";
import { Section } from "@/components/jahon-bozori/ScrollReveal";
import { ChevronLeft, Clock3, MapPin, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PHONES = ["+998 88 219 66 66", "+998 88 692 33 33"];

export default function JoyBandQilishPage() {
  const navigate = useNavigate();
  const swipeStartXRef = useRef<number | null>(null);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      onTouchStart={(event) => {
        swipeStartXRef.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const swipeStartX = swipeStartXRef.current;
        const swipeEndX = event.changedTouches[0]?.clientX ?? null;

        if (swipeStartX !== null && swipeEndX !== null && swipeEndX - swipeStartX >= 90) {
          navigate("/");
        }

        swipeStartXRef.current = null;
      }}
    >
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/82 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,74,0.12),transparent_38%)]" />
        </div>

        <div className="relative z-10 px-6 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              Orqaga
            </Link>
          </div>
        </div>

        <div className="relative z-10 px-6 pb-16 pt-6 md:px-8 md:pb-24 md:pt-10 lg:px-10">
          <Section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <div className="glass-card rounded-[2rem] border border-white/10 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-7">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-foreground md:text-3xl">
                    <span className="text-gradient-gold">Hoziroq</span> ma&apos;lumot qoldiring
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    So&apos;rov yuborilgach, arizangiz tizimga tushadi va siz bilan tez orada bog&apos;lanamiz.
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>

            <div className="max-w-2xl pt-1 md:pt-4">
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="glass-card rounded-2xl p-5">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-medium text-muted-foreground">Bog&apos;lanish raqamlari</p>
                  <div className="mt-2 space-y-1">
                    {PHONES.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block text-base font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-medium text-muted-foreground">Ish vaqti</p>
                  <p className="mt-2 text-base font-semibold text-foreground">Har kuni 08:00 dan 18:00 gacha</p>
                  <p className="mt-1 text-sm text-muted-foreground">Menejerlar tezkor javob beradi.</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}
