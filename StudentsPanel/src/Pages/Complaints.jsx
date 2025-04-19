import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Flex,
  Image,
  Text,
  Container,
  useToast,
  useMediaQuery,
  useColorModeValue,
} from '@chakra-ui/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { postComplaint, reset } from '../Features/Mess/messSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner'


const Complaint = () => {
  const dispatch = useDispatch();
  const toast = useToast()
  const navigate = useNavigate();

  const { isPostingComplaint, complaintMessage, isComplaintError, isComplaintSuccess } = useSelector(state => state.mess)

  const [complaint, setComplaint] = useState({
    complaintAbout: '',
    description: '',
    attachment: null
  });

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  const { complaintAbout, description, attachment } = complaint;

  const handleChange = (e) => {
    setComplaint((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('complaintAbout', complaintAbout);
    formData.append('description', description);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    dispatch(postComplaint(formData))
  };
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (isComplaintError && complaintMessage) {
      toast({
        title: complaintMessage,
        duration: 3000,
        status: 'error',
        isClosable: true
      })
    }
    return () => {
      dispatch(reset());
    }
  }, [isComplaintError, toast, dispatch])

  useEffect(() => {
    if (isComplaintSuccess && complaintMessage) {
      toast({
        title: complaintMessage,
        duration: 3000,
        status: 'success',
        isClosable: true
      })
      navigate('/')
    }
    return () => {
      dispatch(reset());
    }
  }, [isComplaintSuccess, toast, dispatch])

  if (isPostingComplaint) {
    return <Spinner message={'Submitting Your Complaint...'} />
  }

  return (
    <Box
      // p={6}
      borderRadius={'1rem'}
      padding={'1rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
    // height={'100%'}
    >
      <Heading
        mb={6}
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >
        Submit Complaint
      </Heading>
      <Box gap={'1rem'} display={'flex'} flexDirection={'column'}>
        <FormControl isRequired>
          <FormLabel>Complaint About</FormLabel>
          <Input
            type="text"
            name="complaintAbout"
            value={complaint.complaintAbout}
            onChange={handleChange}
            placeholder="Enter the issue you want to complain about"
            required
            focusBorderColor='#B5B4B4'
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={complaint.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            required
            focusBorderColor='#B5B4B4'
          />
        </FormControl>
        <Box
          border="1px dotted black"
          p={4}
          borderRadius={'1rem'}
          height={'50% '}
          // mt={6} 
          overflow={'hidden'}
          borderWidth={'0.1rem'}
          width={isMobile ? '100%' : '50%'}
          alignSelf={'center'}
        >
          <VStack spacing={4} alignItems="center" >
            <FormLabel fontSize={'2rem'} mt={6} htmlFor="imageUpload">Upload Image</FormLabel>
            <Flex alignItems="center" mt={6}>
              <Input
                type="file"
                id="imageUpload"
                name='attachment'
                onChange={(e) => {
                  setComplaint((prev) => ({
                    ...prev,
                    attachment: e.target.files[0]
                  }))
                }}
                style={{ display: 'none' }}
              />
              <Box
                as="label"
                htmlFor="imageUpload"
                cursor="pointer"
              >
                <Box
                  border="1px solid #CBD5E0"
                  borderRadius="md"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ borderColor: '#4A5568' }}
                >
                  {attachment ? (
                    <Image
                      src={URL.createObjectURL(attachment)}
                      width={'100%'}
                      height={'100%'}
                      alt={'Complaint Image'}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
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
        <Button
          type="submit"
          // colorScheme="teal"
          width={isMobile ? '100%' : '50%'}
          alignSelf={'center'}
          onClick={handleSubmit}
          color={'white'}
          background={'#005252'}
          _hover={{ backgroundColor: 'teal' }}
        >
          Submit Complaint
        </Button>
      </Box>
    </Box>
  );
};

export default Complaint;
