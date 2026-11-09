/** Case-insensitive match of `query` against any of the given fields. Empty query matches all. */
export function matchesQuery(query: string, fields: Array<string | undefined>): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return fields.some((field) => field?.toLowerCase().includes(needle));
}
