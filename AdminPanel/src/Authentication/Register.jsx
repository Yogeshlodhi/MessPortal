import React, { useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, MenuOptionGroup, Select, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import Spinner from '../Components/Spinner';
// import { register } from '../Features/Auth/authSlice';

function Register() {
    const [formData, setFormData] = useState({
        emailId: '',
        firstName: '',
        lastName: '',
        password: '',
        adminType: ''
    })
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { emailId, firstName, lastName, password, adminType } = formData;
    const {
        admin,
        isError,
        isSuccess,
        isLoading,
        message } = useSelector((state) => state.auth);

    const toast = useToast();

    const onSubmit = (e) => {
        e.preventDefault();
        const adminData = {
            emailId,
            firstName,
            lastName,
            password,
            adminType,
        }

        // dispatch(register(adminData));
    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    if (isLoading) {
        return (
            <Spinner message={'Creating Admin..'} />
        )
    }


    return (
        <Box display={'flex'} flexDirection={'column'} boxSizing='border-box' height={'95vh'}>
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
                    <Heading color={'#25659F'}>Create An Admin</Heading>
                    <Box className="inputs">
                        <FormControl mt={3} isRequired>
                            <FormLabel>Email Id</FormLabel>
                            <Input
                                type='email'
                                borderRadius={'2rem'}
                                placeholder='yogeshlodhi1208@gmail.com'
                                value={emailId}
                                name='emailId'
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl mt={3} isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type='text'
                                borderRadius={'2rem'}
                                placeholder='Yogesh'
                                value={firstName}
                                name='firstName'
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type='text'
                                borderRadius={'2rem'}
                                placeholder='Kumar'
                                value={lastName}
                                name='lastName'
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl mt={3} isRequired>
                            <FormLabel>Admin Type</FormLabel>
                            <Select
                                icon={<ArrowDropDownIcon />}
                                variant={'filled'}
                                placeholder='Select Type'
                                borderRadius={'2rem'}
                                name='adminType'
                                value={adminType}
                                onChange={onChange}
                            >
                                <option>Warden</option>
                                <option>Mess Secretary</option>
                                <option>Mess Owner</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={3} isRequired>
                            <FormLabel>Password</FormLabel>
                        </FormControl>
                        <InputGroup size={'md'}>
                            <Input
                                type='password'
                                borderRadius={'2rem'}
                                placeholder='*************'
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' borderRadius={'2rem'} size='sm' onClick={handleShow}>
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
                        Create
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Register
