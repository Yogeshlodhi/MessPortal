// // import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Box, Collapse, Heading, Text, useColorModeValue } from '@chakra-ui/react'
// // import React, { useEffect, useState } from 'react'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getAnnouncements, reset } from '../Features/Mess/messSlice';
// // import { InfinitySpin } from 'react-loader-spinner';
// // import { useNavigate } from 'react-router-dom';
// // import UtilFunctions from '../Utils/UtilFunctions';

// // const Announcements = () => {
// //   const bgColor = useColorModeValue('brand.100', 'brand.900');
// //   const textColor = useColorModeValue('gray.800', 'white');

// //   const [openRowId, setOpenRowId] = useState(null);
// //   const toggleRow = (id) => {
// //     setOpenRowId(openRowId === id ? null : id);
// //   };

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { announcements, isError, isSuccess, isLoading, message } = useSelector((state) => state.mess);

// //   useEffect(() => {
// //     if (isError) {
// //       console.log(message)
// //     }
// //     dispatch(getAnnouncements());

// //     return () => {
// //       dispatch(reset())
// //     }
// //   }, [dispatch]);

// //   if (isLoading) {
// //     return (
// //       <Box marginTop={'20%'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
// //         <InfinitySpin
// //           visible={true}
// //           color="#2C3E50"
// //           ariaLabel="infinity-spin-loading"
// //         />
// //         <Heading textAlign={'center'}>Fetching Announcements</Heading>
// //       </Box>
// //     )
// //   }

// //   const announcementList = announcements && announcements.data;

// //   return (
// //     <Box>
// //       <Heading textAlign={'center'} mb={4}>Announcements</Heading>
// //       <TableContainer bg={bgColor} color={textColor}>
// //         <Table variant='striped' colorScheme='teal'>
// //           <Thead>
// //             <Tr>
// //               <Th></Th>
// //               <Th></Th>
// //             </Tr>
// //           </Thead>
// //           <Tbody>
// //             {announcements && announcementList?.map((row, id) => (
// //               <React.Fragment key={id}>
// //                 <Tr onClick={() => toggleRow(id)} cursor={'pointer'}>
// //                   <Td>{row.heading}</Td>
// //                   <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
// //                 </Tr>
// //                 <Tr>
// //                   <Td colSpan={2} style={{ overflowX: 'hidden' }}>
// //                     <Collapse in={openRowId === id} width={'100%'} animateOpacity>
// //                       <Box p='4' bg='teal.500' rounded='md' shadow='md' color='white' whiteSpace={'normal'}>
// //                         {row.description}
// //                       </Box>
// //                     </Collapse>
// //                   </Td>
// //                 </Tr>
// //               </React.Fragment>
// //             ))}
// //           </Tbody>
// //         </Table>
// //       </TableContainer>
// //     </Box>
// //   )
// // }

// // export default Announcements


// import { Table, Thead, Tbody, Tr, Td, Th, TableContainer, Box, Collapse, Heading, Text, useColorModeValue } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAnnouncements, reset } from '../Features/Mess/messSlice';
// import { InfinitySpin } from 'react-loader-spinner';
// import { useNavigate } from 'react-router-dom';
// import UtilFunctions from '../Utils/UtilFunctions';

// const Announcements = () => {
//   const bgColor = useColorModeValue('brand.100', 'brand.900');
//   const textColor = useColorModeValue('gray.800', 'white');

//   const [openRowId, setOpenRowId] = useState(null);
//   const toggleRow = (id) => {
//     setOpenRowId(openRowId === id ? null : id);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { announcements, isError, isSuccess, isLoading, message } = useSelector((state) => state.mess);

//   useEffect(() => {
//     if (isError) {
//       console.log(message);
//     }
//     dispatch(getAnnouncements());

//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch, isError, message]);

//   if (isLoading) {
//     return (
//       <Box marginTop={'20%'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
//         <InfinitySpin visible={true} color="#2C3E50" ariaLabel="infinity-spin-loading" />
//         <Heading textAlign={'center'}>Fetching Announcements</Heading>
//       </Box>
//     );
//   }

//   const announcementList = announcements && announcements.data;

//   return (
//     <Box p={4}>
//       <Heading textAlign={'center'} mb={4} color={textColor}>Announcements</Heading>
//       <TableContainer bg={bgColor} color={textColor} borderRadius="md" >
//         <Table variant="striped" colorScheme="teal">
//           <Thead>
//             <Tr>
//               <Th fontSize="lg"></Th>
//               <Th fontSize="lg"></Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {announcementList?.map((row, id) => (
//               <React.Fragment key={id}>
//                 <Tr onClick={() => toggleRow(id)} cursor="pointer">
//                   <Td>{row.heading}</Td>
//                   <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
//                 </Tr>
//                 <Tr>
//                   <Td colSpan={2} style={{ overflowX: 'hidden' }}>
//                     <Collapse in={openRowId === id} width="100%" animateOpacity>
//                       <Box p={4} bg="teal.500" roundedBottom="md" color="white" whiteSpace="normal">
//                         {row.description}
//                       </Box>
//                     </Collapse>
//                   </Td>
//                 </Tr>
//               </React.Fragment>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Announcements;


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
    <Box p={4} bg={bgColor} borderRadius={'1rem'}>
      <Heading textAlign="center" mb={4} color={textColor}>Announcements</Heading>
      <TableContainer bg={bgColor} color={textColor} borderRadius="md">
        <Table 
          variant="striped" 
          colorScheme="#FC476C"
          // colorScheme="teal"
        >
          <Thead 
            bg={headingBgColor}
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
                  <Td color={textColor}>{row.heading}</Td>
                  <Td color={textColor}>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
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
