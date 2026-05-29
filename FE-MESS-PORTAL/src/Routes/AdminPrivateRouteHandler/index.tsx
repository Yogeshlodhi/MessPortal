import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from 'Redux/Store';
import { isAdminRole } from 'Rbac/roles';
import { ROUTE } from 'Common/constants/routes.constants';

const AdminPrivateRouteHandler = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTE.ADMIN_LOGIN} replace state={{ from: location }} />;
  }
  if (!isAdminRole(user.role)) {
    return <Navigate to={ROUTE.STUDENT_DASHBOARD} replace />;
  }
  return <Outlet />;
};

export default AdminPrivateRouteHandler;
