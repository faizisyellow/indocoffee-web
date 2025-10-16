import { Navigate, useLocation } from "react-router";
import { AuthenticationService } from "../service/authentication";
import { clientWithAuth } from "../service/axios";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

export default function ProtectedRoute({
  children,
  requireAuth = true,
}: ProtectedRouteProps) {
  const authService = new AuthenticationService(clientWithAuth);
  const isAuthenticated = authService.isAuthenticated();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
