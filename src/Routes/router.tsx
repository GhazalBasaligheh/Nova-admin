import { createBrowserRouter, Navigate } from 'react-router';
import { AdminLayout } from '@/Components/Layout/AdminLayout';
import { LoginPage } from '@/Pages/LoginPage';
import { NotFoundPage } from '@/Pages/NotFoundPage';
import { ProductsPage } from '@/Pages/ProductsPage';
import { UsersPage } from '@/Pages/UsersPage';
import { ProtectedRoute, PublicOnlyRoute } from './guards';
import { DEFAULT_AUTHENTICATED_PATH, paths } from './paths';

export const router = createBrowserRouter([
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
          { path: paths.products, element: <ProductsPage /> },
          { path: paths.users, element: <UsersPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
