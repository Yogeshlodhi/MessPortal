import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, IconButton, Image, Input, Text, Textarea, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useDispatch } from 'react-redux';
import { postFeedback } from '../Features/Mess/messSlice';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Files Selected");

  const [feedbackForm, setFeedbackForm] = useState({
    feedback : null,
    feedbackDescription : '',
    suggestion: ''
  })

  const {feedback, feedbackDescription, suggestion} = feedbackForm;

  const onChange = (e) => {
    setFeedbackForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = ({ target: { files } }) => {
    if (files.length > 0) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleRatingClick = (value) => {
    setFeedbackForm((prev) => ({
      ...prev,
      feedback: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      feedback,
      feedbackDescription,
      suggestion
    }
    dispatch(postFeedback(feedbackData));
    toast({
      title: 'Feedback Submitted',
      duration: 3000,
      status: 'success',
      isClosable: true
    })
    navigate('/')
    // console.log(feedback, feedbackDescription, suggestion);
  }

    
    return (
      <Box  
      height={'100%'}
      bg={bgColor} 
      color={textColor}
    >
      <Flex align="flex-start" border={'2px solid black'} padding={'2rem'} height={'100%'}>
        <Box flex="1" border={'1px solid black'} padding={'1rem'} borderRadius={'1rem'} height={'100%'}>
          <VStack spacing={4} align="center">
            <Heading size={'lg'}>Feedback Rating</Heading>
            <VStack spacing={2} align="flex-start" flexDir={'row'}>
              {[...Array(11).keys()].map((value) => (
                <Button
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  colorScheme={feedback === value ? 'blue' : 'gray'}
                >
                  {value}
                </Button>
              ))}
            </VStack>
            <FormControl w={'95%'} maxW='40rem' padding='4' color={textColor}>
              <Textarea
                placeholder='Write Something About Your Feedback.......'
                minHeight={'10rem'}
                maxHeight={'10rem'}
                resize={'none'}
                onChange={onChange}
                name='feedbackDescription'
                value={feedbackDescription}
                // color={'black'}
                color={textColor}
                outlineColor={'teal'}
              />
            </FormControl>
            <FormControl w={'95%'} maxW='40rem' padding='4' color={textColor}>
              <Textarea
                placeholder='Please Write Suggestions if any.....'
                minHeight={'10rem'}
                maxHeight={'10rem'}
                resize={'none'}
                outlineColor={'teal'}
                onChange={onChange}
                name='suggestion'
                value={suggestion}
                color={textColor}
              />
            </FormControl>
          </VStack>
        </Box>
        <Box flex="1" ml={8} border={'1px solid black'} padding={'1rem'} borderRadius={'1rem'} height={'100%'}>
          <Box border="1px dotted black" p={4} borderRadius={'1rem'} height={'50% '} mt={6} overflow={'hidden'} borderWidth={'0.1rem'}>
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
          <Button
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            mt="4rem"
            // colorScheme={textColor}
            colorScheme="teal"
            variant="solid"
            gap="6"
            onClick={onSubmit}
          >
            Submit
            <Icon as={TelegramIcon}/>
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default Feedback
