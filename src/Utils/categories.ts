// jewelery" is the API's spelling.
const categoryLabelKeys = {
  electronics: 'electronics',
  jewelery: 'jewelery',
  "men's clothing": 'mens',
  "women's clothing": 'womens',
} as const;

export type CategoryLabelKey = (typeof categoryLabelKeys)[keyof typeof categoryLabelKeys];

export function getCategoryLabelKey(slug: string): CategoryLabelKey | null {
  return (categoryLabelKeys as Record<string, CategoryLabelKey>)[slug] ?? null;
}
