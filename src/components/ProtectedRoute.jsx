import { Navigate } from "react-router-dom";


function ProtectedRoute({ isLoggedIn, validatingToken, children }) {
  if (validatingToken) {
    return (
      <div className="loading-screan">
        <p className="text-loading-screan">Cargando...</p>
      </div>
    );
  } else if (!isLoggedIn) {
    return <Navigate to={"/signin"} replace />;
  }
  return children;
}

export default ProtectedRoute;
