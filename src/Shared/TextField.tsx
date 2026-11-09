import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const Control = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ $invalid: boolean; $hasAdornment: boolean }>`
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

const Adornment = styled.div`
  position: absolute;
  inset-inline-end: 2px;
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  adornment?: ReactNode;
}

// Labelled input with an accessible error message (aria-invalid + aria-describedby).
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, adornment, id, ...inputProps },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <Wrapper>
      <Label htmlFor={inputId}>{label}</Label>
      <Control>
        <Input
          ref={ref}
          id={inputId}
          $invalid={Boolean(error)}
          $hasAdornment={Boolean(adornment)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {adornment && <Adornment>{adornment}</Adornment>}
      </Control>
      {error && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
});
