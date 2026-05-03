import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';

export const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};
