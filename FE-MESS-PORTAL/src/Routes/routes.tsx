import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import withSuspense from 'Common/Hoc/withSuspense';
import { ROUTE } from 'Common/constants/routes.constants';

const RootLayout = withSuspense(lazy(() => import('Layout/RootLayout')));
const StudentLayout = withSuspense(lazy(() => import('Layout/StudentLayout')));
const AdminLayout = withSuspense(lazy(() => import('Layout/AdminLayout')));

const StudentPrivateRouteHandler = withSuspense(
  lazy(() => import('Routes/StudentPrivateRouteHandler')),
);
const AdminPrivateRouteHandler = withSuspense(
  lazy(() => import('Routes/AdminPrivateRouteHandler')),
);
const RootRedirect = withSuspense(lazy(() => import('Routes/RootRedirect')));

const StudentLogin = withSuspense(lazy(() => import('Student/Pages/login')));
const StudentRegister = withSuspense(lazy(() => import('Student/Pages/register')));
const StudentDashboard = withSuspense(lazy(() => import('Student/Pages/dashboard')));
const StudentMenu = withSuspense(lazy(() => import('Student/Pages/menu')));
const StudentAnnouncements = withSuspense(lazy(() => import('Student/Pages/announcements')));
const StudentMessInfo = withSuspense(lazy(() => import('Student/Pages/messInfo')));
const StudentLeaveApplication = withSuspense(lazy(() => import('Student/Pages/leaveApplication')));
const StudentFeedback = withSuspense(lazy(() => import('Student/Pages/feedback')));
const StudentComplaints = withSuspense(lazy(() => import('Student/Pages/complaints')));
const StudentProfile = withSuspense(lazy(() => import('Student/Pages/profile')));

const AdminLogin = withSuspense(lazy(() => import('Admin/Pages/login')));
const AdminDashboard = withSuspense(lazy(() => import('Admin/Pages/dashboard')));
const AdminMenu = withSuspense(lazy(() => import('Admin/Pages/menu')));
const AdminAnnouncements = withSuspense(lazy(() => import('Admin/Pages/announcements')));
const AdminMessInfo = withSuspense(lazy(() => import('Admin/Pages/messInfo')));
const AdminLeaves = withSuspense(lazy(() => import('Admin/Pages/leaves')));
const AdminStudents = withSuspense(lazy(() => import('Admin/Pages/students')));
const AdminComplaints = withSuspense(lazy(() => import('Admin/Pages/complaints')));
const AdminFeedbacks = withSuspense(lazy(() => import('Admin/Pages/feedbacks')));
const AdminAddAdmin = withSuspense(lazy(() => import('Admin/Pages/addAdmin')));

const studentPrivateChildren: RouteObject[] = [
  {
    element: <StudentLayout />,
    children: [
      { index: true, element: <Navigate to='dashboard' replace /> },
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'menu', element: <StudentMenu /> },
      { path: 'announcements', element: <StudentAnnouncements /> },
      { path: 'mess-info', element: <StudentMessInfo /> },
      { path: 'apply-leave', element: <StudentLeaveApplication /> },
      { path: 'feedback', element: <StudentFeedback /> },
      { path: 'complaints', element: <StudentComplaints /> },
      { path: 'profile', element: <StudentProfile /> },
    ],
  },
];

const adminPrivateChildren: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to='dashboard' replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'menu', element: <AdminMenu /> },
      { path: 'announcements', element: <AdminAnnouncements /> },
      { path: 'mess-info', element: <AdminMessInfo /> },
      { path: 'leaves', element: <AdminLeaves /> },
      { path: 'students', element: <AdminStudents /> },
      { path: 'complaints', element: <AdminComplaints /> },
      { path: 'feedbacks', element: <AdminFeedbacks /> },
      { path: 'admin-create', element: <AdminAddAdmin /> },
    ],
  },
];

const routes: RouteObject[] = [
  {
    path: ROUTE.ROOT,
    element: <RootLayout />,
    children: [
      { index: true, element: <RootRedirect /> },
      { path: ROUTE.STUDENT_LOGIN, element: <StudentLogin /> },
      { path: ROUTE.STUDENT_REGISTER, element: <StudentRegister /> },
      { path: ROUTE.ADMIN_LOGIN, element: <AdminLogin /> },
      {
        path: 'student',
        element: <StudentPrivateRouteHandler />,
        children: studentPrivateChildren,
      },
      {
        path: 'admin',
        element: <AdminPrivateRouteHandler />,
        children: adminPrivateChildren,
      },
      { path: '*', element: <RootRedirect /> },
    ],
  },
];

// Vite injects BASE_URL from `base` in vite.config (e.g. "/MessPortal/" on
// GitHub Pages, "/" elsewhere). React Router needs it without a trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(routes, { basename });
