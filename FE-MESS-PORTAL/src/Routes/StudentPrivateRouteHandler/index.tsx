import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from 'Redux/Store';
import { isStudentRole } from 'Rbac/roles';
import { ROUTE } from 'Common/constants/routes.constants';

const StudentPrivateRouteHandler = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTE.STUDENT_LOGIN} replace state={{ from: location }} />;
  }
  if (!isStudentRole(user.role)) {
    return <Navigate to={ROUTE.ADMIN_DASHBOARD} replace />;
  }
  return <Outlet />;
};

export default StudentPrivateRouteHandler;
