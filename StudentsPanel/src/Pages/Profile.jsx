import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Container, Input, FormControl, FormLabel, useToast,
  Button, useColorModeValue, Image, VStack, Flex, Text,
  ButtonGroup,
  useMediaQuery
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateStudent, reset } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UtilFunctions from '../Utils/UtilFunctions';

const Profile = () => {

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 600px)')
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  const [randomColor, setRandomColor] = useState('');
  const [preview, setPreview] = useState(null); // State to hold the image preview URL
  useEffect(() => {
    setRandomColor(UtilFunctions.getRandomColor());
  }, []);

  const { student,
    isLoading,
    message,
    isLoadingUpdate,
    isUpdateSuccess,
    isUpdateError,
    updateMessage
  } = useSelector(state => state.auth);

  const [updateFormData, setUpdateFormData] = useState({
    emailId: student.emailId,
    studentName: student.studentName,
    studentRoll: student.studentRoll,
    number: student.number,
    bankAccount: student.bankAccount,
    ifsc: student.ifsc,
    avatar: student.avatar?.url,
  });

  const [disable, setDisable] = useState(true);

  const { emailId, studentName, studentRoll, number, bankAccount, ifsc, avatar } = updateFormData;

  const onChange = (e) => {
    setDisable(false);
    const { name, value, files } = e.target;

    // Handle file input change to generate a preview
    if (name === 'avatar' && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // Set the preview URL
      setUpdateFormData(prev => ({
        ...prev,
        avatar: file,
      }));
    } else {
      setUpdateFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('emailId', emailId);
    formData.append('studentName', studentName);
    formData.append('studentRoll', studentRoll);
    formData.append('number', number);
    formData.append('bankAccount', bankAccount);
    formData.append('ifsc', ifsc);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    dispatch(updateStudent(formData));
  };

  useEffect(() => {
    if (isUpdateError && updateMessage) {
      toast({
        title: updateMessage,
        status: 'error',
        isClosable: true,
        duration: 3000
      })
    }

    return () => {
      dispatch(reset());
    };

  }, [isUpdateError, toast, dispatch]);
  useEffect(() => {

    if (isUpdateSuccess && updateMessage) {
      toast({
        title: updateMessage,
        status: 'success',
        isClosable: true,
        duration: 3000
      })
      navigate('/')
    }

    return () => {
      dispatch(reset());
    };
  }, [isUpdateSuccess, dispatch, toast])

  if (isLoadingUpdate) {
    return <Spinner message={'Updating Your Profile....'} />;
  }

  if (isLoading) {
    return <Spinner message={'Getting Your Details....'} />;
  }

  return (
    <Box
      className='flex gap-4 flex-col'
      bg={bgColor}
      border={'2px solid  rgba(0, 0, 0, 0.05)'}
      p={4}
      borderRadius={'1rem'}
      boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    >
      <Heading>Hello ! <span style={{ color: randomColor }}>{studentName}</span></Heading>
      <Container maxW='70rem' centerContent>
        <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-6'}>
          <FormControl mt={4}>
            <FormLabel>Student Name</FormLabel>
            <Input 
              onChange={onChange} 
                focusBorderColor='#B5B4B4'
              value={studentName} name='studentName' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Student Roll No.</FormLabel>
            <Input onChange={onChange} value={studentRoll} 
                focusBorderColor='#B5B4B4'
                name='studentRoll' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Webmail Id</FormLabel>
            <Input 
                focusBorderColor='#B5B4B4'
                onChange={onChange} value={emailId} name='emailId' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input 
                focusBorderColor='#B5B4B4'
                onChange={onChange} value={number} name='number' />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Bank Account Number</FormLabel>
            <Input 
                focusBorderColor='#B5B4B4'
              onChange={onChange} 
              value={bankAccount} 
              name='bankAccount' 
              placeholder={bankAccount ? bankAccount : 'Account Number should contain 10-20 characters'}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>IFSC Code</FormLabel>
            <Input 
              onChange={onChange} 
              value={ifsc} 
              name='ifsc' 
              focusBorderColor='#B5B4B4'
              placeholder={bankAccount ? bankAccount : 'Account Number should contain minimum 10 characters'}
            />
          </FormControl>
          <Box
            border="1px dotted black"
            p={4}
            borderRadius={'1rem'}
            overflow={'hidden'}
            borderWidth={'0.1rem'}
            alignSelf={'center'}
            mt={4}
          >
            <VStack spacing={4} alignItems="center">
              <FormLabel fontSize={'2rem'} htmlFor="imageUpload">Select Image</FormLabel>
              <Flex alignItems="center" mt={6}>
                <Input
                  type="file"
                  id="imageUpload"
                  name='avatar'
                  onChange={onChange}
                  style={{ display: 'none' }}
                />
                <Box as="label" htmlFor="imageUpload" cursor="pointer">
                  <Box
                    border="1px solid #CBD5E0"
                    borderRadius="md"
                    p={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ borderColor: '#4A5568' }}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        width={150}
                        height={150}
                        alt={'Profile Preview'}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : avatar ? (
                      <Image
                        src={avatar}
                        width={150}
                        height={150}
                        alt={'Profile Image'}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : (
                      <>
                        <CloudUploadIcon />
                        <Text ml={2}>Browse Files to Upload</Text>
                      </>
                    )}
                  </Box>
                </Box>
              </Flex>
            </VStack>
          </Box>
        </Box>
        <Button
          onClick={onUpdate}
          width={isMobile ? '100%' : '30%'}
          display={'inline-block'}
          alignSelf={'center'}
          background={'teal'}
          color={'white'}
          fontSize={'1.5rem'}
          _hover={{ background: 'teal.500' }}
          isDisabled={disable}
        >
          Update Profile
        </Button>
        <ButtonGroup
          display={isMobile ? 'flex' : ''}
          justifyContent={'space-between'}
          flexDirection={isMobile ? 'column' : 'row'}
          width={'100%'}
          gap={'2rem'}
          paddingLeft={isMobile ? '0' : '25%'}
        >
        </ButtonGroup>
      </Container>
    </Box>
  );
};

export default Profile;