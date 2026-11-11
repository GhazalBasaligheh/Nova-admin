import styled from 'styled-components';

// Native <dialog> with showModal(): focus trapping, Esc to close
export const Dialog = styled.dialog`
  width: min(100% - 32px, 560px);
  max-height: calc(100vh - 64px);
  margin: auto;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadow.card};

  &::backdrop {
    background: rgb(11 21 48 / 55%);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 18px;
  }
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;
