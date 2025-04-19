import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
    const textColor = useColorModeValue('gray.800', 'white');

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
    }, [admin, dispatch, navigate, isSuccess, isError, message, toast])

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

    const changePanel = () => {
        window.location.href = 'https://studentspanel.onrender.com/login';
    }

    if (isLoading) {
        return <Spinner message={'Please Wait, Logging You In...'} />
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
                        {/* <Box textAlign={'left'} mt={2}>
                            <Link to={'#'}>Forgot Password</Link>
                        </Box> */}
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
                    <Box className='flex justify-center items-center gap-4 mt-4'>
                        <Text>Guest Admin?</Text>
                        <Button
                            onClick={onOpen}
                        >
                            Get Credentials
                        </Button>
                    </Box>
                    <Box className='flex justify-center items-center gap-4 mt-4'>
                        <Button onClick={changePanel} colorScheme='green'>
                            Go to Students Panel
                        </Button>
                    </Box>
                </Container>
                <Modal
                    isOpen={isOpen} onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent
                        marginLeft={'0.5rem'}
                        marginRight={'0.5rem'}
                        alignSelf={'center'}
                        bg={bgColor}
                        color={textColor}
                    >
                        <ModalHeader>Guest User Credentials</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody padding={4}>
                            <Box className='flex items-center gap-10'>
                                <Heading fontSize={'large'}>Email ID : </Heading>
                                <Text>secretary@gmail.com</Text>
                            </Box>
                            <Box className='flex items-center gap-10'>
                                <Heading fontSize={'large'}>Password : </Heading>
                                <Text>secretary123</Text>
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    )
}

export default Login
