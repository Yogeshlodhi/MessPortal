import { Avatar, Box, Button, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Spinner, WrapItem, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../Features/Auth/authSlice';
import ThemeToggle from './ThemeToggle';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const bgColor = useColorModeValue('brand.100', 'brand.900');
    const textColor = useColorModeValue('gray.800', 'white');

    const { student, isLoading } = useSelector((state) => state.auth)

    const logoutStudent = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    }

    useEffect(() => {
        if (!student) {
            navigate('/login')
        }
    }, [navigate, student])

    if (isLoading) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        )
    }

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            height={'10%'}
            background={'white'}
            width={'100%'}
            pr={4}
            bg={bgColor} 
            color={textColor}
            // backgroundColor={'#E4e4e4'}
        >
            {student &&
                <Popover placement='top-start'>
                    <PopoverTrigger>
                        <WrapItem cursor={'pointer'}>
                            <Avatar name={student.studentName} src='https://bit.ly/tioluwani-kolawole' />
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
                            {/* <PopoverBody>
                                <ThemeToggle/>
                            </PopoverBody> */}
                            <Link to={'/login'}>
                                <PopoverFooter display={'flex'} justifyContent={'space-between'} onClick={logoutStudent}>
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
