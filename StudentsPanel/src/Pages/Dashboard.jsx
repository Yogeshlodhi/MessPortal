import React, { useEffect } from 'react'
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
  useColorModeValue
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getLeaves, reset } from '../Features/Leave/leaveSlice';
import { getMessInfo } from '../Features/Mess/messSlice';
import { useNavigate } from 'react-router-dom';
import UtilFunctions from '../Utils/UtilFunctions';

function Dashboard() {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student } = useSelector((state) => state.auth)
  const { leaves, isLoading, isError, message } = useSelector((state) => state.leave)
  const { messInfo } = useSelector(state => state.mess);

  useEffect(() => {

    if (isError) {
      console.log(message)
    }

    if (!student) {
      navigate('/login')
    }
    else {
      dispatch(getMessInfo())
      dispatch(getLeaves())
    }

    return () => {
      dispatch(reset())
    }

  }, [student, navigate, dispatch, isError, message])


  if (isLoading) {
    return (
      <Spinner message={'Fetching Leaves'} />
    )
  }

  const leavesData = leaves && leaves.data;
  const messAmount = messInfo && messInfo.data?.mealPrice;
  const totalAmount = leavesData ? leavesData.reduce((acc, leave) => acc + messAmount * UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate)), 0) : 0;

  return (
    <Box
      className='flex gap-8 flex-col'
    >

      <Box className='flex gap-4' alignItems={'center'}>
        <TextSnippetIcon style={{ fontSize: '2rem' }} />
        <Heading fontSize={'2rem'}>Leave History</Heading>
      </Box>
      <Box
      >
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Reason</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Duration (in days)</Th>
                <Th>Status</Th>
                <Th>Amount ( ₹ )</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaves && leaves.data && leavesData.map((leave, index) => (
                <Tr key={index}>
                  <Td>{leave.reason}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(leave.startDate))}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(leave.endDate))}</Td>
                  <Td>{UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))}</Td>
                  <Td>{leave.status}</Td>
                  <Td>{messAmount * UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={5} textAlign="center">Total</Td>
                <Td>
                  {totalAmount}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Dashboard
