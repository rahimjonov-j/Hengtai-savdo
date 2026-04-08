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

export function validateFirstname(firstname: string) {
  if (!firstname.trim()) {
    return "Ismingizni kiriting";
  }

  return "";
}

export function validatePhone(phone: string) {
  if (phone === "+998") {
    return "Telefon raqamingizni kiriting";
  }

  if (!UZBEK_PHONE_PATTERN.test(phone)) {
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

  return sanitized.slice(0, 13);
}
