import { useId } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '@/assets/Icons';
import { VisuallyHidden } from './DataTable';

const Wrapper = styled.div`
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

const Input = styled.input`
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

interface SearchInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ label, placeholder, value, onChange }: SearchInputProps) {
  const id = useId();
  return (
    <Wrapper role="search">
      <VisuallyHidden as="label" htmlFor={id}>
        {label}
      </VisuallyHidden>
      <SearchIcon size={18} />
      <Input
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Wrapper>
  );
}
