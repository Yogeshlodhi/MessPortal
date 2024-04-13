import { Box } from "@chakra-ui/react"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import LeaveApplication from './Pages/LeaveApplication'
import Feedback from "./Pages/Feedback";
import Menu from "./Pages/Menu";
import Announcements from "./Pages/Announcements";

function App() {
  const isAuthenticated = localStorage.getItem('StudentInfo') ? true : false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          isAuthenticated ? (
            <Box 
              display="flex" 
              maxHeight={'90vh'}
              height={'80vh'}
            >
              <Box flex={1}>
                <Sidebar />
              </Box>
              <Box 
                flex={7} 
                display={'flex'} 
                flexDirection={'column'}
                background={'green'}
                height={'100vh'}
              >
                <Header/>
                <Box 
                  overflowY={'scroll'}
                  height={'90%'}
                >
                  <Routes>
                    <Route index element={<Dashboard/>} />
                    <Route path="/apply-leave" element={<LeaveApplication/>} />
                    <Route path="/feedback" element={<Feedback/>} />
                    <Route path="/menu" element={<Menu/>} />
                    <Route path="/announcements" element={<Announcements/>} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  )
}

export default App
