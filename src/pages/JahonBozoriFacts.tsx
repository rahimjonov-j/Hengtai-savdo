import heroImage from "@/assets/jahon-bozori-hero.webp";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Bus,
  Globe2,
  type LucideIcon,
  MapPinned,
  PackageCheck,
  Route,
  Sparkles,
  TrainTrack,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "@/components/jahon-bozori/ScrollReveal";

type FactItem = {
  id: string;
  title: string;
  headline: string;
  points: string[];
  impact: string;
  icon: LucideIcon;
  spanClass?: string;
};

const stats = [
  {
    value: "2 ta katta oqim",
    label: "Farg'ona shahri va Yangi Marg'ilon oralig'idagi strategik nuqta",
  },
  {
    value: "4500+ do'kon",
    label: "Katta masshtab savdo oqimini o'ziga tortadigan asosiy omillardan biri",
  },
  {
    value: "Majburiy trafik",
    label: "Transport va asosiy yo'l oqimi bozor ichiga kirib keladigan model",
  },
];

const facts: FactItem[] = [
  {
    id: "1-fakt",
    title: "Strategik joylashuv",
    headline: "Bozor Farg'ona shahri va Yangi Marg'ilon massivi o'rtasida joylashgan.",
    points: [
      "Bu degani loyiha bir vaqtning o'zida 2 ta katta oqim markazida turibdi.",
      "Shahar ichidagi va tashqi xaridor oqimi bitta savdo nuqtasiga kesishadi.",
    ],
    impact: "Joylashuvning o'zi savdo uchun kuchli start beradi.",
    icon: MapPinned,
    spanClass: "xl:col-span-7",
  },
  {
    id: "2-fakt",
    title: "Asosiy yo'lda",
    headline: "Jahon Bozori Farg'ona darvozasi oldida, Qo'qon, Namangan va Toshkent yo'nalishidagi asosiy yo'l ustida joylashgan.",
    points: [
      "Rishton, Oltiariq, Bag'dod va boshqa hududlardan keladiganlar aynan shu yo'ldan o'tadi.",
      "Bu yo'l kundalik ko'rinish va tabiiy xaridor oqimini beradi.",
    ],
    impact: "Yo'l ustidagi savdo nuqtasi odamning ko'ziga har kuni tushadi.",
    icon: Route,
    spanClass: "xl:col-span-5",
  },
  {
    id: "3-fakt",
    title: "Doimiy transport oqimi",
    headline: "Avtobuslar aynan shu yo'ldan yuradi va oxirgi bekat Jahon Bozori ichida bo'ladi.",
    points: [
      "Bu shunchaki o'tib ketadigan emas, to'xtaydigan trafik degani.",
      "Transport oqimi xaridorni bozor hududining o'ziga olib kiradi.",
    ],
    impact: "Bu yerda trafik reklama bilan emas, marshrutning o'zi bilan yaratiladi.",
    icon: Bus,
    spanClass: "xl:col-span-5",
  },
  {
    id: "4-fakt",
    title: "Temir yo'l logistikasi",
    headline: "Temir yo'l liniyasi yaqin va bozor yonidan o'tishi rejalashtirilgan.",
    points: [
      "Bu yuk tashish xarajatini kamaytirish imkonini oshiradi.",
      "Tez va qulay yetkazib berish savdo aylanishini kuchaytiradi.",
    ],
    impact: "Logistika kuchaysa, savdo hajmi va tezligi ham oshadi.",
    icon: TrainTrack,
    spanClass: "xl:col-span-7",
  },
  {
    id: "5-fakt",
    title: "Xalqaro logistika markazi",
    headline: "Bozor ichida logistika tizimi bo'ladi va export, import shu yerning o'zida ishlaydi.",
    points: [
      "Xitoy, Markaziy Osiyo va Yevropa bilan bog'lanadigan savdo zanjiri rejalashtirilgan.",
      "Savdo nuqtasi va ta'minot tizimi bir joyga yig'iladi.",
    ],
    impact: "Mahalliy savdo xalqaro oqimga ulanadigan nuqtaga aylanadi.",
    icon: Globe2,
    spanClass: "xl:col-span-6",
  },
  {
    id: "6-fakt",
    title: "Katta masshtab, katta oqim",
    headline: "33 gektar hudud va 4500+ do'kon bu loyihani oddiy bozordan ancha katta formatga olib chiqadi.",
    points: [
      "Bu Vodiyning asosiy savdo markaziga aylanish ehtimolini sezilarli oshiradi.",
      "Katta masshtab ko'proq kategoriya, ko'proq xaridor va ko'proq aylanish degani.",
    ],
    impact: "Katta loyiha katta oqimni o'ziga tortadi.",
    icon: Building2,
    spanClass: "xl:col-span-6",
  },
  {
    id: "7-fakt",
    title: "Infratuzilma tayyor",
    headline: "Sovutkichli omborlar, logistika zonasi va qulay avtoturargohlar katta savdo uchun zarur tayanchni yaratadi.",
    points: [
      "Bu ayniqsa hajm bilan ishlaydigan tadbirkorlar uchun katta qulaylik beradi.",
      "Ombor, logistika va parking bir joyda bo'lsa, biznes tezroq va barqarorroq ishlaydi.",
    ],
    impact: "Bu katta savdo qiluvchilar uchun ideal joy.",
    icon: PackageCheck,
    spanClass: "xl:col-span-12",
  },
];

