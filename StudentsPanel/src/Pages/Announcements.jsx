import { Table, Thead, Tbody, Tr, Td, TableContainer, Box, Collapse, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, reset } from '../Features/Mess/messSlice';
import { InfinitySpin } from 'react-loader-spinner';

const Announcements = () => {
  const rowData = [
    {
      id: 1,
      title: "Announcement 1",
      details: "Details for Row 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum."
    },
    {
      id: 2,
      title: "Announcement 2",
      details: "Details for Row 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum."
    },
    {
      id: 3,
      title: "Announcement 3",
      details: "Details for Row 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum."
    }
  ];

  const [openRowId, setOpenRowId] = useState(null);
  const toggleRow = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  const dispatch = useDispatch();
  const { announcements, isError, isSuccess, isLoading, message } = useSelector((state) => state.mess);

  // useEffect(() => {
  //   if(isError){
  //     console.log(message)
  //   }

    
  //   // return () => {
  //     //   dispatch(reset())
  //     // }
      
  //   },[dispatch, isError, isSuccess, message, announcements])
    
    // dispatch(getAnnouncements());
  console.log(announcements)
  
  if (isLoading) {
    return (
      <Box marginTop={'20%'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
        <InfinitySpin
          visible={true}
          color="#2C3E50"
          ariaLabel="infinity-spin-loading"
        />
        <Heading textAlign={'center'}>Fetching Announcements</Heading>
      </Box>
    )
  }

  return (
    <Box padding={'2rem'}>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr textAlign={'center'} justifyContent={'center'}>
              Announcements
            </Tr>
          </Thead>
          <Tbody>
            {rowData.map((row) => (
              <React.Fragment key={row.id}>
                <Tr onClick={() => toggleRow(row.id)} cursor={'pointer'}>
                  <Td>{row.title}</Td>
                </Tr>
                <Tr>
                  <Td colSpan={1}>
                    <Collapse in={openRowId === row.id} width={'100%'} animateOpacity>
                      <Box p='4' bg='teal.500' rounded='md' shadow='md' color='white'>
                        {row.details}
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Announcements
