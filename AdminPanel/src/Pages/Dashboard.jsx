import React from 'react';
import { Box, Heading, Text, Flex, Stat, StatLabel, StatNumber, Divider } from '@chakra-ui/react';

import { useSelector, useDispatch } from 'react-redux';
import { getStudentsList } from '../Features/Students/studentSlice';
import { useEffect } from 'react';
import { getLeavesList } from '../Features/Leaves/leaveSlice';
import { getAllFeedbacks } from '../Features/Feedback/feedBackSlice';
import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions';
import { getComplaintsList } from '../Features/Complaints/complaintSlice';
import Spinner from '../Components/Spinner'


const Dashboard = () => {

  const dispatch = useDispatch();

  const { studentsList } = useSelector(state => state.students);
  const { LeavesList } = useSelector(state => state.leaves);
  const { feedbacks } = useSelector(state => state.feedbacks);
  const { complaints } = useSelector(state => state.complaints);

  useEffect(() => {
    dispatch(getStudentsList());
    dispatch(getLeavesList());
    dispatch(getAllFeedbacks());
    dispatch(getComplaintsList())
  }, [dispatch])


  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };



  const filteredLeaves = LeavesList.filter(leave => {
    const appliedDate = new Date(leave.appliedDate);
    return isToday(appliedDate) && leave.studentRoll !== 'Student Does Not Exist Anymore';
  });

  if (!studentsList || !LeavesList || !feedbacks || !complaints) {
    return <Spinner message={'Loading Data .....'}/>
  }

  return (
    <Box p={4}>
      <Heading mb={4} fontSize="2xl" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Mess Management Dashboard</Heading>

      <Flex mb={8}>
        <Stat flex="1" mr={4} 
          // bg="gray.100" 
          p={4} borderRadius="md"
          border={'1px solid'}
        >
          <StatLabel fontSize={'1.5rem'}>Total Students</StatLabel>
          {/* <StatNumber fontSize="1.5rem">{studentsList && studentsList.length}</StatNumber> */}
        </Stat>

        <Stat flex="1" mr={4} 
          // bg="gray.100" 
          p={4} borderRadius="md"
          border={'1px solid'}
        >
          <StatLabel fontSize={'1.5rem'}>Total Leaves</StatLabel>
          {/* <StatNumber fontSize={'1.5rem'}>{LeavesList && LeavesList.length}</StatNumber> */}
        </Stat>

        <Stat flex="1" mr={4} 
          // bg="gray.100" 
          p={4} borderRadius="md"
          border={'1px solid'}
        >
          <StatLabel fontSize={'1.5rem'}>Total Feedbacks</StatLabel>
          {/* <StatNumber fontSize={'1.5rem'}>{feedbacks && feedbacks.length}</StatNumber> */}
        </Stat>

        <Stat flex="1" 
          // bg="gray.100" 
          p={4} borderRadius="md"
          border={'1px solid'}
        >
          <StatLabel fontSize={'1.5rem'}>Total Complaints</StatLabel>
          {/* <StatNumber fontSize={'1.5rem'}>{complaints && complaints.data.length}</StatNumber> */}
        </Stat>
      </Flex>

      <Divider mb={6} />

      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'2rem'}>
        <Box width={'50%'}>
          <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Leaves</Heading>
          {/* {filteredLeaves && filteredLeaves.slice(0, 5).map((leave, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" 
              background={leave.status === 'Pending' ? 'orange' :
                leave.status === 'Approved' ? 'green' :
                  'red'
              }
            >

              <Text>{leave.studentRoll} - {UtilFunctions.formatDate(new Date(leave.startDate))}  to {UtilFunctions.formatDate(new Date(leave.endDate))} ({leave.status})</Text>
            </Box>
          ))} */}
        </Box>
        <Box width={'50%'}>
          <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Feedbacks</Heading>
          {/* {feedbacks && feedbacks.slice(0, 5).map((feedback, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" color={'white'} background={feedback.feedback > 5 ? 'green' : 'red'}>
              <Text><strong>{feedback.studentRoll}</strong> ({feedback.mealOfDay}) {' '}:{' '}{feedback.feedbackDescription}</Text>
            </Box>
          ))} */}
        </Box>
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Complaints</Heading>
        {/* {complaints && complaints.data.slice(0, 5).map((complaint, index) => (
          <Box key={index} mb={2} bg="gray.100" p={2} borderRadius="md">
            <Text><strong>{complaint.roll}</strong> ({complaint.status}): {complaint.complaintAbout}</Text>
          </Box>
        ))} */}
      </Box>
    </Box>
  );
};

export default Dashboard;
