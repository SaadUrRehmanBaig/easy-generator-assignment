import { Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/snackbar/Header/Header";
import "./ProtectedRoute.scss";
import { isLogin, setLogout } from "./storage";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = isLogin();
  console.log("check if authenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const logout = () => {
    navigate("/login");
    setLogout();
  };

  return (
    <Fragment>
      <Header onLogout={() => logout()}></Header>
      <div className="scrollable-container">{children}</div>
    </Fragment>
  );
};

export default ProtectedRoute;
