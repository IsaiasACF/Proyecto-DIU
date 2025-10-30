import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/authStore";
import type { Role } from "@/hooks/authStore";

export default function ProtectedRoute({
  allowed,
  children,
}: { allowed: Role[]; children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}
