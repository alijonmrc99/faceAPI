import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function PublicPage() {
  const [cookies] = useCookies();
  return !cookies.userId ? <Outlet /> : <Navigate to="/" />;
}

export default PublicPage;
