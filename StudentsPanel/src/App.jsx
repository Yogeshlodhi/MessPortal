import { Box } from "@chakra-ui/react"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";

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
            <Box display="flex" >
              <Box flex={1} >
              {/* <Box flex={1} background={'red'} maxHeight={'100vh'}> */}
                <Sidebar />
              </Box>
              <Box flex={7}>
                <Header/>
                <Box background="blue" maxHeight="100vh">
                  <Routes>
                    <Route index element={<Dashboard/>} />
                    <Route path="/option2" element={<h1>Option 2 Route</h1>} />
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
