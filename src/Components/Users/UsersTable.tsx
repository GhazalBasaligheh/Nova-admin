import { useTranslation } from 'react-i18next';
import { Table, TableWrapper } from '@/Shared/ui/DataTable';
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
          {/* API values are Latin text. <bdi> isolates their direction without changing the
              cell's own direction, so cells stay aligned with their (RTL) column headers. */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <bdi>{user.name.firstname}</bdi>
              </td>
              <td>
                <bdi>{user.username}</bdi>
              </td>
              <td>
                <bdi dir="ltr">{user.email}</bdi>
              </td>
              <td>
                <bdi dir="ltr">{user.phone}</bdi>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
