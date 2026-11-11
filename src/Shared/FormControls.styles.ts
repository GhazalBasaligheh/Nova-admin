import styled, { css } from 'styled-components';

export const control = css<{ $invalid: boolean }>`
  width: 100%;
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
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

export const Wrapper = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledTextarea = styled.textarea<{ $invalid: boolean }>`
  ${control}
  min-height: 96px;
  resize: vertical;
`;

export const StyledSelect = styled.select<{ $invalid: boolean }>`
  ${control}
`;
