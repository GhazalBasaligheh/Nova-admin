import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertIcon, SearchIcon } from '@/assets/Icons';
import { ProductsTable } from '@/Components/Products/ProductsTable';
import { CreateProductModal } from '@/Modals/CreateProductModal';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { fetchProducts } from '@/Redux/slices/productsSlice';
import { Button } from '@/Shared/ui/Button';
import { Notice } from '@/Shared/ui/Notice';
import { PageHeader } from '@/Shared/ui/PageHeader';
import { SearchInput } from '@/Shared/ui/SearchInput';
import { Skeleton } from '@/Shared/ui/Skeleton';
import { StatePanel } from '@/Shared/ui/StatePanel';
import { useDebouncedValue } from '@/Shared/hooks/useDebouncedValue';
import { useFormatters } from '@/Shared/hooks/useFormatters';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import { matchesQuery } from '@/Utils/matchesQuery';
import { Toolbar, Count, SkeletonList } from './ProductsPage.styles';

export function ProductsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, listStatus } = useAppSelector((state) => state.products);
  const { category } = useFormatters();
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const query = useDebouncedValue(search);

  // Loads once; the thunk's condition skips it when data is already in the store.
  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch]);

  // Recomputed only when the list or the debounced query changes, not on every keystroke.
  const visible = useMemo(
    () => items.filter((p) => matchesQuery(query, [p.title, p.category, category(p.category)])),
    [items, query, category],
  );

  const ready = listStatus === RequestStatus.Succeeded;

  return (
    <>
      <PageHeader
        title={t('Products.title')}
        actions={
          <Button type="button" onClick={() => setCreateOpen(true)} disabled={!ready}>
            {t('Products.add')}
          </Button>
        }
      />

      <Notice message={notice} dismissLabel={t('Common.close')} onDismiss={() => setNotice(null)} />

      {(listStatus === RequestStatus.Idle || listStatus === RequestStatus.Loading) && (
        <SkeletonList role="status" aria-busy="true" aria-label={t('Products.loading')}>
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} $height="56px" />
          ))}
        </SkeletonList>
      )}

      {listStatus === RequestStatus.Failed && (
        <StatePanel
          tone="danger"
          icon={<AlertIcon size={32} />}
          title={t('Products.errorTitle')}
          description={t('Common.unknownError')}
          action={
            <Button type="button" onClick={() => void dispatch(fetchProducts())}>
              {t('Common.retry')}
            </Button>
          }
        />
      )}

      {ready && items.length === 0 && <StatePanel title={t('Products.emptyTitle')} />}

      {ready && items.length > 0 && (
        <>
          <Toolbar>
            <SearchInput
              label={t('Products.searchLabel')}
              placeholder={t('Products.searchPlaceholder')}
              value={search}
              onChange={setSearch}
            />
            <Count aria-live="polite">{t('Products.count', { count: visible.length })}</Count>
          </Toolbar>
          {visible.length === 0 ? (
            <StatePanel
              icon={<SearchIcon size={32} />}
              title={t('Products.noMatchesTitle')}
              description={t('Products.noMatchesBody')}
            />
          ) : (
            <ProductsTable products={visible} />
          )}
        </>
      )}

      <CreateProductModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(product) => setNotice(t('Products.created', { title: product.title }))}
      />
    </>
  );
}
