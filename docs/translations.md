# Translation System

## How to Add New Translations

### 1. Add to Types

Edit `data-translations/types.ts`:

```typescript
export interface TranslationKeys {
  "nav.services": string; // Add your new key
}
```

### 2. Add English Text

Edit `data-translations/en.ts`:

```typescript
export const englishTranslations: TranslationKeys = {
  "nav.services": "Services", // Add English text
};
```

### 3. Add Arabic Text

Edit `data-translations/ar.ts`:

```typescript
export const arabicTranslations: TranslationKeys = {
  "nav.services": "الخدمات", // Add Arabic text
};
```

### 4. Use in Component

```typescript
import { useLanguage } from "@/contexts/LanguageContext";

const MyComponent = () => {
  const { t } = useLanguage();

  return <h1>{t("nav.services")}</h1>;
};
```

## That's it!

Only edit these 3 files when you need new translations:

- `types.ts` - Add the key
- `en.ts` - Add English text
- `ar.ts` - Add Arabic text

Then use `useLanguage` hook in any component.
..