import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: min(100%, 360px);

  svg {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 12px;
    margin-block: auto;
    color: ${({ theme }) => theme.colors.textMuted};
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 44px;
  padding-inline: 40px ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`;
