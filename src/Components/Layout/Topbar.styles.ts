import styled from 'styled-components';
import { Button } from '@/Shared/Button';
import { TOPBAR_HEIGHT } from '@/Shared/theme/layout';

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  height: ${TOPBAR_HEIGHT}px;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

export const LanguageButton = styled(Button)`
  min-height: 40px;
  padding-inline: ${({ theme }) => theme.spacing.md};
`;
