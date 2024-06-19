import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [formdata, setFormData] = useState({
        emailId: '',
        password: ''
    })

    const { emailId, password } = formdata;
    const { admin, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

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
        }
        dispatch(reset());
    }, [admin, navigate, isError, message, isSuccess, dispatch])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const loginData = {
            emailId,
            password
        }
        dispatch(login(loginData));
    }

    if (isLoading) {
        return <Spinner message={'Please Wait While We Log You In...'} />
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
                                value={emailId}
                                name='emailId'
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl mt={6} isRequired>
                            <FormLabel>Password</FormLabel>
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
                        _hover={{ background: '#25659F' }}
                        onClick={submitHandler}
                    >
                        Continue
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Login
