import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/types/Enums/Language';
import { getCategoryLabelKey } from '@/Utils/categoryLabels';

const intlLocale = { [Language.Fa]: 'fa-IR', [Language.En]: 'en-US' } as const;

// Locale-aware display helpers. Admin prices stay in USD (the API's currency, and what admins enter);
// only the digits follow the interface language.
export function useFormatters() {
  const { t, i18n } = useTranslation();
  const locale = intlLocale[i18n.language as Language] ?? intlLocale[Language.Fa];

  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }),
    [locale],
  );

  const category = useCallback(
    (slug: string) => {
      const key = getCategoryLabelKey(slug);
      return key ? t(`Categories.${key}`) : slug;
    },
    [t],
  );

  return { price: (value: number) => usd.format(value), category };
}
