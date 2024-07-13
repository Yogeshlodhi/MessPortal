import React, { useEffect } from 'react';
import { Box, Heading, Flex, Stat, StatLabel, StatNumber, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getdata } from '../Features/Students/studentSlice';
import { getAllFeedbacks } from '../Features/Feedback/feedBackSlice';
import { getLeavesList } from '../Features/Leaves/leaveSlice';
import { getComplaintsList } from '../Features/Complaints/complaintSlice';
import UtilFunctions from '../Utils/UtilFunctions';

const Dashboard = () => {
  const dispatch = useDispatch();

  const {students, isLoadingStudents, studentsMessage} = useSelector((state) => state.students);
  const {leaves, isLoadingLeaves, leavesMessage} = useSelector((state) => state.leaves);
  const {feedbacks, isLoadingFeedbacks, feedbackMessage} = useSelector((state) => state.feedbacks);
  const {complaints, isLoadingComplaints, complaintsMessage} = useSelector((state) => state.complaints);

  useEffect(() => {
    dispatch(getdata());
    dispatch(getLeavesList());
    dispatch(getAllFeedbacks());
    dispatch(getComplaintsList());
  }, [dispatch]);

  if (isLoadingStudents || isLoadingLeaves || isLoadingFeedbacks || isLoadingComplaints) {
    return <Spinner message={'Getting Data.....'} />;
  }

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  const filteredLeaves = leaves && leaves.filter(leave => {
    const appliedDate = new Date(leave.appliedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return UtilFunctions.areDatesEqual(appliedDate, today);
  });
  
  const filteredFeedbacks = feedbacks && feedbacks.filter(feedback => {
      const appliedDate = new Date(feedback.submissionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return UtilFunctions.areDatesEqual(appliedDate, today);
    });
    // console.log(filteredFeedbacks)
    
  return (
    <Box
      p={4}
      borderRadius={'0.5rem'}
      padding={'0.5rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
      height={'100%'}
    >
      <Heading
        mb={4}
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >
        Mess Management Dashboard
      </Heading>

      <Flex flexWrap="wrap" gap="4">
        <Stat flex="1" p={4} borderRadius="md"
          boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
        >
          <StatLabel fontSize="lg">Total Students</StatLabel>
          <StatNumber fontSize="2xl">{students?.length}</StatNumber>
        </Stat>
        <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
          <StatLabel fontSize="lg">Total Leaves</StatLabel>
          <StatNumber fontSize="2xl">{leaves?.length}</StatNumber>
        </Stat>
        <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
          <StatLabel fontSize="lg">Total Feedbacks</StatLabel>
          <StatNumber fontSize="2xl">{feedbacks?.length}</StatNumber>
        </Stat>
        <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
          <StatLabel fontSize="lg">Total Complaints</StatLabel>
          <StatNumber fontSize="2xl">{complaints?.length}</StatNumber>
        </Stat>
      </Flex>

      <Divider my={6} />

      <Flex flexWrap="wrap" gap="4">
        <DashboardSection
          title="Leaves (Today)"
          data={filteredLeaves}
          renderItem={(leave, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" bg={leave.status === 'Pending' ? 'orange' : leave.status === 'Approved' ? 'green' : 'red'} color="white">
              <Text>{leave.studentRoll} - {UtilFunctions.formatDate(new Date(leave.startDate))} to {UtilFunctions.formatDate(new Date(leave.endDate))} ({leave.status})</Text>
            </Box>
          )}
        />

        <DashboardSection
          title="Feedbacks (Today)"
          data={filteredFeedbacks}
          renderItem={(feedback, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" bg={feedback.feedback > 3 ? 'green' : 'red'} color="white">
              <Text><strong>{feedback.studentRoll}</strong> ({feedback.mealOfDay}): {feedback.feedbackDescription}</Text>
            </Box>
          )}
        />

        <DashboardSection
          title="Complaints"
          data={complaints && complaints.slice(0, 5)}
          renderItem={(complaint, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" bg={'red'} color="white">
              <Text><strong>{complaint.roll}</strong> ({complaint.status}): {complaint.complaintAbout}</Text>
            </Box>
          )}
        />
      </Flex>
    </Box>
  );
};

const DashboardSection = ({ title, data, renderItem }) => (
  <Box width={['100%', '50%']}>
    <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase">
      {title}
    </Heading>
    {data && data.length == 0 && (
      <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase" color={'red'}>
        No {title === 'Leaves (Today)' ? 'Leaves Applied Today' : title === 'Feedbacks (Today)' ? 'Feedback Was Posted Today' : 'Complaints'}.....
      </Heading>
    )}
    {data && data.map((item, index) => renderItem(item, index))}
  </Box>
);


export default Dashboard;
