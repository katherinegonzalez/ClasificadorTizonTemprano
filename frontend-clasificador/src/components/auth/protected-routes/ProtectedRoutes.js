import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../session";

export default function ProtectedRoutes() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}