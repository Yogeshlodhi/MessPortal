import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../Features/Auth/authSlice';

function Register() {

    // const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    // const [roll, setRoll] = useState('');
    // const [phone, setPhone] = useState('');
    // const [password, setPassword] = useState('');
    
    const [formData, setFormData] = useState({
        studentName: '',
        emailId: '',
        studentRoll: '',
        number: '',
        password: '',
    })

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {studentName, emailId, studentRoll, number, password} = formData;
    const {student, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    const toast = useToast();

    useEffect(() => {
        if(isError){
            toast(
                {
                duration: '3000',
                status: 'error'
                }
            )
        }
        
        if(isSuccess || student){
            navigate('/')
        }

        dispatch(reset());
    },[student, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    
    if(isLoading){
        return <h1>Loading....</h1>
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const studentData = {
            studentName,
            emailId,
            studentRoll,
            number,
            password
        }

        dispatch(register(studentData))
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
                    <Heading color={'#25659F'} mb={'2rem'}>Create Your Account</Heading>
                    <Box className="inputs">
                        <FormControl mt={3} isRequired>
                            <FormLabel>Institute Email Id</FormLabel>
                            <Input
                                type='email'
                                borderRadius={'2rem'}
                                placeholder='yogeshlodhi1208@gmail.com'
                                id='email'
                                name='emailId'
                                value={emailId}
                                onChange={onChange}
                                color={'#474745'}
                            />
                        </FormControl>
                        <FormControl mt={3} isRequired>
                            <FormLabel>Student Name</FormLabel>
                            <Input 
                                type='text' 
                                color={'#474745'} 
                                borderRadius={'2rem'} 
                                placeholder='Yogesh' 
                                id='name'
                                name='studentName'
                                value={studentName}
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Roll Number</FormLabel>
                            <Input 
                                type='text' 
                                borderRadius={'2rem'} 
                                color={'#474745'} 
                                placeholder='Kumar' 
                                id='roll'
                                name='studentRoll'
                                value={studentRoll}
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Contact Number</FormLabel>
                            <Input 
                                type='text' 
                                borderRadius={'2rem'} 
                                color={'#474745'} 
                                placeholder='Kumar' 
                                id='phone'
                                name='number'
                                value={number}
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
                                id='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' borderRadius={'2rem'} size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Button
                        display={'inline-block'}
                        width={'100%'}
                        borderRadius={'2rem'}
                        mt={6}
                        background={'#185A97'}
                        color={'white'}
                        _hover={{ background: '#25659F' }}
                        onClick={onSubmit}
                    >
                        Register
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Register
