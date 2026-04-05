import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 🔥 check auth (cookie based hai to simple check ya API se bhi kar sakta hai)
  const isAuthenticated = true; // 👉 abhi ke liye true rakh

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;