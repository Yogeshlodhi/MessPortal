import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'Redux/Store';
import { isAdminRole, isStudentRole } from 'Rbac/roles';
import { ROUTE } from 'Common/constants/routes.constants';

const RootRedirect = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated && user) {
    if (isAdminRole(user.role)) return <Navigate to={ROUTE.ADMIN_DASHBOARD} replace />;
    if (isStudentRole(user.role)) return <Navigate to={ROUTE.STUDENT_DASHBOARD} replace />;
  }
  return <Navigate to={ROUTE.STUDENT_LOGIN} replace />;
};

export default RootRedirect;
