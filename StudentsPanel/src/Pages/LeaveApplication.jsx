import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, List, ListIcon, ListItem, Textarea, useToast } from '@chakra-ui/react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyLeave, reset } from '../Features/Leave/leaveSlice';

function LeaveApplication() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()

  const { student } = useSelector((state) => state.auth);
  // const { leaves, isError, message } = useSelector((state) => state.leave);

  const [leaveForm, setLeaveForm] = useState({
    studentRoll: student && student.studentRoll,
    startDate: '',
    endDate: '',
    reason: ''
  })

  const { studentRoll, startDate, endDate, reason } = leaveForm;

  // useEffect(() => {
  //   if (isError) {
  //     toast({
  //       title: message,
  //       duration: 3000,
  //       status: 'error',
  //       isClosable: true
  //     })
  //   }
  // }, [navigate, dispatch, leaves])

  const onFormChange = (e, field) => {
    const { value } = e.target;
    if (field === 'startDate' && endDate && value > endDate) {
      toast({
        title: 'Start date cannot be after end date',
        duration: 3000,
        status: 'error',
        isClosable: true
      })
    } else if (field === 'endDate' && startDate && value < startDate) {
      toast({
        title: 'End date cannot be before start date',
        duration: 3000,
        status: 'error',
        isClosable: true
      })
    } else {
      setLeaveForm(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  }

  const onApply = (e) => {
    e.preventDefault();
    const leaveData = {
      studentRoll,
      startDate,
      endDate,
      reason,
    }
    dispatch(applyLeave(leaveData));
    toast({
      title: 'Leave Applied',
      duration: 3000,
      status: 'success',
      isClosable: true
    })
    navigate('/')
  }

  return (
    <Box padding={'2rem'} className='flex gap-8 flex-col'>
      <Heading fontSize={'2rem'}>Apply For Leave</Heading>
      <List spacing={1}>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          The Leave must be of a minimum of 3 days
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          Your leave start date should be minimum a day before applying
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          Kindly upload the screenshot of the leave after the application
        </ListItem>
      </List>
      <Container padding={'2rem'} maxW='70rem' bg='#2C3E50' centerContent borderRadius={'1rem'} minHeight={'30rem'} maxH={'35rem'} height={'auto'}>
        <Box padding='4' w={'90%'} maxW='100%' className='grid grid-flow-col gap-5'>
          <FormControl>
            <FormLabel color={'white'}>From</FormLabel>
            <Input
              type='date'
              color={'white'}
              value={startDate}
              name='startDate'
              onChange={(e) => onFormChange(e, "startDate")}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={'white'}>To</FormLabel>
            <Input
              type='date'
              color={'white'}
              value={endDate}
              name='endDate'
              onChange={(e) => onFormChange(e, "endDate")}
            />
          </FormControl>
        </Box>
        <FormControl w={'90%'} maxW='100%' padding='4' color={'white'}>
          <Textarea
            placeholder='Provide the reason for your leave'
            minHeight={'15rem'}
            maxHeight={'15rem'}
            value={reason}
            name='reason'
            onChange={(e) => onFormChange(e, "reason")}
          />
        </FormControl>
        <Button
          display={'inline-block'}
          width={'50%'}
          marginTop={'1rem'}
          color={'#2C3E50'}
          onClick={onApply}
        >
          Apply
        </Button>
      </Container>
    </Box>
  )
}

export default LeaveApplication
