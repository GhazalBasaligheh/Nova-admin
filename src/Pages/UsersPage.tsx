import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/Shared/PageHeader';
import { StatePanel } from '@/Shared/StatePanel';

// Placeholder: the users table and create form are built in a later step.
export function UsersPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t('Nav.users')} />
      <StatePanel title={t('Placeholder.comingSoon')} />
    </>
  );
}
