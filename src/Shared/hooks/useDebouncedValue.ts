import { useEffect, useState } from 'react';

export const SEARCH_DEBOUNCE_MS = 300;

/** Returns `value` once it has stopped changing for `delay` ms (typing-friendly search). */
export function useDebouncedValue<T>(value: T, delay: number = SEARCH_DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
