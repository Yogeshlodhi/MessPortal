import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Components/Sidebar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Header from './Components/Header';
import Dashboard from './Pages/Dashboard';
import Announcements from './Pages/Announcements';
import Complaints from './Pages/Complaints';
import Feedbacks from './Pages/Feedbacks';
import Menu from './Pages/Menu';
import MessLeaves from './Pages/MessLeaves';
import Students from './Pages/Students';
import Profile from './Pages/Profile';
import { useMediaQuery } from '@chakra-ui/react';
import MessInfo from './Pages/MessInfo';
import AddAdmin from './Components/AddAdmin';


function App() {
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
}

const AuthenticatedRoutes = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  return (
    <Box
      display={'flex'}
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
            <Route path='/' element={<Dashboard />} />
            <Route path='/announcements' element={<Announcements />} />
            <Route path='/complaints' element={<Complaints />} />
            <Route path='/feedbacks' element={<Feedbacks />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/leaves' element={<MessLeaves />} />
            <Route path='/students' element={<Students />} />
            <Route path='/messinfo' element={<MessInfo/>}/>
            <Route path='/admincreate' element={<AddAdmin />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default App;
