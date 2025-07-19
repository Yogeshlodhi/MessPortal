import {
  Box, Button, Container, FormControl, FormLabel, Heading, Input,
  InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner';
import { useState, useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const [show, setShow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  });

  const { emailId, password } = formData;
  const { student, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        duration: 3000,
        status: 'error'
      });
    }
    if (isSuccess) {
      navigate('/');
    }
    dispatch(reset());
  }, [student, navigate, isError, message, isSuccess, dispatch, toast]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const SubmitHandler = async (e) => {
    if (!emailId || !password) {
      toast({
        title: 'All fields are required',
        duration: 3000,
        status: 'error'
      });
      return;
    }
    e.preventDefault();
    const loginData = {
      emailId,
      password
    };
    dispatch(login(loginData));
  };

  const changePanel = () => {
    window.location.href = 'https://adminpanel-zvp2.onrender.com/login';
  }

  if (isLoading) {
    return <Spinner message={"Logging You In..."} />
  }

  return (
    <Box display="flex" flexDirection="column" boxSizing='border-box' height={'95vh'}>
      <Box
        className="header"
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={'0rem 2rem'}
      >
        <Heading className="logo">Mess</Heading>
        <Box
          className="register-message"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={5}
        >
          <Text>Don&apos;t have an account?</Text>
          <Link to="/register" style={{ color: '#25659F' }}>Register Now</Link>
        </Box>
      </Box>
      <Box
        className="login-container"
        flex={15}
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={{ base: '1rem', md: '0' }}
      >
        <Container
          maxW="md"
          textAlign="center"
        >
          <Heading color="#25659F" mb="2rem">Welcome Back!</Heading>
          <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;
          <Box className="inputs">
            <FormControl mt={6} isRequired>
              <FormLabel>Institute Email Id</FormLabel>
              <Input
                type="email"
                borderRadius="2rem"
                placeholder="yogesh_2101cb61@iitp.ac.in"
                color="#474745"
                value={emailId}
                name="emailId"
                onChange={onChange}
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="************"
                  borderRadius="2rem"
                  color="#474745"
                  value={password}
                  name="password"
                  onChange={onChange}
                  focusBorderColor='#B5B4B4'

                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" borderRadius="2rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            
          </Box>
          <Button
            type="submit"
            width="100%"
            borderRadius="2rem"
            mt={6}
            background="#185A97"
            color="white"
            _hover={{ background: '#25659F' }}
            onClick={SubmitHandler}
          >
            {isLoading ? <Spinner size="sm" color="white" /> : "Continue"}
          </Button>

        <Box className='flex justify-center items-center gap-4 mt-4'>
          <Text>Guest User?</Text>
          <Button 
            onClick={onOpen}
          >
            Get Credentials
          </Button>
        </Box>
        <Box className='flex justify-center items-center gap-4 mt-4'>
          <Button onClick={changePanel} colorScheme='green'>
            Go To Admin Panel
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
                <Text>guest_2101cb61@iitp.ac.in</Text>
              </Box>
              <Box className='flex items-center gap-10'>
                <Heading fontSize={'large'}>Password : </Heading>
                <Text>guest123</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

export default Login;
