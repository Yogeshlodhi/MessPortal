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
  Heading
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';

import { getLeaves, reset } from '../Features/Leave/leaveSlice';
import { useNavigate } from 'react-router-dom';
import UtilFunctions from '../Utils/UtilFunctions';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student } = useSelector((state) => state.auth)
  const { leaves, isLoading, isError, message } = useSelector((state) => state.leave)

  useEffect(() => {

    if (isError) {
      console.log(message)
    }

    if (!student) {
      navigate('/login')
    }
    else{
      dispatch(getLeaves())
    }

    return () => {
      dispatch(reset())
    }

  }, [student, navigate, isError, message])


  if (isLoading) {
    return (
      <Box marginTop={'20%'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
        <InfinitySpin
          visible={true}
          color="#2C3E50"
          ariaLabel="infinity-spin-loading"
        />
        <Heading textAlign={'center'}>Fetching Leaves</Heading>
      </Box>
    )
  }

  const leavesData = leaves && leaves.data;

  return (
    <Box padding={'2rem'} className='flex gap-8 flex-col'>

      <Box className='flex gap-4' alignItems={'center'}>
        <TextSnippetIcon style={{ fontSize: '2rem' }} />
        <Heading fontSize={'2rem'}>Leave History</Heading>
      </Box>
      <Box>
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
                  <Td>1500</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={5} textAlign="center">Total</Td>
                <Td>24000</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Dashboard
