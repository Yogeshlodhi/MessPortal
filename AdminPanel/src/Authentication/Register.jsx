import React from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, MenuOptionGroup, Select, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Register() {
  return (
    <Box display={'flex'} flexDirection={'column'} boxSizing='border-box' height={'95vh'}>
    <Box
        className="header"
        flex={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'0rem 2rem'}
    >
        <Heading className="logo">Mess</Heading>
        <Box
            className="register-message"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={5}
        >
            <Text>Already Registered?</Text>
            <Box color='#25659F'>
                <Link to='/login'>Sign In Now</Link>
            </Box>
        </Box>
    </Box>
    <Box
        className="login-container"
        flex={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Container
            minWidth={'fit-content'}
            textAlign={'center'}
            margin={'auto'}
        >
            <Heading color={'#25659F'}>Create Your Account</Heading>
            <Text mt={2}>Enter Your Credentials To Proceed</Text>
            <Box className="inputs">
                <FormControl mt={3} isRequired>
                    <FormLabel>Email Id</FormLabel>
                    <Input
                        type='email'
                        borderRadius={'2rem'}
                        placeholder='yogeshlodhi1208@gmail.com'
                    />
                </FormControl>
                <FormControl mt={3} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type='text' borderRadius={'2rem'} placeholder='Yogesh' />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Last Name</FormLabel>
                    <Input type='text' borderRadius={'2rem'} placeholder='Kumar' />
                </FormControl>
                <FormControl mt={3} isRequired>
                    <FormLabel>Admin Type</FormLabel>
                    <Select 
                      icon={<ArrowDropDownIcon />} 
                      variant={'filled'} 
                      placeholder='Select Type' 
                      borderRadius={'2rem'}
                    >
                      <option>Warden</option>
                      <option>Mess Secretary</option>
                      <option>Mess Owner</option>
                      <option>Other</option>
                    </Select>
                </FormControl>
                <FormControl mt={3} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' borderRadius={'2rem'} placeholder='*************' />
                </FormControl>
            </Box>
            <Button 
                display={'inline-block'}
                width={'100%'} 
                borderRadius={'2rem'} 
                mt={6}
                background={'#185A97'}
                color={'white'}
                _hover={{background: '#25659F'}}
            >
                Register 
            </Button>
        </Container>
    </Box>
</Box>
  )
}

export default Register
