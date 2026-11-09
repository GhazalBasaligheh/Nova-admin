import type { ReactNode } from 'react';
import styled from 'styled-components';

const Panel = styled.div<{ $tone: 'neutral' | 'danger' }>`
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

interface StatePanelProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: 'neutral' | 'danger';
}

// Shared empty/error state. Errors are announced (role="alert"); empty results are polite (status).
export function StatePanel({
  icon,
  title,
  description,
  action,
  tone = 'neutral',
}: StatePanelProps) {
  return (
    <Panel $tone={tone} role={tone === 'danger' ? 'alert' : 'status'}>
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </Panel>
  );
}
