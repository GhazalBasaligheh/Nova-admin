import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { StatePanel } from '@/Shared/StatePanel';
import { DEFAULT_AUTHENTICATED_PATH } from '@/Routes/paths';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <StatePanel
      title={t('NotFound.title')}
      description={t('NotFound.body')}
      action={<Link to={DEFAULT_AUTHENTICATED_PATH}>{t('NotFound.back')}</Link>}
    />
  );
}
