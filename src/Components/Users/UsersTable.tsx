import { useTranslation } from 'react-i18next';
import { Table, TableWrapper } from '@/Shared/DataTable';
import type { User } from '@/types/user';

export function UsersTable({ users }: { users: User[] }) {
  const { t } = useTranslation();

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th scope="col">{t('Users.columns.firstName')}</th>
            <th scope="col">{t('Users.columns.username')}</th>
            <th scope="col">{t('Users.columns.email')}</th>
            <th scope="col">{t('Users.columns.phone')}</th>
          </tr>
        </thead>
        <tbody>
          {/* API values are Latin text; dir="auto" keeps them readable inside the RTL table. */}
          {users.map((user) => (
            <tr key={user.id}>
              <td dir="auto">{user.name.firstname}</td>
              <td dir="auto">{user.username}</td>
              <td dir="ltr">{user.email}</td>
              <td dir="ltr">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
