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
import { Box, useMediaQuery } from '@chakra-ui/react';

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
    height={'90vh'}
  >
    <Box flex={2}>
      <Sidebar />
    </Box>
    <Box
      flex={7}
      display={'flex'}
      flexDirection={'column'}
      height={'100vh'}
      // background={'blue'}
      width={'80vw'}
      >
      <Header />
      <Box
        overflow={'scroll'}
        height={'90%'}
        // height={'100vh'}
        padding={'1rem'}
        // overflowX={'hidden'}
        paddingTop={'2rem'}
        // background={'red'}
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


// import { Avatar, Box, Button, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Spinner, Tooltip, WrapItem, useColorModeValue } from '@chakra-ui/react'
// import React, { useEffect } from 'react'
// import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, reset } from '../Features/Auth/authSlice';
// import ThemeToggle from './ThemeToggle';

// function Header() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // const bgColor = useColorModeValue('brand.100', 'brand.900');
//     // const textColor = useColorModeValue('gray.800', 'white');

//     const { student, dp } = useSelector((state) => state.auth)
//     // const { student } = useSelector((state) => state.auth)


//     const logoutStudent = () => {
//         dispatch(logout());
//         dispatch(reset());
//         navigate('/login');
//     }

//     useEffect(() => {
//         if (!student) {
//             navigate('/login')
//         }
//     }, [navigate, student])

//     return (
//         <Box
//             display={'flex'}
//             alignItems={'center'}
//             justifyContent={'flex-end'}
//             height={'10%'}
//             boxShadow={'4px 2px 5px 0px rgba(0,0,0,0.35)'}
//             pr={4}
//             width={'100%'}
//             zIndex={100}
//             gap={'1rem'}
//         >
//             {student &&
//                 <Popover placement='top-start'>
//                     {/* <ThemeToggle /> */}
//                     <Tooltip label='Toggle Theme'>
//                         <WrapItem cursor={'pointer'}>
//                             <ThemeToggle />
//                         </WrapItem>
//                     </Tooltip>
//                     <PopoverTrigger>
//                         <WrapItem cursor={'pointer'}>
//                             <Avatar 
//                                 name={student.studentName} 
//                                 src={dp ? dp : student.studentName}
//                                 // src={student.profileImage ? student.profileImage : student.studentName}
//                                 />
//                                 {/* {console.log(student.profileImage)} */}
//                         </WrapItem>
//                     </PopoverTrigger>
//                     <PopoverContent width={'12rem'}>
//                         <Link to={'/profile'}>
//                             <PopoverHeader display={'flex'} justifyContent={'space-between'}>
//                                 {student.studentName}
//                                 <KeyboardTabIcon />
//                             </PopoverHeader>
//                         </Link>
//                         <PopoverArrow />
//                         <Box>
//                             <Link to={'/login'}>
//                                 <PopoverFooter display={'flex'} justifyContent={'space-between'} onClick={logoutStudent}>
//                                     Log Out
//                                     <ExitToAppIcon />
//                                 </PopoverFooter>
//                             </Link>
//                         </Box>
//                     </PopoverContent>
//                 </Popover>
//             }

//         </Box>
//     )
// }

// export default Header


<Tbody>
{announcements && announcementList?.map((row, id) => (
              <React.Fragment key={id}>
                <Tr onClick={() => toggleRow(id)} cursor={'pointer'}>
                  <Td>{row.heading}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
                </Tr>
                <Tr>
                  <Td colSpan={2} style={{ overflowX: 'hidden' }}>
                    <Collapse in={openRowId === id} width={'100%'} animateOpacity>
                      <Box p='4' bg='teal.500' rounded='md' shadow='md' color='white' whiteSpace={'normal'}>
                        {row.description}
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>