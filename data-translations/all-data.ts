import { TranslationData } from "./types";
import { englishTranslations } from "./en";
import { arabicTranslations } from "./ar";

export const translations: TranslationData = {
  en: englishTranslations,
  ar: arabicTranslations,
};

export * from "./types";
export { englishTranslations, arabicTranslations };
