import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Textarea,
  useColorModeValue,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyLeave, reset } from '../Features/Leave/leaveSlice';
import Spinner from '../Components/Spinner';

function LeaveApplication() {
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('lightMode.text', 'darkMode.text');

  const [isMobile] = useMediaQuery('(max-width: 600px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { student } = useSelector((state) => state.auth);

  const { isLoading, message, isError, isSuccess } = useSelector((state) => state.leave);

  useEffect(() => {
    if (isError && message) {
      toast({
        title: message,
        duration: 3000,
        status: 'error'
      })
    }
    return () => {
      dispatch(reset())
    }
  }, [isError, dispatch, toast])

  useEffect(() => {
    if (isSuccess && message) {
      toast({
        title: message,
        duration: 3000,
        status: 'success',
        isClosable: true,
      });
      navigate('/');
    }
    return () => {
      dispatch(reset())
    }
  }, [isSuccess, toast, dispatch])


  const [leaveForm, setLeaveForm] = useState({
    studentRoll: student && student.studentRoll,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const { studentRoll, startDate, endDate, reason } = leaveForm;

  const onFormChange = (e, field) => {
    const { value } = e.target;
    if (field === 'startDate' && endDate && value > endDate) {
      toast({
        title: 'Start date cannot be after end date',
        duration: 3000,
        status: 'error',
        isClosable: true,
      });
    } else if (field === 'endDate' && startDate && value < startDate) {
      toast({
        title: 'End date cannot be before start date',
        duration: 3000,
        status: 'error',
        isClosable: true,
      });
    } else {
      setLeaveForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const onApply = (e) => {
    e.preventDefault();
    const leaveData = {
      studentRoll,
      startDate,
      endDate,
      reason,
    };
    dispatch(applyLeave(leaveData));
  };

  if (isLoading) {
    return <Spinner message={'Please wait....'} />
  }

  return (
    <Box
      className='flex gap-8 flex-col'
      color={textColor}
      borderRadius={'1rem'}
      padding={'0.5rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
    >
      <Heading
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >
        Apply For Leave
      </Heading>
      <List spacing={1}>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={ArrowRightAltIcon} />
          The Leave must be of a minimum of 3 days
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={ArrowRightAltIcon} />
          Your leave start date should be minimum a day before applying
        </ListItem>
      </List>
      <Container
        padding={isMobile ? '0' : '2rem'}
        maxW={isMobile ? '100%' : '70rem'}
        color={textColor}
        centerContent
        borderRadius={'1rem'}
        minHeight={'30rem'}
        maxH={'35rem'}
        height={'auto'}
      >
        <VStack spacing={5} w={'100%'}>
          <Box w={'100%'} display={{ base: 'block', md: 'flex' }} gap={5}>
            <FormControl
              flex={1}
              mb={{ base: 4, md: 0 }}
              isRequired
            >
              <FormLabel color={textColor}>From</FormLabel>
              <Input
                type='date'
                color={textColor}
                value={startDate}
                name='startDate'
                onChange={(e) => onFormChange(e, 'startDate')}
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
            <FormControl flex={1} isRequired>
              <FormLabel color={textColor}>To</FormLabel>
              <Input
                type='date'
                color={textColor}
                value={endDate}
                name='endDate'
                onChange={(e) => onFormChange(e, 'endDate')}
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
          </Box>
          <FormControl w={'100%'} isRequired>
            <Textarea
              placeholder='Provide the reason for your leave'
              minHeight={'15rem'}
              maxHeight={'15rem'}
              value={reason}
              name='reason'
              onChange={(e) => onFormChange(e, 'reason')}
              resize={'none'}
              color={textColor}
              focusBorderColor='#B5B4B4'
            />
          </FormControl>
          <Button
            display={'inline-block'}
            width={{ base: '100%', md: '50%' }}
            marginTop={'1rem'}
            onClick={onApply}
            background={'#005252'}
            _hover={{ backgroundColor: 'teal' }}
            color={'white'}
          >
            Apply
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

export default LeaveApplication;
