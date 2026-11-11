import styled from 'styled-components';
import { SIDEBAR_WIDTH } from '@/Shared/theme/layout';

export const Content = styled.div`
  min-height: 100vh;
  margin-inline-start: ${SIDEBAR_WIDTH}px;
`;

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};
`;
