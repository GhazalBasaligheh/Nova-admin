import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '@/Redux/hooks';
import { selectIsAuthenticated } from '@/Redux/slices/authSlice';
import { DEFAULT_AUTHENTICATED_PATH, paths } from './paths';

export interface RedirectState {
  from?: string;
}

// Client-side gate for UX only: it hides admin screens from logged-out users,
// but real protection must come from the API (FakeStoreAPI doesn't enforce any).
export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const state: RedirectState = { from: location.pathname + location.search };
    return <Navigate to={paths.login} replace state={state} />;
  }
  return <Outlet />;
}

// Keeps logged-in users off the login page.
export function PublicOnlyRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to={DEFAULT_AUTHENTICATED_PATH} replace /> : <Outlet />;
}
