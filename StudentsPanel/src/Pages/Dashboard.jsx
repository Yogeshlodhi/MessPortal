import React from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ReactVirtualizedTable from '../Components/DashboardTable';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Heading
} from '@chakra-ui/react'

function Dashboard() {
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
              <Tr>
                <Td>Holiday</Td>
                <Td>16/07/2024</Td>
                <Td>26/07/2024</Td>
                <Td>10</Td>
                <Td>Approved</Td>
                <Td>1500</Td>
              </Tr>
              <Tr>
                <Td>Holiday</Td>
                <Td>16/07/2024</Td>
                <Td>26/07/2024</Td>
                <Td>10</Td>
                <Td>Approved</Td>
                <Td>1500</Td>
              </Tr>
              <Tr>
                <Td>Holiday</Td>
                <Td>16/07/2024</Td>
                <Td>26/07/2024</Td>
                <Td>10</Td>
                <Td>Approved</Td>
                <Td>1500</Td>
              </Tr>
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
