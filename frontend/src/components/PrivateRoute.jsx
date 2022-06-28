import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner></Spinner>;
  }
  return loggedIn ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
