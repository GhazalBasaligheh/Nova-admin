import { createBrowserRouter, Navigate } from 'react-router';
import { AdminLayout } from '@/Components/Layout/AdminLayout';
import { ErrorPage } from '@/Pages/ErrorPage';
import { LoginPage } from '@/Pages/LoginPage';
import { ProtectedRoute, PublicOnlyRoute } from './guards';
import { DEFAULT_AUTHENTICATED_PATH, paths } from './paths';

// Admin pages are code-split: each loads on first visit, keeping the login bundle small.
// errorElement is the app's error boundary: a rendering error or a page chunk that fails
// to load shows ErrorPage instead of a blank screen.
export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [{ path: paths.login, element: <LoginPage /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: paths.root, element: <Navigate to={DEFAULT_AUTHENTICATED_PATH} replace /> },
              {
                path: paths.products,
                lazy: async () => ({
                  Component: (await import('@/Pages/ProductsPage')).ProductsPage,
                }),
              },
              {
                path: paths.users,
                lazy: async () => ({ Component: (await import('@/Pages/UsersPage')).UsersPage }),
              },
              {
                path: '*',
                lazy: async () => ({
                  Component: (await import('@/Pages/NotFoundPage')).NotFoundPage,
                }),
              },
            ],
          },
        ],
      },
    ],
  },
]);
