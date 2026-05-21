import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleProtected = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  let user;

  try {
    user = jwtDecode(token); 
  } catch (err) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtected;