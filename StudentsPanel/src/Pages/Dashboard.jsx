import React, { useEffect } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  useColorModeValue,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getLeaves, reset } from '../Features/Leave/leaveSlice';
import { getMessInfo } from '../Features/Mess/messSlice';
import { useNavigate } from 'react-router-dom';
import UtilFunctions from '../Utils/UtilFunctions';

function Dashboard() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');


  const { student } = useSelector((state) => state.auth);
  const { leaves, isLoading, isError, message } = useSelector((state) => state.leave);
  const { messInfo } = useSelector((state) => state.mess);


  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: 'error',
        duration: 3000,
      })
    }

    if (!student) {
      navigate('/login');
    } else {
      dispatch(getMessInfo());
      dispatch(getLeaves());
    }

    return () => {
      dispatch(reset());
    };
  }, [student, dispatch, navigate]);

  if (isLoading) {
    return <Spinner message={'Fetching Leaves'} />;
  }

  const leavesData = leaves?.data || [];
  const messAmount = messInfo?.mealPrice || 0;

  const totalAmount = leavesData
    .filter((leave) => leave.status === 'Approved')
    .reduce(
      (acc, leave) =>
        acc +
        messAmount *
        UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate)),
      0
    );



  return (
    <Box
      className='flex gap-8 flex-col'
      borderRadius={'0.5rem'}
      padding={'0.5rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
    // height={'100%'}
    >
      <Box className='flex gap-4' alignItems={'center'} justifyContent={isMobile ? 'center' : 'unset'}>
        {/* <TextSnippetIcon style={{ fontSize: '2rem' }} /> */}
        <Heading fontSize={'2rem'} textAlign={'center'} textTransform={'uppercase'}>Leave History</Heading>
      </Box>
      <Box>
        <TableContainer>
          <Table variant='striped' colorScheme='#1D1D1C'>
            <Thead>
              <Tr>
                <Th>Reason</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Duration (in days)</Th>
                <Th>Status</Th>
                <Th>Action Taken By</Th>
                <Th>Amount ( ₹ )</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leavesData.map((leave, index) => (
                <Tr
                  key={index}
                  bg={leave.status === 'Approved' ? '#22c55e' : leave.status === 'Pending' ? '#f97316' : '#dc2626'}
                  color={'white'}
                >
                  <Td className="truncate max-w-xs">{leave.reason}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(leave.startDate))}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(leave.endDate))}</Td>
                  <Td>{UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))}</Td>
                  <Td>{leave.status}</Td>
                  <Td>{leave.actionTakenBy ? leave.actionTakenBy : 'Unnoticed'}</Td>
                  <Td>{messAmount * UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={6} textAlign="center">
                  Total Approved
                </Td>
                <Td>{totalAmount}</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Dashboard;
