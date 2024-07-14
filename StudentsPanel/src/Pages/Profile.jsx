import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Container, Input, FormControl, FormLabel, useToast,
  Button, useColorModeValue, Image, VStack, Flex, Text,
  ButtonGroup,
  useMediaQuery
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateStudent, updateImage } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Profile = () => {
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('gray.800', 'white');
  const { student, isLoading, dp } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [isMobile] = useMediaQuery('(max-width: 600px)')

  const [updateFormData, setUpdateFormData] = useState({
    emailId: student.emailId,
    studentName: student.studentName,
    studentRoll: student.studentRoll,
    number: student.number,
    bankAccount: student.bankAccount ? student.bankAccount : '',
    ifsc: student.ifsc ? student.ifsc : '',
  });

  const [profileImage, setProfileImage] = useState(dp);
  const [profile, setProfile] = useState(null);
  const [disable, setDisable] = useState(true);

  const { emailId, studentName, studentRoll, number, bankAccount, ifsc } = updateFormData;

  const onChange = (e) => {
    setDisable(false);
    setUpdateFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageChange = (e) => {
    setDisable(false);
    if (e.target.files.length > 0) {
      setProfile(e.target.files[0]);
    }
  };

  const editImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profile) {
      formData.append('image', profile);
    }
    try {
      await dispatch(updateImage(formData));
      // setDisable(true);
      toast({
        title: 'Profile Image Updated',
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }

  const onUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('studentRoll', studentRoll);
    formData.append('number', number);
    formData.append('ifsc', ifsc);
    formData.append('bankAccount', bankAccount);
    formData.append('emailId', emailId);

    try {
      console.log(formData)
      await dispatch(updateStudent(formData));
      setDisable(true);
      toast({
        title: 'Profile Updated Successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
      // navigate('/');
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (color !== '#fff') return color;
    return 'black';
  };

  const [randomColor, setRandomColor] = useState('');
  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  if (isLoading) {
    return <Spinner message={'Updating Your Profile'} />;
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
            <Input onChange={onChange} value={studentName} name='studentName' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Student Roll No.</FormLabel>
            <Input onChange={onChange} value={studentRoll} name='studentRoll' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Webmail Id</FormLabel>
            <Input onChange={onChange} value={emailId} name='emailId' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input onChange={onChange} value={number} name='number' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Bank Account Number</FormLabel>
            <Input onChange={onChange} value={bankAccount} name='bankAccount' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>IFSC Code</FormLabel>
            <Input onChange={onChange} value={ifsc} name='ifsc' />
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
              <FormLabel fontSize={'2rem'} htmlFor="imageUpload">Update Profile Image</FormLabel>
              <Flex alignItems="center" mt={6}>
                <Input
                  type="file"
                  id="imageUpload"
                  name='profile'
                  onChange={onImageChange}
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
                    {profile ? (
                      <Image
                        src={URL.createObjectURL(profile)}
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
          <Box alignSelf={'center'} justifySelf={'center'}>
            {profileImage ? (
              <Image
                src={profileImage}
                width={150}
                height={150}
                alt={'Profile Image'}
                style={{ objectFit: 'contain', borderRadius: '0.5rem', marginTop: '2rem' }}
              />
            ) : (
              <>
              </>
            )
            }
          </Box>
        </Box>
        <ButtonGroup 
          display={isMobile ? 'flex' : ''}
          // alignSelf={'center'} 
          justifyContent={'space-between'} 
          // background={'red'}
          flexDirection={isMobile ? 'column' : 'row'}
          width={'100%'} 
          gap={'2rem'}
          paddingLeft={isMobile ? '0' : '25%'}
        >
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
          <Button
            onClick={editImage}
            width={isMobile ? '100%' : '30%'}
            display={'inline-block'}
            alignSelf={'center'}
            background={'teal'}
            color={'white'}
            fontSize={'1.5rem'}
            _hover={{ background: 'teal.500' }}
          >
            Update Image
          </Button>
        </ButtonGroup>
      </Container>
    </Box>
  );
};

export default Profile;




