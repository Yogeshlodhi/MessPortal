import { Box } from "@chakra-ui/react"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from "./Components/Sidebar";

function App() {

  // const isAuthenticated = false;
  const isAuthenticated = localStorage.getItem('StudentInfo') ? true : false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          isAuthenticated ? (
            <Box display="flex">
              <Box flex={1}>
                <Sidebar/>
              </Box>
              <Box flex={6} background="blue" maxHeight="100vh">
                <Routes>
                  <Route index element={<h1>Home</h1>} />
                  <Route path="/option1" element={<h1>Option 1 Route</h1>} />
                  <Route path="/option2" element={<h1>Option 2 Route</h1>} />
                </Routes>
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
