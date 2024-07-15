import React, { useEffect } from 'react';
import { Box, Heading, Flex, Stat, StatLabel, StatNumber, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getdata } from '../Features/Students/studentSlice';
import { getAllFeedbacks, getFilteredfeedbacks } from '../Features/Feedback/feedBackSlice';
import { getFilteredLeaves, getLeavesList } from '../Features/Leaves/leaveSlice';
import { getComplaintsList } from '../Features/Complaints/complaintSlice';
import { getMessInfo } from '../Features/MessInfo/messInfoSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { students, isLoadingStudents } = useSelector((state) => state.students);
  const { leaves, isLoadingLeaves, filteredLeaves } = useSelector((state) => state.leaves);
  const { feedbacks, isLoadingFeedbacks, filteredFeedbacks } = useSelector((state) => state.feedbacks);
  const { complaints, isLoadingComplaints } = useSelector((state) => state.complaints);

  useEffect(() => {
    dispatch(getdata());
    dispatch(getLeavesList());
    dispatch(getAllFeedbacks());
    dispatch(getComplaintsList());
    dispatch(getMessInfo());
    dispatch(getFilteredfeedbacks());
    dispatch(getFilteredLeaves());
  }, [dispatch]);

  // console.log(filteredLeaves)

  if (isLoadingStudents || isLoadingLeaves || isLoadingFeedbacks || isLoadingComplaints) {
    return <Spinner message="Getting Data..." />;
  }

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  return (
    <Box
      p={4}
      borderRadius="0.5rem"
      bg={bgColor}
      border="3px solid rgba(0, 0, 0, 0.05)"
      boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)"
    >
      <Heading
        mb={4}
        fontSize="2rem"
        textAlign="center"
        textTransform="uppercase"
      >
        Mess Management Dashboard
      </Heading>

      <Flex flexWrap="wrap" gap={4}>
        <StatBox label="Total Students" number={students?.length} />
        <StatBox label="Total Leaves" number={leaves?.length} />
        <StatBox label="Total Feedbacks" number={feedbacks?.length} />
        <StatBox label="Total Complaints" number={complaints?.length} />
        <StatBox label="Feedbacks Today" number={filteredFeedbacks?.length} />
        <StatBox label="Leaves Today" number={filteredLeaves?.length} />
      </Flex>

      <Divider my={6} />

      <Flex flexWrap="wrap" gap={4}>
        <Section
          title="Feedbacks (Posted Today)"
          data={filteredFeedbacks}
          renderItem={(item, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" 
              bg="teal" 
              color="white"
            >
              <Text>
                [{item.feedback}] <strong>{item.roll}</strong> {item.student} ({item.mealOfDay}): {item.feedbackDescription}
              </Text>
            </Box>
          )}
          emptyMessage="No Feedbacks were posted today..."
        />
        <Section
          title="Leaves ( Posted Today )"
          data={filteredLeaves}
          renderItem={(leave, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" 
            bg={leave.status === 'Approved' ? '#6dbc6d' : leave.status === 'Pending' ? '#e9913f' : '#da4242'}
            color="white">
              <Text><strong>{leave.studentName}</strong> ({leave.status}) : {leave.reason}</Text>
            </Box>
          )}
          emptyMessage="No Leaves were posted today..."
        />
        <Section
          title="Complaints"
          data={complaints?.slice(0, 5)}
          renderItem={(complaint, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" bg="red" color="white">
              <Text><strong>{complaint.roll}</strong> ({complaint.status}): {complaint.complaintAbout}</Text>
            </Box>
          )}
          emptyMessage="No Complaints..."
        />
      </Flex>
    </Box>
  );
};

const StatBox = ({ label, number }) => (
  <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
    <StatLabel fontSize="lg">{label}</StatLabel>
    <StatNumber fontSize="2xl">{number}</StatNumber>
  </Stat>
);

const Section = ({ title, data, renderItem, emptyMessage }) => (
  <Box width={['100%', '50%']}>
    <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase">
      {title}
    </Heading>
    {(!data || data.length === 0) ? (
      <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase" color="red">
        {emptyMessage}
      </Heading>
    ) : (
      data.map((item, index) => renderItem(item, index))
    )}
  </Box>
);

export default Dashboard;

// import React, { useEffect } from 'react';
// import { Box, Heading, Flex, Stat, StatLabel, StatNumber, Divider, Text, useColorModeValue } from '@chakra-ui/react';
// import { useSelector, useDispatch } from 'react-redux';
// import Spinner from '../Components/Spinner';
// import { getdata } from '../Features/Students/studentSlice';
// import { getAllFeedbacks, getFilteredfeedbacks } from '../Features/Feedback/feedBackSlice';
// import { getLeavesList } from '../Features/Leaves/leaveSlice';
// import { getComplaintsList } from '../Features/Complaints/complaintSlice';
// import { getMessInfo } from '../Features/MessInfo/messInfoSlice'
// import UtilFunctions from '../Utils/UtilFunctions';


// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { students, isLoadingStudents, studentsMessage } = useSelector((state) => state.students);
//   const { leaves, isLoadingLeaves, leavesMessage } = useSelector((state) => state.leaves);
//   const { feedbacks, isLoadingFeedbacks, feedbackMessage,
//     isLoadingFilter, filteredFeedbacks,
//     isErrorFilter, filterMessage } = useSelector((state) => state.feedbacks);
//   const { complaints, isLoadingComplaints, complaintsMessage } = useSelector((state) => state.complaints);

//   console.log(filteredFeedbacks)

//   useEffect(() => {
//     dispatch(getdata());
//     dispatch(getLeavesList());
//     dispatch(getAllFeedbacks());
//     dispatch(getComplaintsList());
//     dispatch(getMessInfo())
//     dispatch(getFilteredfeedbacks());
//   }, [dispatch]);

//   if (isLoadingStudents || isLoadingLeaves || isLoadingFeedbacks || isLoadingComplaints) {
//     return <Spinner message={'Getting Data.....'} />;
//   }

//   const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
//   // const filteredLeaves = UtilFunctions.filterLeavesByToday(leaves || []);
//   // const filteredFeedbacks = UtilFunctions.filterFeedbacksByToday(feedbacks || []);


//   return (
//     <Box
//       p={4}
//       borderRadius={'0.5rem'}
//       padding={'0.5rem'}
//       bg={bgColor}
//       border={'3px solid rgba(0, 0, 0, 0.05)'}
//       boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
//     // height={'100%'}
//     >
//       <Heading
//         mb={4}
//         fontSize={'2rem'}
//         textAlign={'center'}
//         textTransform={'uppercase'}
//       >
//         Mess Management Dashboard
//       </Heading>

//       <Flex flexWrap="wrap" gap="4">
//         <Stat flex="1" p={4} borderRadius="md"
//           boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
//         >
//           <StatLabel fontSize="lg">Total Students</StatLabel>
//           <StatNumber fontSize="2xl">{students?.length}</StatNumber>
//         </Stat>
//         <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
//           <StatLabel fontSize="lg">Total Leaves</StatLabel>
//           <StatNumber fontSize="2xl">{leaves?.length}</StatNumber>
//         </Stat>
//         <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
//           <StatLabel fontSize="lg">Total Feedbacks</StatLabel>
//           <StatNumber fontSize="2xl">{feedbacks?.length}</StatNumber>
//         </Stat>
//         <Stat flex="1" p={4} borderRadius="md" boxShadow="md">
//           <StatLabel fontSize="lg">Total Complaints</StatLabel>
//           <StatNumber fontSize="2xl">{complaints?.length}</StatNumber>
//         </Stat>
//       </Flex>

//       <Divider my={6} />

//       <Flex flexWrap="wrap" gap="4">
//         <Box width={['100%', '50%']}>
//           <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase">
//             Feedbacks ( Posted Today )
//           </Heading>
//           {filteredFeedbacks && filteredFeedbacks.length == 0 && (
//             <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase" >
//               No Feedbacks were posted today...
//             </Heading>
//           )}
//           {filteredFeedbacks && filteredFeedbacks.map((item, index) => (
//             <Box key={index} mb={2} p={2} borderRadius="md" bg={'teal'} color="white">
//               <Text>
//                 [{item.feedback}]
//                 <strong>{item.roll}</strong>
//                 {item.student} ({item.mealOfDay}) : {item.feedbackDescription}
//               </Text>
//             </Box>
//           ))}
//         </Box>

//         <DashboardSection
//           title="Complaints"
//           data={complaints && complaints.slice(0, 5)}
//           renderItem={(complaint, index) => (
//             <Box key={index} mb={2} p={2} borderRadius="md" bg={'red'} color="white">
//               <Text><strong>{complaint.roll}</strong> ({complaint.status}): {complaint.complaintAbout}</Text>
//             </Box>
//           )}
//         />
//       </Flex>
//     </Box>
//   );
// };

// const DashboardSection = ({ title, data, renderItem }) => (
//   <Box width={['100%', '50%']}>
//     <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase">
//       {title}
//     </Heading>
//     {data && data.length == 0 && (
//       <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" textTransform="uppercase" color={'red'}>
//         No {title === 'Leaves (Today)' ? 'Leaves Applied Today' : title === 'Feedbacks (Today)' ? 'Feedback Was Posted Today' : 'Complaints'}.....
//       </Heading>
//     )}
//     {data && data.map((item, index) => renderItem(item, index))}
//   </Box>
// );


// export default Dashboard;