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
} from '@chakra-ui/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Complaint = () => {
  const [complaint, setComplaint] = useState({
    complaintAbout: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({
      ...complaint,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send complaint data to backend
    console.log(complaint);
    // You can add API call here to submit complaint data
  };

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Files Selected")
  const handleImageChange = ({ target: { files } }) => {
    if (files.length > 0) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

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
                onChange={handleImageChange}
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
                  {image ? (
                    <Image
                      src={image}
                      width={150}
                      height={150}
                      alt={fileName}
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
        <Button type="submit" colorScheme="teal" width={'50%'} alignSelf={'center'}>
          Submit Complaint
        </Button>
      </Box>
    </Box>
  );
};

export default Complaint;
