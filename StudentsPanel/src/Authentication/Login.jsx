import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, Spinner, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../Slices/studentsApiSlice'
import { setCredentials } from '../Slices/authSlice';

function Login() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

    const { StudentInfo } = useSelector((state) => state.auth);

    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(StudentInfo){
            navigate('/');
        }
    },[navigate, StudentInfo])

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ emailId, password });
            const redirectedData = response.data.data;
            if (redirectedData) {
                dispatch(setCredentials(redirectedData));
                navigate('/dashboard');
            } else {
                console.log('Redirected response data is missing or incomplete.');
            }
        } catch (error) {
            console.log(error?.data?.message || error?.error);
        }
    }
    
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
                    <Heading color={'#25659F'} mb={'2rem'}>Welcome Back!</Heading>
                    <Box className="inputs">
                        <FormControl mt={6} isRequired>
                            <FormLabel>Institute Email Id</FormLabel>
                            <Input
                                type='email'
                                borderRadius={'2rem'}
                                placeholder='yogesh_2101cb61@iitp.ac.in'
                                color={'#474745'}
                                value={emailId}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={3} isRequired>
                            <FormLabel>Password</FormLabel>
                        </FormControl>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='************'
                                borderRadius={'2rem'}
                                color={'#474745'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' borderRadius={'2rem'} size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Box
                            textAlign={'left'} mt={2}
                            _hover={{ color: 'red' }}
                            transition={'0.3s ease-in'}
                        >
                            <Link
                                to={'#'}
                            >Forgot Password</Link>
                        </Box>
                    </Box>
                    <Button
                        display={'inline-block'}
                        width={'100%'}
                        borderRadius={'2rem'}
                        mt={6}
                        background={'#185A97'}
                        color={'white'}
                        _hover={{ background: '#25659F' }}
                        onClick={SubmitHandler}
                    >
                        {isLoading ? <Spinner size="sm" color="white" /> : "Continue"}
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Login
