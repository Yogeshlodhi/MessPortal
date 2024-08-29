import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Box, Collapse, Heading, useColorModeValue, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, reset } from '../Features/Mess/messSlice';
import { InfinitySpin } from 'react-loader-spinner';
import UtilFunctions from '../Utils/UtilFunctions';

const Announcements = () => {
  const textColor = useColorModeValue('gray.800', 'white');

  const [openRowId, setOpenRowId] = useState(null);
  const toggleRow = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  const dispatch = useDispatch();
  const { announcements, isError, isLoading, message } = useSelector((state) => state.mess);

  // console.log(announcements)


  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAnnouncements());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return (
      <Box marginTop="20%" display="flex" alignItems="center" justifyContent="center" flexDir="column">
        <InfinitySpin visible={true} color="#2C3E50" ariaLabel="infinity-spin-loading" />
        <Heading textAlign="center">Fetching Announcements</Heading>
      </Box>
    );
  }

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  return (
    <Box
      p={4}
      borderRadius={'1rem'}
      padding={'0.5rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
      // height={'100%'}
    >
      <Heading
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >
        Announcements
      </Heading>
      <TableContainer bg={bgColor} borderRadius="md">
        {
          announcements && announcements.length === 0 ? (
            <Text textAlign={'center'} mt={4} color={'red'}>No active announcements to show</Text>
          ) : (
            <Table
              variant="striped"
              colorScheme='#1D1D1C'
            >
              <Thead>
                <Tr>
                  <Th fontSize="lg">Title</Th>
                  <Th fontSize="lg">Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {announcements && announcements?.map((row, id) => (
                  <React.Fragment key={id}>
                    <Tr 
                      onClick={() => toggleRow(id)} 
                      cursor="pointer" 
                      background={'#006060'}
                      color={'white'}
                    >
                      <Td>{row.heading}</Td>
                      <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
                    </Tr>
                    <Tr>
                      <Td colSpan={2} style={{ overflowX: 'hidden' }}>
                        <Collapse in={openRowId === id} width="100%" animateOpacity>
                          <Box p={4}
                            rounded="md" shadow="md" color={textColor} whiteSpace="normal">
                            {row.description}
                          </Box>
                        </Collapse>
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))}
              </Tbody>
            </Table>
          )
        }
      </TableContainer>
    </Box>
  );
};

export default Announcements;
