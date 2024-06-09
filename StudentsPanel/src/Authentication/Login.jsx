import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../Features/Auth/authSlice';
import { InfinitySpin } from 'react-loader-spinner'
import Spinner from '../Components/Spinner';


function Login() {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const toast = useToast();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        emailId: '',
        password: ''
    })

    const { emailId, password } = formData;

    const { student, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isError) {
            toast({
                title: message,
                duration: 3000,
                status: 'error'
            })
        }
        if (isSuccess) {
            navigate('/')
            // if (isSuccess) {
            //     toast({
            //         title: 'Successfully Logged In',
            //         duration: 3000,
            //         status: 'success',
            //         position: 'top',
            //         isClosable: true
            //     })
            // }
        }
        dispatch(reset());
    }, [student, navigate, isError, message, isSuccess, dispatch])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const loginData = {
            emailId,
            password
        }
        dispatch(login(loginData))
    }

    if (isLoading) {
        return (
            <Spinner message={"Logging You In....."}/>
        );
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
                                name='emailId'
                                onChange={onChange}
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
                                name='password'
                                onChange={onChange}
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
                        {/* Submit */}
                        {isLoading ? <Spinner size="sm" color="white" /> : "Continue"}
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Login
