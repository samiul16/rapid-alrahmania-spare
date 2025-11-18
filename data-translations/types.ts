export type Language = "en" | "ar";

export interface TranslationKeys {
  // Navigation
  "nav.home": string;
  "nav.services": string;
  "nav.projects": string;
  "nav.career": string;
  "nav.about": string;
  "nav.blog": string;
  "nav.contact": string;
  "nav.scheduleACall": string;
  "nav.english": string;
  "nav.arabic": string;

  // Common
  "common.loading": string;
  "common.error": string;
  "common.success": string;
  "common.welcome": string;
  "common.readMore": string;
  "common.learnMore": string;
  "common.getStarted": string;
  "common.viewAll": string;
  "common.close": string;
  "common.open": string;
  "common.menu": string;

  // Buttons
  "btn.submit": string;
  "btn.cancel": string;
  "btn.save": string;
  "btn.edit": string;
  "btn.delete": string;
  "btn.confirm": string;

  // Forms
  "form.name": string;
  "form.email": string;
  "form.phone": string;
  "form.message": string;
  "form.required": string;
}

export type TranslationData = Record<Language, TranslationKeys>;
