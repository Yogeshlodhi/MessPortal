import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { postComplaint } from '../Features/Mess/messSlice';
import { useNavigate } from 'react-router-dom';


const Complaint = () => {
  const dispatch = useDispatch();
  const toast = useToast()
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    complaintAbout: '',
    description: '',
    attachment: null
  });

  const { complaintAbout, description, attachment } = complaint;

  const handleChange = (e) => {
    // const { name, value } = e.target;
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
      formData.append('image', attachment);
    }

    dispatch(postComplaint(formData))
      .then(() => {
        toast({
          title: 'Complaint Submitted',
          duration: 3000,
          status: 'success',
          isClosable: true,
        });
        navigate('/');
      })
      .catch((err) => {
        toast({
          title: 'Submission Failed',
          description: err.message,
          duration: 3000,
          status: 'error',
          isClosable: true,
        });
      });
    console.log(complaint);
  };



  // const [image, setImage] = useState(null);
  // const [fileName, setFileName] = useState("No Files Selected")
  // const handleImageChange = ({ target: { files } }) => {
  //   if (files.length > 0) {
  //     setFileName(files[0].name);
  //     setImage(URL.createObjectURL(files[0]));
  //   }
  // };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Submit a Complaint
      </Heading>
      <Box gap={'1rem'} display={'flex'} flexDirection={'column'}>
        <FormControl id="complaintAbout">
          <FormLabel>Complaint About</FormLabel>
          <Input
            type="text"
            name="complaintAbout"
            value={complaint.complaintAbout}
            onChange={handleChange}
            placeholder="Enter the issue you want to complain about"
            required
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={complaint.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            required
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
          width={'50%'}
          alignSelf={'center'}
        >
          <VStack spacing={4} alignItems="center">
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
                      width={150}
                      height={150}
                      alt={'Complaint Image'}
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
        <Button
          type="submit"
          colorScheme="teal"
          width={'50%'}
          alignSelf={'center'}
          onClick={handleSubmit}
        >
          Submit Complaint
        </Button>
      </Box>
    </Box>
  );
};

export default Complaint;