function FactCard({ fact }: { fact: FactItem }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_36px_110px_rgba(0,0,0,0.42)] md:p-7 ${fact.spanClass ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,74,0.16),transparent_33%),radial-gradient(circle_at_bottom_left,rgba(255,199,74,0.08),transparent_28%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_30px_rgba(214,158,0,0.12)]">
            <fact.icon className="h-7 w-7" />
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {fact.id}
          </div>
        </div>

        <h2 className="mt-8 max-w-xl text-2xl font-black leading-tight text-foreground md:text-[2rem]">
          {fact.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-[1.05rem]">
          {fact.headline}
        </p>

        <div className="mt-6 space-y-3">
          {fact.points.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <p className="text-sm leading-6 text-foreground/85 md:text-[0.98rem]">{point}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-[1.4rem] border border-primary/15 bg-black/25 px-4 py-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm font-semibold leading-6 text-primary md:text-[0.98rem]">{fact.impact}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function JahonBozoriFacts() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Jahon Bozori umumiy ko'rinishi" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,74,0.16),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.36),transparent_22%,transparent_78%,rgba(0,0,0,0.34))]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-10">
          <Section className="w-full">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Asosiy sahifaga qaytish
            </Link>

            <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  7 ta fakt
                </div>
                <h1 className="mt-6 text-[clamp(2.9rem,6vw,5.4rem)] font-black leading-[0.92] tracking-[-0.05em]">
                  <span className="block text-foreground">Jahon Bozorida</span>
                  <span className="block text-gradient-gold">mijoz oqimi bo'ladimi?</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-[1.05rem]">
                  Ko'pchilik bitta savol beradi: "Bu joyda savdo yuradimi o'zi?" Bu sahifa javobni gap bilan
                  emas, aniq faktlar bilan beradi.
                </p>
              </div>

              <div className="glass-card relative overflow-hidden rounded-[2rem] border-primary/15 p-6 md:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,74,0.18),transparent_32%)]" />
                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Qisqa xulosa</p>
                  <p className="mt-4 text-2xl font-black leading-tight text-foreground md:text-3xl">
                    Bu loyiha oqimni kutmaydi.
                  </p>
                  <p className="mt-3 text-lg font-semibold text-primary">
                    Oqimning o'zi shu nuqtaga yig'iladigan qilib loyihalangan.
                  </p>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    Strategik joylashuv, asosiy yo'l, transport, logistika va katta masshtab bir joyda
                    to'planganda xaridor oqimi tasodif emas, tizimga aylanadi.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <section className="px-6 pb-6 md:pb-10">
        <Section className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              >
                <p className="text-xl font-black text-gradient-gold md:text-2xl">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <section className="px-6 py-14 md:py-20">
        <Section className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Gap bilan emas</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-5xl">
              Xaridor oqimini ko'rsatadigan <span className="text-gradient-gold">7 ta asosiy fakt</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              Bu 7 ta fakt Jahon Bozori nega kuchli savdo nuqtasiga aylanishini ko'rsatadi: strategik joylashuv,
              asosiy yo'l, doimiy transport oqimi, logistika, katta masshtab va tayyor infratuzilma.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {facts.map((fact) => (
              <FactCard key={fact.id} fact={fact} />
            ))}
          </div>
        </Section>
      </section>

      <section className="px-6 pb-20 pt-6 md:pb-24">
        <Section className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,199,74,0.11),rgba(255,255,255,0.03))] px-6 py-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:px-10 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,199,74,0.2),transparent_36%)]" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Xulosa</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight text-foreground md:text-5xl">
                Bu yerga odam keladimi?
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-2xl font-black leading-tight text-gradient-gold md:text-4xl">
                Yo'q. Odamlar o'zi kelishga majbur bo'ladi.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Siz ham shunday oqim markazida o'z do'koningiz bo'lishini istaysizmi? Asosiy sahifaga qaytib
                loyiha bilan yana bir bor tanishing.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-lg font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95"
              >
                Asosiy sahifaga o'tish
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Section>
      </section>
    </div>
  );
}
