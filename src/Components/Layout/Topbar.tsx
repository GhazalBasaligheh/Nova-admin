import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GlobeIcon, LogoutIcon, MoonIcon, SunIcon } from '@/assets/Icons';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { logout } from '@/Redux/slices/authSlice';
import { setLanguage, toggleTheme } from '@/Redux/slices/uiSlice';
import { Button, IconButton } from '@/Shared/Button';
import { TOPBAR_HEIGHT } from '@/Shared/theme/layout';
import { Language } from '@/types/Enums/Language';
import { Theme } from '@/types/Enums/Theme';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  height: ${TOPBAR_HEIGHT}px;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const LanguageButton = styled(Button)`
  min-height: 40px;
  padding-inline: ${({ theme }) => theme.spacing.md};
`;

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
