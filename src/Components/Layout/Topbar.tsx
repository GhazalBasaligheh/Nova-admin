import { useTranslation } from 'react-i18next';
import { GlobeIcon, LogoutIcon, MoonIcon, SunIcon } from '@/assets/Icons';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { logout } from '@/Redux/slices/authSlice';
import { setLanguage, toggleTheme } from '@/Redux/slices/uiSlice';
import { IconButton } from '@/Shared/Button';
import { Language } from '@/types/Enums/Language';
import { Theme } from '@/types/Enums/Theme';
import { Bar, LanguageButton } from './Topbar.styles';

export function Topbar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme, language } = useAppSelector((state) => state.ui);
  const otherLanguage = language === Language.Fa ? Language.En : Language.Fa;
  const isLight = theme === Theme.Light;

  return (
    <Bar>
      <LanguageButton
        type="button"
        $variant="ghost"
        onClick={() => dispatch(setLanguage(otherLanguage))}
        aria-label={t('Topbar.switchLanguage')}
      >
        <GlobeIcon size={18} />
        <span lang={otherLanguage}>{t(`Languages.${otherLanguage}`)}</span>
      </LanguageButton>
      <IconButton
        type="button"
        onClick={() => dispatch(toggleTheme())}
        aria-label={isLight ? t('Topbar.switchToDark') : t('Topbar.switchToLight')}
      >
        {isLight ? <MoonIcon /> : <SunIcon />}
      </IconButton>
      <LanguageButton type="button" $variant="ghost" onClick={() => dispatch(logout())}>
        <LogoutIcon size={18} />
        {t('Topbar.logout')}
      </LanguageButton>
    </Bar>
  );
}
