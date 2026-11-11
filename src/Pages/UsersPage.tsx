import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertIcon, SearchIcon } from '@/assets/Icons';
import { UsersTable } from '@/Components/Users/UsersTable';
import { CreateUserModal } from '@/Modals/CreateUserModal';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { fetchUsers } from '@/Redux/slices/usersSlice';
import { Button } from '@/Shared/ui/Button';
import { Notice } from '@/Shared/ui/Notice';
import { PageHeader } from '@/Shared/ui/PageHeader';
import { SearchInput } from '@/Shared/ui/SearchInput';
import { Skeleton } from '@/Shared/ui/Skeleton';
import { StatePanel } from '@/Shared/ui/StatePanel';
import { useDebouncedValue } from '@/Shared/hooks/useDebouncedValue';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import { matchesQuery } from '@/Utils/matchesQuery';
import { Toolbar, Count, SkeletonList } from './UsersPage.styles';

export function UsersPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, listStatus } = useAppSelector((state) => state.users);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const query = useDebouncedValue(search);

  useEffect(() => {
    void dispatch(fetchUsers());
  }, [dispatch]);

  const visible = useMemo(
    () =>
      items.filter((u) =>
        matchesQuery(query, [u.name.firstname, u.name.lastname, u.username, u.email]),
      ),
    [items, query],
  );

  const ready = listStatus === RequestStatus.Succeeded;

  return (
    <>
      <PageHeader
        title={t('Users.title')}
        actions={
          <Button type="button" onClick={() => setCreateOpen(true)} disabled={!ready}>
            {t('Users.add')}
          </Button>
        }
      />

      <Notice message={notice} dismissLabel={t('Common.close')} onDismiss={() => setNotice(null)} />

      {(listStatus === RequestStatus.Idle || listStatus === RequestStatus.Loading) && (
        <SkeletonList role="status" aria-busy="true" aria-label={t('Users.loading')}>
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} $height="44px" />
          ))}
        </SkeletonList>
      )}

      {listStatus === RequestStatus.Failed && (
        <StatePanel
          tone="danger"
          icon={<AlertIcon size={32} />}
          title={t('Users.errorTitle')}
          description={t('Common.unknownError')}
          action={
            <Button type="button" onClick={() => void dispatch(fetchUsers())}>
              {t('Common.retry')}
            </Button>
          }
        />
      )}

      {ready && items.length === 0 && <StatePanel title={t('Users.emptyTitle')} />}

      {ready && items.length > 0 && (
        <>
          <Toolbar>
            <SearchInput
              label={t('Users.searchLabel')}
              placeholder={t('Users.searchPlaceholder')}
              value={search}
              onChange={setSearch}
            />
            <Count aria-live="polite">{t('Users.count', { count: visible.length })}</Count>
          </Toolbar>
          {visible.length === 0 ? (
            <StatePanel
              icon={<SearchIcon size={32} />}
              title={t('Users.noMatchesTitle')}
              description={t('Users.noMatchesBody')}
            />
          ) : (
            <UsersTable users={visible} />
          )}
        </>
      )}

      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(user) => setNotice(t('Users.created', { username: user.username }))}
      />
    </>
  );
}
