import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFeedbacks } from '../Features/Feedback/feedBackSlice';
import { Box, Input, Stack, useColorModeValue, Collapse, Button, Text, RadioGroup, Radio, HStack, Avatar, Heading, useMediaQuery } from '@chakra-ui/react';

import Spinner from '../Components/Spinner';

const Feedbacks = () => {
  const dispatch = useDispatch();
  const { feedbacks, isLoadingFeedbacks } = useSelector((state) => state.feedbacks);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [feedbackType, setFeedbackType] = useState('all');
  const [openFeedback, setOpenFeedback] = useState(null);
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  const [isMobile] = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [dispatch]);

  useEffect(() => {
    let filtered = feedbacks;

    if (filterDate) {
      filtered = filtered.filter(fb =>
        new Date(fb.submissionDate).toISOString().slice(0, 10) === filterDate
      );
    }

    if (feedbackType === 'positive') {
      filtered = filtered.filter(fb => fb.feedback > 5);
    } else if (feedbackType === 'negative') {
      filtered = filtered.filter(fb => fb.feedback <= 5);
    }

    setFilteredFeedbacks(filtered);
  }, [filterDate, feedbackType, feedbacks]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleFeedbackTypeChange = (value) => {
    setFeedbackType(value);
  };

  const toggleFeedback = (id) => {
    setOpenFeedback(openFeedback === id ? null : id);
  };

  if (isLoadingFeedbacks) {
    return <Spinner message={'Loading Feedbacks....'} />
  }

  return (
    <Box
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      // color={textColor}
      // margin={isMobile ? '0.5rem' : 0}
      bg={bgColor}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
      gap={'1rem'}
      borderRadius={'1rem'}
      // height={isMobile ? 'auto' : '100%'}
      padding={'1rem'}
    >
      <Heading
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
        mb={6}
      >
        Feedbacks & Suggestions</Heading>
      <HStack
        spacing={isMobile ? 2 : 4}
        mb={4}
        flexDirection={isMobile ? "column" : "row"}
        alignItems="flex-start"
      >
        <Input
          type="date"
          value={filterDate}
          onChange={handleDateChange}
          placeholder="Filter by submission date"
          mb={isMobile ? 2 : 0}
        />
        <RadioGroup onChange={handleFeedbackTypeChange} value={feedbackType}>
          <HStack spacing={isMobile ? 2 : 4}>
            <Radio value="all">All</Radio>
            <Radio value="positive">Positive</Radio>
            <Radio value="negative">Negative</Radio>
          </HStack>
        </RadioGroup>
      </HStack>
      {filteredFeedbacks.length > 0 ? (
        <Stack spacing={4}>
          {filteredFeedbacks.map((feedback) => (
            <Box
              key={feedback._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              width={isMobile ? '100%' : '80%'}
              p={4}
            >
              <Button
                onClick={() => toggleFeedback(feedback._id)}
                background={'teal'}
                color={'white'}
                display={'flex'}
                alignItems={'center'}
                width={'100%'}
                justifyContent={'space-between'}
                _hover={{ background: 'teal' }}
              >
                <Text>{feedback.student} ({feedback.studentRoll})</Text>
                <Text fontSize="sm">{new Date(feedback.submissionDate).toLocaleDateString()}</Text>
              </Button>
              <Collapse
                in={openFeedback === feedback._id}
                className='flex flex-col'
              >
                <Heading textAlign={'center'} mb={6} mt={4}>Feedback Details</Heading>
                <Box
                  display={'flex'}
                  gap={'4rem'}
                  height={'auto'}
                  flexDirection={isMobile ? 'column' : 'row'}
                >
                  <Box
                    // width={'40%'}
                    width={isMobile ? '100%' : '60%'}
                  >
                    <Text>
                      <strong>Feedback:</strong> {feedback.feedback}
                    </Text>
                    <Text>
                      <strong>Meal : </strong> {feedback.mealOfDay}
                    </Text>
                    <Text>
                      <strong>Description:</strong> {feedback.feedbackDescription}
                    </Text>
                    <Text>
                      <strong>Suggestion:</strong> {feedback.suggestion}
                    </Text>
                  </Box>
                  <Box
                    // width={'60%'} 
                    width={isMobile ? '100%' : '60%'}
                  >
                    {
                      feedback.feedbackImage ? (
                        <img
                          src={feedback.feedbackImage?.url}
                          width={'100%'}
                          height={'100%'}
                          style={{ objectFit: 'contain' }}
                        // style={{width: '12rem', height: '10rem', objectFit: 'contain'}}
                        />
                      ) : (
                        <Text fontWeight={'bold'} textAlign={'center'} color={'red'}>No Image Was Attached</Text>
                      )
                    }
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text>No feedbacks found for the selected filters.</Text>
      )}
    </Box>
  );
};

export default Feedbacks;
