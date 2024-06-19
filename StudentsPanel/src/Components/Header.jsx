import { Avatar, 
    Box, 
    Popover, 
    PopoverArrow, 
    PopoverBody, 
    PopoverContent, 
    PopoverFooter, 
    PopoverHeader, 
    PopoverTrigger, 
    Tooltip, 
    WrapItem, 
    useColorModeValue, 
    useMediaQuery, 
    Drawer, 
    DrawerBody, 
    DrawerHeader, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../Features/Auth/authSlice';
import ThemeToggle from './ThemeToggle';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobile] = useMediaQuery('(max-width: 600px)');
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

    const { student, dp } = useSelector((state) => state.auth);

    const logoutStudent = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    useEffect(() => {
        if (!student) {
            navigate('/login');
        }
    }, [navigate, student]);

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={isMobile ? 'space-between' : 'flex-end'}
            height={'10%'}
            boxShadow={'4px 2px 5px 0px rgba(0,0,0,0.35)'}
            pr={4}
            width={'100%'}
            zIndex={100}
            gap={'1rem'}
        >
            {
                isMobile ? (
                    <>
                        <Button 
                            onClick={toggleDrawer} 
                            ml={4}
                            zIndex="1000"
                        >
                            <MenuIcon />
                        </Button>
                        <Drawer isOpen={isDrawerOpen} placement="left" onClose={toggleDrawer}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton marginTop={4} size={'lg'}/>
                                <DrawerBody>
                                    <Sidebar />
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : (
                    <>
                    </>
                )
            }
            {student && (
                <Popover placement='top-start'>
                    <Tooltip label='Toggle Theme'>
                        <WrapItem cursor={'pointer'} visibility={isMobile ? 'hidden' : 'visible'}>
                            <ThemeToggle />
                        </WrapItem>
                    </Tooltip>
                    <PopoverTrigger>
                        <WrapItem cursor={'pointer'}>
                            <Avatar
                                name={student.studentName}
                                src={dp ? dp : student.studentName}
                            />
                        </WrapItem>
                    </PopoverTrigger>
                    <PopoverContent width={'12rem'}>
                        <Link to={'/profile'}>
                            <PopoverHeader display={'flex'} justifyContent={'space-between'}>
                                {student.studentName}
                                <KeyboardTabIcon />
                            </PopoverHeader>
                        </Link>
                        <PopoverArrow />
                        <Box>
                            <Link to={'/login'}>
                                <PopoverFooter display={'flex'} justifyContent={'space-between'} onClick={logoutStudent}>
                                    Log Out
                                    <ExitToAppIcon />
                                </PopoverFooter>
                            </Link>
                        </Box>
                    </PopoverContent>
                </Popover>
            )}
        </Box>
    );
}

export default Header;
