import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Content, Main } from './AdminLayout.styles';

export function AdminLayout() {
  return (
    <>
      <Sidebar />
      <Content>
        <Topbar />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </>
  );
}
