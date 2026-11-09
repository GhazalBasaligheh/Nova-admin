import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/Shared/PageHeader';
import { StatePanel } from '@/Shared/StatePanel';

// Placeholder: the products table and create form are built in the next step.
export function ProductsPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t('Nav.products')} />
      <StatePanel title={t('Placeholder.comingSoon')} />
    </>
  );
}
