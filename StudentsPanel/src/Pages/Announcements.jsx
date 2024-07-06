import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Box, Collapse, Heading, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, reset } from '../Features/Mess/messSlice';
import { InfinitySpin } from 'react-loader-spinner';
import UtilFunctions from '../Utils/UtilFunctions';

const Announcements = () => {
  // const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const headingBgColor = useColorModeValue('gray.200', 'gray.700');
  const descriptionBgColor = useColorModeValue('teal.100', 'teal.600');
  const tableRowBgColor = useColorModeValue('gray.50', 'darkMode.primaryBg');

  const [openRowId, setOpenRowId] = useState(null);
  const toggleRow = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  const dispatch = useDispatch();
  const { announcements, isError, isLoading, message } = useSelector((state) => state.mess);

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

  const announcementList = announcements && announcements.data;
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  return (
    <Box
      p={4}
      borderRadius={'1rem'}
      padding={'0.5rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
      height={'100%'}
    >
      <Heading
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >
        Announcements
      </Heading>
      <TableContainer bg={bgColor} borderRadius="md">
        <Table
          variant="striped"
          colorScheme='#1D1D1C'
        >
          <Thead
          // bg={headingBgColor}
          >
            <Tr>
              <Th fontSize="lg">Title</Th>
              <Th fontSize="lg">Date</Th>
            </Tr>
          </Thead>
          <Tbody
          // bg={tableRowBgColor}
          >
            {announcementList?.map((row, id) => (
              <React.Fragment key={id}>
                <Tr onClick={() => toggleRow(id)} cursor="pointer">
                  <Td>{row.heading}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
                </Tr>
                <Tr>
                  <Td colSpan={2} style={{ overflowX: 'hidden' }}>
                    <Collapse in={openRowId === id} width="100%" animateOpacity>
                      <Box p={4}
                        // bg={'#FC476C'} 
                        // bg={descriptionBgColor} 
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
      </TableContainer>
    </Box>
  );
};

export default Announcements;
