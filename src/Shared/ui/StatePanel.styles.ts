import styled from 'styled-components';

export const Panel = styled.div<{ $tone: 'neutral' | 'danger' }>`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;

  > svg {
    color: ${({ theme, $tone }) =>
      $tone === 'danger' ? theme.colors.danger : theme.colors.textMuted};
  }

  h3 {
    font-size: 18px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
