import type { ReactNode } from 'react';
import { Panel } from './StatePanel.styles';

interface StatePanelProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: 'neutral' | 'danger';
}

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
