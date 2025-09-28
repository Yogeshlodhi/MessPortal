import { createBrowserRouter } from "react-router-dom";
import StudentsLayout from "../Students/Layout";
import NotFound from "../Common/NotFound";
import LandingPage from "../Common/LandingPage";
import UserLogin from '../Common/Auth/Login';
import UserSignup from '../Common/Auth/Signup';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // welcome screen,
  },
  {
    path: "/students",
    element: <StudentsLayout />,
    children: [
      //   { path: "dashboard", element: <StudentDashboard /> },
      //   { path: "leave-application", element: <StudentDashboard /> },
      //   { path: "daily-feedback", element: <StudentDashboard /> },
      //   { path: "menu", element: <Meals /> },
      //   { path: "announcements", element: <Payments /> },
      //   { path: "complaints", element: <Payments /> },
      //   { path: "about-mess", element: <Payments /> },
    ],
  },
  {
    path: "/student/login",
    element: <UserLogin userType='student'/>,
  },
  {
    path: "/student/signup",
    element: <UserSignup userType='students'/>,
  },
  //   {
  //     path: "/admin",
  //     element: <AdminLayout />,
  //     children: [
  //   { path: "dashboard", element: <AdminDashboard /> },
  //   { path: "leaves", element: <ManageStudents /> },
  //   { path: "feedbacks-and-suggestions", element: <ManageStudents /> },
  //   { path: "menu", element: <ManageStudents /> },
  //   { path: "announcements", element: <ManageStudents /> },
  //   { path: "complaints", element: <Reports /> },
  //   { path: "students-information", element: <Reports /> },
  //   { path: "about-mess", element: <Reports /> },
  //   { path: "add-admin", element: <Reports /> },
  // ],
  //   },
   {
    path: "/admin/login",
    element: <UserLogin userType='admin'/>,
  },
  {
    path: "/admin/signup",
    element: <UserSignup userType='admin'/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
