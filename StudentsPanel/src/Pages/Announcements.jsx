// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Td,
//   TableContainer,
//   Box,
// } from '@chakra-ui/react'
// import React, { useState } from 'react'

// const Announcements = () => {
//   const rowData = [
//     {
//       id: 1,
//       title: "Row 1",
//       details: "Details for Row 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum."
//     },
//     {
//       id: 2,
//       title: "Row 2",
//       details: "Details for Row 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum."
//     },
//     {
//       id: 3,
//       title: "Row 3",
//       details: "Details for Row 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum."
//     }
//   ];

//   const [openRowId, setOpenRowId] = useState(null);
//   const toggleRow = (id) => {
//     setOpenRowId(openRowId === id ? null : id);
//   };

//   return (
//     <Box padding={'2rem'}>
//       <TableContainer>
//         <Table variant='striped' colorScheme='teal'>
//           <Thead>
//             <Tr textAlign={'center'} justifyContent={'center'}>
//               Announcements
//             </Tr>
//           </Thead>
//           <Tbody background={'red'}>
//             {rowData.map((row) => (
//               <Box width={'100%'}>
//                 <Box key={row.id} background={'green'}>
//                   <Tr onClick={() => toggleRow(row.id)} cursor={'pointer'}>
//                     <Td>{row.details}</Td>
//                   </Tr>
//                 </Box>
//                 {openRowId === row.id && (
//                   <Box>
//                     <Box>
//                       {row.details}
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             ))}
//           </Tbody>

//         </Table>
//       </TableContainer>
//     </Box>
//   )
// }

// export default Announcements


import { Table, Thead, Tbody, Tr, Td, TableContainer, Box, Collapse } from '@chakra-ui/react'
import React, { useState } from 'react'

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
