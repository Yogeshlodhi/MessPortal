import React from 'react'
import { useLoginMutation } from '../Slices/adminsApiSlice';
import { setCredentials } from '../Slices/authSlice';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Login() {
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
                    <Text>Don't have an account?</Text>
                    <Box color='#25659F'>
                        <Link to='/register'>Register Now</Link>
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
                    <Heading color={'#25659F'}>Welcome Back</Heading>
                    <Text mt={2}>Enter Your Credentials To Proceed</Text>
                    <Box className="inputs">
                        <FormControl mt={6} isRequired>
                            <FormLabel>Email Id</FormLabel>
                            <Input
                                type='email'
                                borderRadius={'2rem'}
                                placeholder='yogesh_2101cb61@iitp.ac.in'
                            />
                        </FormControl>
                        <FormControl mt={6} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' borderRadius={'2rem'} placeholder='************' />
                        </FormControl>
                        <Box textAlign={'left'} mt={2}>
                            <Link to={'#'}>Forgot Password</Link>
                        </Box>
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
                        Continue
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Login
