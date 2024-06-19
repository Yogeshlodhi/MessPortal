// import React from 'react';
// import { Box, Heading, Text, Flex, Stat, StatLabel, StatNumber, Divider } from '@chakra-ui/react';

// import { useSelector, useDispatch } from 'react-redux';
// import { getStudentsList } from '../Features/Students/studentSlice';
// import { useEffect } from 'react';
// import { getLeavesList } from '../Features/Leaves/leaveSlice';
// import { getAllFeedbacks } from '../Features/Feedback/feedBackSlice';
// import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions';
// import { getComplaintsList } from '../Features/Complaints/complaintSlice';
// import Spinner from '../Components/Spinner'


// const Dashboard = () => {

//   const dispatch = useDispatch();

//   const { studentsList } = useSelector(state => state.students);
//   const { LeavesList } = useSelector(state => state.leaves);
//   const { feedbacks } = useSelector(state => state.feedbacks);
//   const { complaints } = useSelector(state => state.complaints);

//   useEffect(() => {
//     dispatch(getStudentsList());
//     dispatch(getLeavesList());
//     dispatch(getAllFeedbacks());
//     dispatch(getComplaintsList())
//   }, [dispatch])


//   const isToday = (date) => {
//     const today = new Date();
//     return date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear();
//   };



//   const filteredLeaves = LeavesList.filter(leave => {
//     const appliedDate = new Date(leave.appliedDate);
//     return isToday(appliedDate) && leave.studentRoll !== 'Student Does Not Exist Anymore';
//   });

//   if (!studentsList || !LeavesList || !feedbacks || !complaints) {
//     return <Spinner message={'Loading Data .....'}/>
//   }

//   return (
//     <Box p={4}>
//       <Heading mb={4} fontSize="2xl" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Mess Management Dashboard</Heading>

//       <Flex mb={8}>
//         <Stat flex="1" mr={4} 
//           // bg="gray.100" 
//           p={4} borderRadius="md"
//           border={'1px solid'}
//         >
//           <StatLabel fontSize={'1.5rem'}>Total Students</StatLabel>
//           {/* <StatNumber fontSize="1.5rem">{studentsList && studentsList.length}</StatNumber> */}
//         </Stat>

//         <Stat flex="1" mr={4} 
//           // bg="gray.100" 
//           p={4} borderRadius="md"
//           border={'1px solid'}
//         >
//           <StatLabel fontSize={'1.5rem'}>Total Leaves</StatLabel>
//           {/* <StatNumber fontSize={'1.5rem'}>{LeavesList && LeavesList.length}</StatNumber> */}
//         </Stat>

//         <Stat flex="1" mr={4} 
//           // bg="gray.100" 
//           p={4} borderRadius="md"
//           border={'1px solid'}
//         >
//           <StatLabel fontSize={'1.5rem'}>Total Feedbacks</StatLabel>
//           {/* <StatNumber fontSize={'1.5rem'}>{feedbacks && feedbacks.length}</StatNumber> */}
//         </Stat>

//         <Stat flex="1" 
//           // bg="gray.100" 
//           p={4} borderRadius="md"
//           border={'1px solid'}
//         >
//           <StatLabel fontSize={'1.5rem'}>Total Complaints</StatLabel>
//           {/* <StatNumber fontSize={'1.5rem'}>{complaints && complaints.data.length}</StatNumber> */}
//         </Stat>
//       </Flex>

//       <Divider mb={6} />

//       <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'2rem'}>
//         <Box width={'50%'}>
//           <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Leaves</Heading>
//           {/* {filteredLeaves && filteredLeaves.slice(0, 5).map((leave, index) => (
//             <Box key={index} mb={2} p={2} borderRadius="md" 
//               background={leave.status === 'Pending' ? 'orange' :
//                 leave.status === 'Approved' ? 'green' :
//                   'red'
//               }
//             >

//               <Text>{leave.studentRoll} - {UtilFunctions.formatDate(new Date(leave.startDate))}  to {UtilFunctions.formatDate(new Date(leave.endDate))} ({leave.status})</Text>
//             </Box>
//           ))} */}
//         </Box>
//         <Box width={'50%'}>
//           <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Feedbacks</Heading>
//           {/* {feedbacks && feedbacks.slice(0, 5).map((feedback, index) => (
//             <Box key={index} mb={2} p={2} borderRadius="md" color={'white'} background={feedback.feedback > 5 ? 'green' : 'red'}>
//               <Text><strong>{feedback.studentRoll}</strong> ({feedback.mealOfDay}) {' '}:{' '}{feedback.feedbackDescription}</Text>
//             </Box>
//           ))} */}
//         </Box>
//       </Box>

//       <Divider my={6} />

