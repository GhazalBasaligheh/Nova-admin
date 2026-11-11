import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Wrapper, Label, Control, Input, Adornment, ErrorText } from './TextField.styles';

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
