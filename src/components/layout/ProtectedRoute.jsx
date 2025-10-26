import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // we want to check the local storage for both token and user
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // we want to redirect programmatically but still preserves React State
    // we want to use replace here such that when user click back, it will be redirected to a page before it is getting redirected to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
