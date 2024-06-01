import React from 'react';
import { Box, Heading, Text, Flex, Stat, StatLabel, StatNumber, Divider, Badge } from '@chakra-ui/react';
import { FaLeaf, FaRegComment, FaExclamationTriangle } from 'react-icons/fa';

const dummyData = {
  totalStudents: 150,
  leaves: [
    { student: 'John Doe', startDate: '2024-05-25', endDate: '2024-05-28', status: 'Approved' },
    { student: 'Jane Smith', startDate: '2024-05-30', endDate: '2024-06-02', status: 'Pending' },
  ],
  feedback: [
    { student: 'Alice Johnson', date: '2024-05-30', content: 'Great service at the cafeteria!' },
    { student: 'Bob Williams', date: '2024-05-31', content: 'The Wi-Fi is too slow.' },
  ],
  complaints: [
    { student: 'Eva Martinez', date: '2024-05-29', issue: 'No hot water in bathrooms.' },
    { student: 'Michael Davis', date: '2024-05-30', issue: 'AC not working in room 203.' },
  ],
};

const Dashboard = () => {
  return (
    <Box p={4}>
      <Heading mb={4} fontSize="2xl" fontWeight="bold" color="teal.500">Mess Management Dashboard</Heading>

      <Flex mb={8}>
        <Stat flex="1" mr={4} bg="gray.100" p={4} borderRadius="md">
          <StatLabel>Total Students</StatLabel>
          <StatNumber fontSize="2xl">{dummyData.totalStudents}</StatNumber>
        </Stat>

        <Stat flex="1" mr={4} bg="gray.100" p={4} borderRadius="md">
          <StatLabel>Total Leaves</StatLabel>
          <StatNumber fontSize="2xl">{dummyData.leaves.length}</StatNumber>
        </Stat>

        <Stat flex="1" mr={4} bg="gray.100" p={4} borderRadius="md">
          <StatLabel>Total Feedbacks</StatLabel>
          <StatNumber fontSize="2xl">{dummyData.feedback.length}</StatNumber>
        </Stat>

        <Stat flex="1" bg="gray.100" p={4} borderRadius="md">
          <StatLabel>Total Complaints</StatLabel>
          <StatNumber fontSize="2xl">{dummyData.complaints.length}</StatNumber>
        </Stat>
      </Flex>

      <Divider mb={6} />

      <Box>
        <Heading size="md" mb={4} fontSize="lg" fontWeight="bold" color="teal.500">
          <FaLeaf /> Leaves
        </Heading>
        {dummyData.leaves.map((leave, index) => (
          <Box key={index} mb={2} bg="gray.100" p={2} borderRadius="md">
            <Text>{leave.student} - {leave.startDate} to {leave.endDate} ({leave.status})</Text>
          </Box>
        ))}
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="md" mb={4} fontSize="lg" fontWeight="bold" color="teal.500">
          <FaRegComment /> Feedbacks
        </Heading>
        {dummyData.feedback.map((feedback, index) => (
          <Box key={index} mb={2} bg="gray.100" p={2} borderRadius="md">
            <Text><strong>{feedback.student}</strong> ({feedback.date}): {feedback.content}</Text>
          </Box>
        ))}
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="md" mb={4} fontSize="lg" fontWeight="bold" color="teal.500">
          <FaExclamationTriangle /> Complaints
        </Heading>
        {dummyData.complaints.map((complaint, index) => (
          <Box key={index} mb={2} bg="gray.100" p={2} borderRadius="md">
            <Text><strong>{complaint.student}</strong> ({complaint.date}): {complaint.issue}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
