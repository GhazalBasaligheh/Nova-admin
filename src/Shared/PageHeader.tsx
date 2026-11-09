import type { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-block-end: ${({ theme }) => theme.spacing.lg};

  h1 {
    font-size: 26px;
  }
`;

export function PageHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <Wrapper>
      <h1>{title}</h1>
      {actions && <div>{actions}</div>}
    </Wrapper>
  );
}