//       <Box>
//         <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform={'uppercase'}>Complaints</Heading>
//         {/* {complaints && complaints.data.slice(0, 5).map((complaint, index) => (
//           <Box key={index} mb={2} bg="gray.100" p={2} borderRadius="md">
//             <Text><strong>{complaint.roll}</strong> ({complaint.status}): {complaint.complaintAbout}</Text>
//           </Box>
//         ))} */}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Box, Heading, Flex, Stat, StatLabel, StatNumber, Divider, Text } from '@chakra-ui/react';
import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions'; // Ensure this import is correct

const Dashboard = () => {
  // Sample data for demonstration
  const studentsList = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
  ];

  const LeavesList = [
    { id: 1, studentRoll: '12345', appliedDate: '2023-06-15', startDate: '2023-06-16', endDate: '2023-06-18', status: 'Pending' },
    { id: 2, studentRoll: '67890', appliedDate: '2023-06-14', startDate: '2023-06-15', endDate: '2023-06-17', status: 'Approved' },
    { id: 3, studentRoll: '54321', appliedDate: '2023-06-16', startDate: '2023-06-17', endDate: '2023-06-19', status: 'Rejected' },
    { id: 4, studentRoll: '98765', appliedDate: '2023-06-16', startDate: '2023-06-16', endDate: '2023-06-17', status: 'Pending' },
    { id: 5, studentRoll: '24680', appliedDate: '2023-06-15', startDate: '2023-06-18', endDate: '2023-06-19', status: 'Approved' },
  ];

  const feedbacks = [
    { id: 1, studentRoll: '12345', mealOfDay: 'Breakfast', feedbackDescription: 'Good food today.', feedback: 4 },
    { id: 2, studentRoll: '67890', mealOfDay: 'Lunch', feedbackDescription: 'The lunch was cold.', feedback: 2 },
    { id: 3, studentRoll: '54321', mealOfDay: 'Dinner', feedbackDescription: 'Delicious dinner!', feedback: 5 },
  ];

  const complaints = {
    data: [
      { id: 1, roll: '12345', complaintAbout: 'Mess food quality', status: 'Pending' },
      { id: 2, roll: '67890', complaintAbout: 'Mess cleanliness', status: 'Resolved' },
      { id: 3, roll: '54321', complaintAbout: 'Late night food availability', status: 'Pending' },
    ],
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Filter leaves that are applied for today and exclude non-existing students
  const filteredLeaves = LeavesList.filter(leave => {
    const appliedDate = new Date(leave.appliedDate);
    return isToday(appliedDate) && leave.studentRoll !== 'Student Does Not Exist Anymore';
  });

  return (
    <Box p={4}>
      <Heading mb={4} fontSize="2xl" fontWeight="bold" color="teal.500" textTransform="uppercase">
        Mess Management Dashboard
      </Heading>

      <Flex flexWrap="wrap" gap="4">
        <StatBox label="Total Students" value={studentsList.length} />
        <StatBox label="Total Leaves" value={LeavesList.length} />
        <StatBox label="Total Feedbacks" value={feedbacks.length} />
        <StatBox label="Total Complaints" value={complaints.data.length} />
      </Flex>

      <Divider my={6} />

      <Flex flexWrap="wrap" gap="4">
        <DashboardSection
          title="Leaves"
          data={filteredLeaves}
          renderItem={(leave, index) => (
            <Box key={index} mb={2} p={2} borderRadius="md" bg={leave.status === 'Pending' ? 'orange' : leave.status === 'Approved' ? 'green' : 'red'}>
              <Text>{leave.studentRoll} - {UtilFunctions.formatDate(new Date(leave.startDate))} to {UtilFunctions.formatDate(new Date(leave.endDate))} ({leave.status})</Text>
            </Box>
          )}
        />

        <DashboardSection title="Feedbacks" data={feedbacks.slice(0, 5)} renderItem={(feedback, index) => (
          <Box key={index} mb={2} p={2} borderRadius="md" bg={feedback.feedback > 5 ? 'green' : 'red'}>
            <Text><strong>{feedback.studentRoll}</strong> ({feedback.mealOfDay}): {feedback.feedbackDescription}</Text>
          </Box>
        )} />

        <DashboardSection title="Complaints" data={complaints.data.slice(0, 5)} renderItem={(complaint, index) => (
          <Box key={index} mb={2} p={2} borderRadius="md" bg="gray.100">
            <Text><strong>{complaint.roll}</strong> ({complaint.status}): {complaint.complaintAbout}</Text>
          </Box>
        )} />
      </Flex>
    </Box>
  );
};

const StatBox = ({ label, value }) => (
  <Stat flex="1" p={4} borderRadius="md" bg="white" boxShadow="md">
    <StatLabel fontSize="lg">{label}</StatLabel>
    <StatNumber fontSize="2xl">{value}</StatNumber>
  </Stat>
);

const DashboardSection = ({ title, data, renderItem }) => (
  <Box width={['100%', '50%']}>
    <Heading size="lg" mb={4} fontSize="lg" fontWeight="bold" color="teal.500" textTransform="uppercase">
      {title}
    </Heading>
    {data.map((item, index) => renderItem(item, index))}
  </Box>
);

export default Dashboard;
