import React from 'react';
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Components/Sidebar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';


function App() {
  const isAuthenticated = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Box display="flex">
                <Sidebar />
                <Box flex={6} background="blue" maxHeight="100vh" overflowY="scroll">
                  <Routes>
                    <Route index element={<h1>Home</h1>} />
                    {/* <Route path="/option1" element={<Options1 />} /> */}
                    <Route path="/option2" element={<h1>Option 2 Route</h1>} />
                  </Routes>
                </Box>
              </Box>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
