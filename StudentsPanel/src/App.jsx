import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Dashboard from './Pages/Dashboard';
import LeaveApplication from './Pages/LeaveApplication';
import Feedback from './Pages/Feedback';
import Menu from './Pages/Menu';
import Announcements from './Pages/Announcements';
import Profile from './Pages/Profile';
import Complaints from './Pages/Complaints';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Payments from './Pages/Payments'
import { Box } from '@chakra-ui/react';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={isAuthenticated ? <AuthenticatedRoutes /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

const AuthenticatedRoutes = () => (
  <Box
    display="flex"
    maxHeight={'90vh'}
    height={'80vh'}
  >
    <Box flex={1.5}>
      <Sidebar />
    </Box>
    <Box
      flex={6.5}
      display={'flex'}
      flexDirection={'column'}
      height={'100vh'}
      overflowX={'hidden'}
    >
      <Header />
      <Box
        overflowY={'scroll'}
        height={'90%'}
        padding={'2rem'}
      >
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/apply-leave" element={<LeaveApplication />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </Box>
    </Box>
  </Box>
);

export default App;
