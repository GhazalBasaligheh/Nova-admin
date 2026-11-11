import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

export const Control = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ $invalid: boolean; $hasAdornment: boolean }>`
  width: 100%;
  min-height: 44px;
  padding-inline: ${({ theme }) => theme.spacing.md};
  padding-inline-end: ${({ $hasAdornment }) => ($hasAdornment ? '48px' : undefined)};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
  }
`;

export const Adornment = styled.div`
  position: absolute;
  inset-inline-end: 2px;
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;
