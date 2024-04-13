import { Avatar, Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, WrapItem } from '@chakra-ui/react'
import React from 'react'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Box 
            display={'flex'} 
            alignItems={'center'} 
            justifyContent={'flex-end'} 
            height={'10%'}
            background={'white'}
            width={'100%'}
            pr={4}
        >
            <Popover placement='top-start'>
                <PopoverTrigger>
                    <WrapItem cursor={'pointer'}>
                        <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
                    </WrapItem>
                </PopoverTrigger>
                <PopoverContent width={'12rem'}>
                    <Link to={'/profile'}>
                        <PopoverHeader display={'flex'} justifyContent={'space-between'}>
                            Yogesh Kumar
                            <KeyboardTabIcon/>
                        </PopoverHeader>
                    </Link>
                    <PopoverArrow />
                    <Box>
                        <PopoverBody display={'flex'} justifyContent={'space-between'}>
                            Log Out
                            <ExitToAppIcon />
                        </PopoverBody>
                    </Box>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default Header
