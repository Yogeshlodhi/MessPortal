import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFeedbacks } from '../Features/Feedback/feedBackSlice';
import { Box, Input, Stack, Collapse, Button, Text, RadioGroup, Radio, HStack } from '@chakra-ui/react';

const Feedbacks = () => {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector((state) => state.feedbacks);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [feedbackType, setFeedbackType] = useState('all');
  const [openFeedback, setOpenFeedback] = useState(null);

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

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Input
          type="date"
          value={filterDate}
          onChange={handleDateChange}
          placeholder="Filter by submission date"
        />
        <RadioGroup onChange={handleFeedbackTypeChange} value={feedbackType}>
          <HStack spacing={4}>
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
              width="80%"
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
                _hover={{background: 'teal'}}
              >
                <Text>{feedback.student}</Text>
                <Text fontSize="sm">{new Date(feedback.submissionDate).toLocaleDateString()}</Text>
              </Button>
              <Collapse in={openFeedback === feedback._id}>
                <Box mt={4}>
                  <Text><strong>Feedback:</strong> {feedback.feedback}</Text>
                  <Text><strong>Description:</strong> {feedback.feedbackDescription}</Text>
                  <Text><strong>Suggestion:</strong> {feedback.suggestion}</Text>
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
