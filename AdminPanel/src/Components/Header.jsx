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
    Tooltip
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../Features/Auth/authSlice';
import ThemeToggle from '../Components/ThemeToggle'

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const bgColor = useColorModeValue('brand.100', 'brand.900');
    // const textColor = useColorModeValue('gray.800', 'white');

    let { admin } = useSelector((state) => state.auth)


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


    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            height={'10%'}
            // background={'white'}
            boxShadow={'4px 2px 5px 0px rgba(0,0,0,0.35)'}
            pr={4}
            width={'80vw'}
            zIndex={100}
            gap={'1rem'}
        >
            {
                admin &&
                <Popover placement='top-start'>
                    <Tooltip label='Toggle Theme'>
                        <WrapItem cursor={'pointer'}>
                            <ThemeToggle />
                        </WrapItem>
                    </Tooltip>
                    <PopoverTrigger>
                        <WrapItem cursor={'pointer'}>
                            <Avatar name={admin.firstName} src='https://bit.ly/tioluwani-kolawole' />
                        </WrapItem>
                    </PopoverTrigger>
                    <PopoverContent width={'12rem'}>
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