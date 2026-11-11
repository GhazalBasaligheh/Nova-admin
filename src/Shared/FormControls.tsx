import { useId, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Wrapper, ErrorText, StyledTextarea, StyledSelect } from './FormControls.styles';

interface FieldProps {
  label: string;
  error?: string;
}

function useFieldIds() {
  const id = useId();
  return { id, errorId: `${id}-error` };
}

export function TextareaField({
  label,
  error,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { id, errorId } = useFieldIds();
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <StyledTextarea
        id={id}
        $invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const { id, errorId } = useFieldIds();
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <StyledSelect
        id={id}
        $invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </StyledSelect>
      {error && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
}
