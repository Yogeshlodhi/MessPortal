import { Table, Thead, Tbody, Tr, Td, TableContainer, Box, Collapse, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, reset } from '../Features/Mess/messSlice';
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import UtilFunctions from '../Utils/UtilFunctions';

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
  const navigate = useNavigate();
  const { announcements, isError, isSuccess, isLoading, message } = useSelector((state) => state.mess);

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getAnnouncements());

    return () => {
      dispatch(reset())
    }
  }, [dispatch]);

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

  const announcementList = announcements && announcements.data;

  return (
    <Box>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr textAlign={'center'} justifyContent={'center'}>
              <Heading>
                Announcements
              </Heading>
            </Tr>
          </Thead>
          <Tbody>
            {announcements && announcementList?.map((row, id) => (
              <React.Fragment key={id}>
                <Tr onClick={() => toggleRow(id)} cursor={'pointer'}>
                  <Td display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'50%'}>
                    <Text>
                      {row.heading}
                    </Text>
                    <Text>
                      {UtilFunctions.formatDate(new Date(row.createdAt))}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={1} style={{ overflowX: 'hidden' }}>
                    <Collapse in={openRowId === id} width={'100%'} animateOpacity>
                      <Box p='4' bg='teal.500' rounded='md' shadow='md' color='white' whiteSpace={'normal'}>
                        {row.description}
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

