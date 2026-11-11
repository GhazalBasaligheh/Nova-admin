import { Outlet } from 'react-router';
import styled from 'styled-components';
import { SIDEBAR_WIDTH } from '@/Shared/theme/layout';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const Content = styled.div`
  min-height: 100vh;
  margin-inline-start: ${SIDEBAR_WIDTH}px;
`;

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};
`;

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
