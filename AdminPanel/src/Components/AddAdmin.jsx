import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Select, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import Spinner from './Spinner';
import { createAdmin } from '../Features/Auth/authSlice';

function AddAdmin() {
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
        isCreateError,
        isCreateSuccess,
        isCreateLoading,
        createMessage } = useSelector((state) => state.auth);

    const toast = useToast();
    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

    useEffect(() => {
        if (isCreateSuccess) {
            toast({
                title: createMessage,
                duration: 3000,
                isClosable: true,
                status: 'success'
            })
            setFormData({
                emailId: '',
                firstName: '',
                lastName: '',
                password: '',
                adminType: ''
            })
        }
        else if (isCreateError) {
            toast({
                title: createMessage,
                duration: 3000,
                isClosable: true,
                status: 'error'
            })
        }
    }, [dispatch, isCreateSuccess, isCreateError, createMessage])

    const onSubmit = (e) => {
        e.preventDefault();
        const adminData = {
            emailId,
            firstName,
            lastName,
            password,
            adminType,
        }

        dispatch(createAdmin(adminData));
    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    if (isCreateLoading) {
        return (
            <Spinner message={'Creating Admin..'} />
        )
    }


    return (
        <Box
            p={4}
            borderRadius={'0.5rem'}
            padding={'0.5rem'}
            border={'3px solid rgba(0, 0, 0, 0.05)'}
            boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
            bg={bgColor}
        >
            <Container
                minWidth={'fit-content'}
                textAlign={'center'}
                margin={'auto'}
            >
                {/* <Heading color={'#25659F'} textTransform={'uppercase'}>Create An Admin</Heading> */}
                <Heading color={'teal'} textTransform={'uppercase'}>Create An Admin</Heading>
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
                            type={show ? 'text' : 'password'}
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
                    background={'#005252'}
                    _hover={{ backgroundColor: 'teal' }}
                    // background={'#185A97'}
                    // _hover={{ background: '#25659F' }}
                    color={'white'}
                    onClick={onSubmit}
                >
                    Create
                </Button>
            </Container>
        </Box>
    )
}

export default AddAdmin
