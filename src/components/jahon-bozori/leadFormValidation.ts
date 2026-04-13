export interface LeadFormValues {
  firstname: string;
  phone: string;
}

export interface LeadFormErrors {
  firstname: string;
  phone: string;
}

export const emptyLeadFormErrors: LeadFormErrors = {
  firstname: "",
  phone: "",
};

const UZBEK_PHONE_PATTERN = /^\+998\d{9}$/;

export function normalizePhoneInput(phone: string) {
  return phone.replace(/\s/g, "");
}

export function validateFirstname(firstname: string) {
  if (!firstname.trim()) {
    return "Ismingizni kiriting";
  }

  return "";
}

export function validatePhone(phone: string) {
  const normalizedPhone = normalizePhoneInput(phone);

  if (normalizedPhone === "+998") {
    return "Telefon raqamingizni kiriting";
  }

  if (!UZBEK_PHONE_PATTERN.test(normalizedPhone)) {
    return "Telefon raqamni to'liq kiriting";
  }

  return "";
}

export function validateLeadForm({ firstname, phone }: LeadFormValues): LeadFormErrors {
  return {
    firstname: validateFirstname(firstname),
    phone: validatePhone(phone),
  };
}

export function sanitizePhoneInput(value: string) {
  const sanitized = value.replace(/[^\d+]/g, "");

  if (!sanitized.startsWith("+998")) {
    return "+998";
  }

  const limited = sanitized.slice(0, 13);
  const digits = limited.slice(4);

  if (!digits.length) {
    return "+998";
  }

  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);

  return `+998 ${parts.join(" ")}`.trim();
}
