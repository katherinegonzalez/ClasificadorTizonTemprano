import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../session";

export default function LoginRoute() {
  return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
}