import type { ReactNode } from 'react';
import { Wrapper } from './PageHeader.styles';

export function PageHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <Wrapper>
      <h1>{title}</h1>
      {actions && <div>{actions}</div>}
    </Wrapper>
  );
}
