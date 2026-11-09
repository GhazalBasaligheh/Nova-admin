/**
 * FakeStoreAPI returns the same id for every create (it doesn't store anything), so locally
 * added items could collide. Keeps the API's id when free, otherwise uses max + 1.
 */
export function uniqueId(id: number, existing: Array<{ id: number }>): number {
  if (!existing.some((item) => item.id === id)) return id;
  return Math.max(...existing.map((item) => item.id)) + 1;
}
