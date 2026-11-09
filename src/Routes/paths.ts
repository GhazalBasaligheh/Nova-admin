// Centralized route paths.
export const paths = {
  root: '/',
  login: '/login',
  products: '/products',
  users: '/users',
} as const;

// Where to land after login when no previous page was requested.
export const DEFAULT_AUTHENTICATED_PATH = paths.products;
