import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [cookies] = useCookies();
  return cookies.userId ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
