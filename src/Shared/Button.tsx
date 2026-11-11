import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.accentHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }
  `,
};

export const Button = styled.button<{ $variant?: Variant; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.lg};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    opacity 0.15s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  ${({ $variant = 'primary' }) => variants[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

export const IconButton = styled.button`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
