import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Select, Text, Textarea, VStack, useColorModeValue, useMediaQuery, useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useDispatch, useSelector } from 'react-redux';
import { postFeedback, reset } from '../Features/Mess/messSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner'

const Feedback = () => {
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('black', 'white');
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [feedbackForm, setFeedbackForm] = useState({
    feedback: null,
    feedbackDescription: '',
    suggestion: '',
    mealOfDay: '',
    feedbackImage: null
  });

  const { feedback, feedbackDescription, suggestion, mealOfDay, feedbackImage } = feedbackForm;

  const { isPostingFeedback, isFeedbackError, feedbackMessage, isFeedbackSuccess } = useSelector((state) => state.mess)

  const onChange = (e) => {
    setFeedbackForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRatingClick = (value) => {
    setFeedbackForm((prev) => ({
      ...prev,
      feedback: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('feedback', feedback);
    formData.append('feedbackDescription', feedbackDescription);
    formData.append('suggestion', suggestion);
    formData.append('mealOfDay', mealOfDay);
    if (feedbackImage) {
      // formData.append(feedbackImage);
      formData.append('feedbackImage', feedbackImage);
    }
    dispatch(postFeedback(formData))
  };

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  useEffect(() => {
    if (isFeedbackError) {
      toast({
        title: feedbackMessage,
        duration: 3000,
        status: 'error',
        isClosable: true
      })
    }
    if (isFeedbackSuccess) {
      toast({
        title: feedbackMessage,
        duration: 3000,
        status: 'success',
        isClosable: true
      })
      navigate('/')
      dispatch(reset());
    }
  }, [isFeedbackError, isFeedbackSuccess])

  if (isPostingFeedback) {
    return <Spinner message={'Posting Your Feedback...'} />
  }

  return (
    <Box
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      color={textColor}
      margin={isMobile ? '0.5rem' : 0}
      bg={bgColor}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
      gap={'1rem'}
      borderRadius={'1rem'}
      height={isMobile ? 'auto' : '100%'}
      padding={'1rem'}
    >
      <Heading
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >
        Feedback Rating</Heading>
      <Flex
        align="flex-start"
        justifyContent={'center'}
        flexDir={{ base: 'column', md: 'row' }}
        p={isMobile ? '0.5rem' : '1rem'}
      >
        <Box
          flex="1"
          p={isMobile ? 0 : '1rem'}
          borderRadius={isMobile ? '0' : '1rem'}
          height={'100%'}
        >
          <VStack
            spacing={isMobile ? '0' : '4'}
            align="center"
          >
            <Flex wrap="wrap" justify="center">
              {[...Array(11).keys()].map((value) => (
                <Button
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  colorScheme={feedback === value ? 'teal' : 'gray'}
                  // m={1}
                  margin={'0.1rem'}
                >
                  {value}
                </Button>
              ))}
            </Flex>
            <FormControl w={'95%'} maxW='40rem' p='4' color={textColor}>
              <Textarea
                placeholder='Please provide your feedback description, This field is required'
                minHeight={'10rem'}
                maxHeight={'10rem'}
                resize={'none'}
                onChange={onChange}
                name='feedbackDescription'
                value={feedbackDescription}
                color={textColor}
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
            <FormControl w={'95%'} maxW='40rem' p='4' color={textColor}>
              <Textarea
                placeholder='Please write suggestions if any'
                minHeight={'10rem'}
                maxHeight={'10rem'}
                resize={'none'}
                focusBorderColor='#B5B4B4'
                onChange={onChange}
                name='suggestion'
                value={suggestion}
                color={textColor}
              />
            </FormControl>
          </VStack>
        </Box>
        <Box
          flex="1"
          alignSelf={'center'}
          p={isMobile ? 0 : '1rem'}
          borderRadius={isMobile ? '0' : '1rem'}
          height={'100%'}
          width={'100%'}
          bg={bgColor}
        >
          <Box
            border={`1px dotted ${borderColor}`}
            p={4} borderRadius={'1rem'} height={'50%'} mt={6} overflow={'hidden'} borderWidth={'0.1rem'}
            bg={bgColor}
          >
            <VStack spacing={4} alignItems="center">
              <FormLabel fontSize={'2rem'} mt={6} htmlFor="imageUpload">Upload Image</FormLabel>
              <Flex alignItems="center" mt={6}>
                <Input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  name='feedbackImage'
                  onChange={(e) => {
                    setFeedbackForm((prev) => ({
                      ...prev,
                      feedbackImage: e.target.files[0]
                    }));
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
                    {feedbackImage ? (
                      <Image
                        src={URL.createObjectURL(feedbackImage)}
                        width={150}
                        height={150}
                        alt={'Feedback'}
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
          <Select
            variant='filled'
            placeholder='Select The Meal'
            pt={'1rem'}
            cursor={'pointer'}
            value={mealOfDay}
            name='mealOfDay'
            onChange={onChange}
            isRequired={true}
            width={'75%'}
          >
            <option value={'Breakfast'}>
              Breakfast
            </option>
            <option value={'Lunch'}>Lunch</option>
            <option value={'Dinner'}>Dinner</option>
          </Select>
          <Button
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            mt="4rem"
            background={'#005252'}
            _hover={{ backgroundColor: 'teal' }}
            gap="6"
            onClick={onSubmit}
            color={'white'}
          >
            Submit
            <TelegramIcon />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Feedback;
