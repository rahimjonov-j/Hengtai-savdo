import { Section } from "./ScrollReveal";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";

const PHONES = ["+998 88 219 66 66", "+998 88 692 33 33"];
const SOCIALS = [
  { name: "Instagram", url: "https://www.instagram.com/jahonbozorvodiy", icon: "instagram" },
  { name: "Telegram", url: "https://t.me/jahonbozorivodiy", icon: "telegram" },
  { name: "YouTube", url: "https://youtube.com/@jahonbozorvodiy", icon: "youtube" },
];

const MAP_URL = "https://www.openstreetmap.org/export/embed.html?bbox=71.750035%2C40.389607%2C71.770035%2C40.409607&layer=mapnik&marker=40.399607%2C71.760035";

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <Section className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
          <span className="text-gradient-gold">Aloqa</span> ma'lumotlari
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Info */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Manzil</h3>
                  <p className="text-muted-foreground">
                    Farg'ona vil. Farg'ona shahar, Ahmad Al-Farg'oniy shoh ko'chasi, 114
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Ish vaqti</h3>
                  <p className="text-muted-foreground">Soat 8:00 dan 18:00 gacha</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Telefon</h3>
                  {PHONES.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-primary hover:underline">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 text-foreground hover:border-primary/30 transition-colors font-semibold"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="glass-card rounded-2xl overflow-hidden min-h-[300px]">
            <iframe
              src={MAP_URL}
              className="w-full h-full min-h-[300px]"
              style={{ border: 0 }}
              loading="lazy"
              title="Jahon Bozori joylashuvi"
            />
          </div>
        </div>
      </Section>
    </section>
  );
}
