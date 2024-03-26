import React, { useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Register() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [roll, setRoll] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                color={'#474745'}
                            />
                        </FormControl>
                        <FormControl mt={3} isRequired>
                            <FormLabel>Student Name</FormLabel>
                            <Input type='text' color={'#474745'} borderRadius={'2rem'} placeholder='Yogesh' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Roll Number</FormLabel>
                            <Input type='text' borderRadius={'2rem'} color={'#474745'} placeholder='Kumar' value={roll} onChange={(e) => setRoll(e.target.value)} />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Contact Number</FormLabel>
                            <Input type='text' borderRadius={'2rem'} color={'#474745'} placeholder='Kumar' value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                                value={password}
                                color={'#474745'}
                                onChange={(e) => setPassword(e.target.value)}
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
                    >
                        Register
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Register
