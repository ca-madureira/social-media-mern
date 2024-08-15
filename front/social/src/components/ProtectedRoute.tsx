import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const token = useSelector((state: any) => state.auth.token);

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" />;
    console.log(token);
  }

  // Se houver token, renderiza os filhos da rota protegida
  return <Outlet />;
};

export default ProtectedRoute;
