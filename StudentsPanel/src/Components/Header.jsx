import { Avatar, Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Spinner, WrapItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../Features/Auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {student, isLoading} = useSelector((state) => state.auth)

    const logoutStudent = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    }
    
    useEffect(() => {
        if(!student){
            navigate('/login')
        }
    }, [navigate, student])

    if(isLoading){
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
            backgroundColor={'#E4e4e4'}
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
                            <KeyboardTabIcon/>
                        </PopoverHeader>
                    </Link>
                    <PopoverArrow />
                    <Box>
                        <Link to={'/login'}>
                        <PopoverBody display={'flex'} justifyContent={'space-between'} onClick={logoutStudent}>
                            Log Out
                            <ExitToAppIcon />
                        </PopoverBody>
                        </Link>
                    </Box>
                </PopoverContent>
            </Popover>
           }
            
        </Box>
    )
}

export default Header
