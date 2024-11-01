import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const token = useSelector((state: any) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" />;
    console.log(token);
  }

  return <Outlet />;
};

export default ProtectedRoute;
