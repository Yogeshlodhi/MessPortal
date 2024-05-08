import { Avatar, Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, WrapItem } from '@chakra-ui/react'
import React from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const student = JSON.parse(localStorage.getItem('student'))
    const logoutStudent = () => {
        localStorage.clear();
        navigate('/login');
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
            <Popover placement='top-start'>
                <PopoverTrigger>
                    <WrapItem cursor={'pointer'}>
                        <Avatar name={student.data.studentName} src='https://bit.ly/tioluwani-kolawole' />
                    </WrapItem>
                </PopoverTrigger>
                <PopoverContent width={'12rem'}>
                    <Link to={'/profile'}>
                        <PopoverHeader display={'flex'} justifyContent={'space-between'}>
                            {student.data.studentName}
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
        </Box>
    )
}

export default Header
