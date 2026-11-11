import { useId } from 'react';
import { SearchIcon } from '@/assets/Icons';
import { VisuallyHidden } from './DataTable';
import { Wrapper, Input } from './SearchInput.styles';

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
