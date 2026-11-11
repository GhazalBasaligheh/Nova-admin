import { useTranslation } from 'react-i18next';
import { AlertIcon } from '@/assets/Icons';
import { Button } from '@/Shared/Button';
import { StatePanel } from '@/Shared/StatePanel';
import { Page } from './ErrorPage.styles';

// Shown by the router's errorElement when a page throws while rendering or fails to load.
export function ErrorPage() {
  const { t } = useTranslation();

  return (
    <Page>
      <StatePanel
        tone="danger"
        icon={<AlertIcon size={32} />}
        title={t('ErrorPage.title')}
        description={t('ErrorPage.body')}
        action={
          <Button type="button" onClick={() => window.location.reload()}>
            {t('ErrorPage.reload')}
          </Button>
        }
      />
    </Page>
  );
}
