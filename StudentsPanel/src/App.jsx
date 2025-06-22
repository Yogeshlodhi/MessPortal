import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Payments from './Pages/Payments';
import { Box, useMediaQuery, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useColorModeValue, useToast } from '@chakra-ui/react';
import MessInfo from './Pages/MessInfo';
import Spinner from './Components/Spinner';
import { reset } from './Features/Auth/authSlice';


const App = () => {
  const { student } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={student ? <AuthenticatedRoutes /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

const AuthenticatedRoutes = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      display="flex"
      maxHeight={'90vh'}
      height={'90vh'}
    >
      {
        !isMobile ? (
          <Box flex={2}>
            <Sidebar />
          </Box>
        ) : (
          <></>
        )
      }

      <Box
        display={'flex'}
        flexDirection={'column'}
        height={'100vh'}
        width={isMobile ? '100vw' : '80vw'}
      >
        <Header />
        <Box
          overflow={'scroll'}
          height={'100%'}
          padding={isMobile ? '1rem' : '1rem'}
          paddingTop={isMobile ? '1rem' : '2rem'}
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
            <Route path="/messinfo" element={<MessInfo />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
