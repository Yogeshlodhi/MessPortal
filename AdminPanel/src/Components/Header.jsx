import {
    Avatar,
    Box,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    WrapItem,
    useColorModeValue,
    Tooltip,
    useMediaQuery,
    Drawer, 
    DrawerBody, 
    DrawerHeader, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    Button,
    
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../Features/Auth/authSlice';
import ThemeToggle from '../Components/ThemeToggle'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Sidebar from './Sidebar';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobile] = useMediaQuery('(max-width: 600px)');
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
    const closeDrawer = () => setDrawerOpen(false);

    const { admin } = useSelector((state) => state.auth)


    const logoutUser = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    }

    useEffect(() => {
        if (!admin) {
            navigate('/login')
        }
    }, [navigate, admin])


    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.primaryBg');
    const boxShadow = useColorModeValue('4px 2px 5px 0px rgba(0,0,0,0.35)', '4px 0px 5px 0px #636368');

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={isMobile ? 'space-between' : 'flex-end'}
            height={'10%'}
            boxShadow={boxShadow}
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
                            <MenuIcon fontSize='large'/>
                        </Button>
                        <Drawer isOpen={isDrawerOpen} placement="top" onClose={toggleDrawer}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton marginTop={4} size={'lg'} />
                                <DrawerBody bg={bgColor}>
                                    <Sidebar onClose={closeDrawer}/>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : (
                    <>
                    </>
                )
            }
            {
                admin &&
                <Popover placement='top-start'>
                    <Tooltip label='Toggle Theme'>
                        <WrapItem cursor={'pointer'} visibility={isMobile ? 'hidden' : 'visible'}>
                            <ThemeToggle />
                        </WrapItem>
                    </Tooltip>
                    <PopoverTrigger>
                        <WrapItem cursor={'pointer'}>
                            <Avatar name={admin.firstName} src='https://bit.ly/tioluwani-kolawole' />
                        </WrapItem>
                    </PopoverTrigger>
                    <PopoverContent width={'12rem'}  bg={bgColor}>
                        {/* <Link to={'/profile'}> */}
                        <PopoverHeader display={'flex'} justifyContent={'space-between'}>
                            {admin.firstName}  {' '}
                            {admin.lastName}
                            <KeyboardTabIcon />
                        </PopoverHeader>
                        {/* </Link> */}
                        <PopoverArrow />
                        <Box>
                            <Link to={'/login'}>
                                <PopoverFooter display={'flex'} justifyContent={'space-between'}
                                    onClick={logoutUser}
                                >
                                    Log Out
                                    <ExitToAppIcon />
                                </PopoverFooter>
                            </Link>
                        </Box>
                    </PopoverContent>
                </Popover>
            }

        </Box>
    )
}

export default Header