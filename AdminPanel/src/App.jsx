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


function App() {
  const isAuthenticated = useSelector((state) => state.auth);
  // console.log(isAuthenticated)

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

const AuthenticatedRoutes = () => (
  <Box
    maxHeight={'90vh'}
    height={'80vh'}
    display={'flex'}
  >
    <Box flex={2}>
      <Sidebar />
    </Box>
    <Box flex={8}>
      <Header />
      <Box padding={'1rem'} paddingTop={'2rem'}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/announcements' element={<Announcements />} />
          <Route path='/complaints' element={<Complaints />} />
          <Route path='/feedbacks' element={<Feedbacks />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/leaves' element={<MessLeaves />} />
          <Route path='/students' element={<Students />} />
        </Routes>
      </Box>
    </Box>
  </Box>
)

export default App;
