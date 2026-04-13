import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import {
  emptyLeadFormErrors,
  normalizePhoneInput,
  sanitizePhoneInput,
  validateFirstname,
  validateLeadForm,
  validatePhone,
} from "./leadFormValidation";

const TELEGRAM_URL = "https://t.me/jahonbozorivodiy";
const TELEGRAM_REDIRECT_DELAY_MS = 4000;
const API_URL = "https://backend.prohome.uz/api/v1/leeds/create-for-hengtai";

interface LeadFormProps {
  onSuccess?: () => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("+998");
  const [errors, setErrors] = useState(() => ({ ...emptyLeadFormErrors }));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!submitted) return;

    const timeoutId = window.setTimeout(() => {
      window.location.assign(TELEGRAM_URL);
    }, TELEGRAM_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateLeadForm({ firstname, phone });
    setErrors(nextErrors);

    if (nextErrors.firstname || nextErrors.phone) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname: firstname.trim(), phone: normalizePhoneInput(phone) }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
      onSuccess?.();
      toast({ title: "Arizangiz qabul qilindi!" });
    } catch {
      toast({ title: "Xatolik yuz berdi, qaytadan urinib ko'ring", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-500" />
        <p className="text-xl font-bold text-foreground mb-2">Rahmat! Arizangiz qabul qilindi</p>
        <p className="text-muted-foreground">Barcha yangiliklarni telegram kanalimizda kuzatib boring.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Ismingiz</label>
        <div className="relative">
          <User
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              errors.firstname ? "text-destructive" : "text-muted-foreground"
            }`}
          />
          <input
            type="text"
            value={firstname}
            onChange={(e) => {
              const nextFirstname = e.target.value;
              setFirstname(nextFirstname);
              setErrors((current) => ({
                ...current,
                firstname: validateFirstname(nextFirstname),
              }));
            }}
            onBlur={() =>
              setErrors((current) => ({
                ...current,
                firstname: validateFirstname(firstname),
              }))
            }
            placeholder="Ismingizni kiriting"
            className={`w-full rounded-xl bg-secondary py-3 pl-12 pr-4 text-lg text-foreground outline-none transition-colors ${
              errors.firstname
                ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/30"
                : "border border-border focus:border-primary focus:ring-1 focus:ring-primary"
            }`}
          />
        </div>
        {errors.firstname && <p className="mt-2 text-sm font-medium text-destructive">{errors.firstname}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Telefon raqam</label>
        <div className="relative">
          <Phone
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              errors.phone ? "text-destructive" : "text-muted-foreground"
            }`}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const nextPhone = sanitizePhoneInput(e.target.value);
              setPhone(nextPhone);
              setErrors((current) => ({
                ...current,
                phone: validatePhone(nextPhone),
              }));
            }}
            onBlur={() =>
              setErrors((current) => ({
                ...current,
                phone: validatePhone(phone),
              }))
            }
            placeholder="+998 99 444 98 68"
            className={`w-full rounded-xl bg-secondary py-3 pl-12 pr-4 text-lg text-foreground outline-none transition-colors ${
              errors.phone
                ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/30"
                : "border border-border focus:border-primary focus:ring-1 focus:ring-primary"
            }`}
          />
        </div>
        {errors.phone && <p className="mt-2 text-sm font-medium text-destructive">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-gold text-primary-foreground font-bold text-lg py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 animate-pulse-glow flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Yuborilmoqda...
          </>
        ) : (
          <>
            <MapPin className="w-5 h-5" />
            Joy band qilish
          </>
        )}
      </button>
    </form>
  );
}
