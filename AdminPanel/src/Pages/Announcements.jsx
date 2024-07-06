// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAnnounce, getAnnouncementList, reset } from '../Features/Announcements/announceSlice';
// import { 
//   Table, Thead, Tbody, 
//   Tr, Td, Th, TableContainer, 
//   Box, Collapse, Heading, 
//   Text, useColorModeValue, Button,
//   Modal, ModalOverlay, ModalContent,
//   ModalHeader, ModalFooter, ModalBody,
//   ModalCloseButton, FormControl, FormLabel,
//   Input, useDisclosure, Textarea,
//   useMediaQuery
// } from '@chakra-ui/react';
// import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions';
// import Spinner from '../Components/Spinner'

// const Announcements = () => {
//   const dispatch = useDispatch();
//   const { announcements, isLoading } = useSelector((state) => state.announcements);

//   const [isMobile] = useMediaQuery('(max-width: 600px)')

//   useEffect(() => {
//     dispatch(getAnnouncementList());
//   }, [dispatch]);

//   const [openRowId, setOpenRowId] = useState(null);
//   const toggleRow = (id) => {
//     setOpenRowId(openRowId === id ? null : id);
//   };

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [formData, setFormData] = useState({
//     heading: '',
//     description: '',
//   })
//   const {heading, description} = formData;

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const newAnnouncement = {
//       heading,
//       description
//     }
//     dispatch(addAnnounce(newAnnouncement));
//     // dispatch(reset());
//     resetForm();
//     onClose();
//   };

//   const resetForm = () => {
//     setFormData({
//       heading: '',
//       description: '',
//     });
//   };

//   if(isLoading){
//     return <Spinner message={'Please Wait .....'}/>
//   }

//   return (
//     <Box>
//       <Heading textAlign={'center'} mb={4}>Announcements</Heading>
//       <Button onClick={onOpen} colorScheme='blue'>Add</Button>
//       <TableContainer>
//         <Table variant='striped' colorScheme='teal'>
//           <Thead>
//             <Tr>
//               <Th></Th>
//               <Th>Date</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {announcements.map((row, id) => (
//               <React.Fragment key={id} >
//                 <Tr onClick={() => toggleRow(id)} cursor={'pointer'}>
//                   <Td>{row.heading}</Td>
//                   <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
//                 </Tr>
//                 <Tr>
//                   <Td colSpan={2} style={{ overflowX: 'hidden' }}>
//                     <Collapse in={openRowId === id} width={'100%'} animateOpacity>
//                       <Box 
//                         p='4' 
//                         bg='teal.500' 
//                         rounded='md' 
//                         shadow='md' 
//                         color='white' 
//                         whiteSpace={'normal'} 
//                         display={'flex'} 
//                         justifyContent={'space-between'} 
//                         flexDirection={isMobile ? 'column' : 'row'}
//                         alignItems={'center'}
//                         gap={'1rem'}
//                       >
//                         {row.description}
//                         <Button background={'red'} color={'white'} alignSelf={isMobile ? 'flex-start' : ''}>
//                           Delete
//                         </Button>
//                       </Box>
//                     </Collapse>
//                   </Td>
//                 </Tr>
//               </React.Fragment>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>

//       <Modal  size={isMobile ? 'sm' : 'lg'}  isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add New Announcement</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//               <FormControl id="heading" isRequired>
//                 <FormLabel>Heading</FormLabel>
//                 <Input 
//                   name="heading" 
//                   value={heading} 
//                   onChange={handleInputChange} 
//                   placeholder="Announcement Heading" 
//                 />
//               </FormControl>
//               <FormControl id="description" mt={4} isRequired>
//                 <FormLabel>Description</FormLabel>
//                 <Textarea 
//                   name="description" 
//                   value={description} 
//                   onChange={handleInputChange} 
//                   placeholder="Announcement Description" 
//                 />
//               </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
//               Add Announcement
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Announcements;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnnounce, getAnnouncementList, deleteAnnounce } from '../Features/Announcements/announceSlice';
import { 
  Table, Thead, Tbody, 
  Tr, Td, Th, TableContainer, 
  Box, Collapse, Heading, 
  Button, Modal, ModalOverlay, 
  ModalContent, ModalHeader, 
  ModalFooter, ModalBody, 
  ModalCloseButton, FormControl, 
  FormLabel, Input, useDisclosure, 
  Textarea 
} from '@chakra-ui/react';
import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions';
import Spinner from '../Components/Spinner';

const Announcements = () => {
  const dispatch = useDispatch();
  const { announcements, isLoading } = useSelector((state) => state.announcements);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  useEffect(() => {
    dispatch(getAnnouncementList());
  }, [dispatch]);

  const [openRowId, setOpenRowId] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);


  const [formData, setFormData] = useState({
    heading: '',
    description: '',
  });

  const { heading, description } = formData;

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      heading,
      description,
    };
    dispatch(addAnnounce(newAnnouncement));
    resetForm();
    onAddClose();
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteAnnounce(selectedAnnouncement._id))
    // dispatch(getAnnouncementList()); 
    setSelectedAnnouncement(null);
    onDeleteClose();
  };

  const handleDeleteClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    onDeleteOpen();
  };

  const resetForm = () => {
    setFormData({
      heading: '',
      description: '',
    });
  };
    const toggleRow = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  const handleModalClose = () => {
    resetForm();
    onAddClose();
  };

  if (isLoading) {
    return <Spinner message={'Please Wait .....'} />;
  }

  return (
    <Box>
      <Heading textAlign={'center'} mb={4}>Announcements</Heading>
      <Button onClick={onAddOpen}>Add</Button>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Heading</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {announcements.map((row, id) => (
              <React.Fragment key={id}>
                <Tr onClick={() => toggleRow(id)} cursor={'pointer'}>
                  <Td>{row.heading}</Td>
                  <Td>{UtilFunctions.formatDate(new Date(row.createdAt))}</Td>
                </Tr>
                <Tr>
                  <Td colSpan={2} style={{ overflowX: 'hidden' }}>
                    <Collapse in={openRowId === id} width={'100%'} animateOpacity>
                      <Box 
                        p='4' 
                        bg='teal.500' 
                        rounded='md' 
                        shadow='md' 
                        color='white' 
                        whiteSpace={'normal'} 
                        display={'flex'} 
                        justifyContent={'space-between'} 
                        alignItems={'center'}
                      >
                        {row.description}
                        <Button background={'red'} color={'white'} onClick={() => handleDeleteClick(row)}>
                          Delete
                        </Button>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Add Announcement Modal */}
      <Modal isOpen={isAddOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="heading" isRequired>
              <FormLabel>Heading</FormLabel>
              <Input 
                name="heading" 
                value={heading} 
                onChange={handleInputChange} 
                placeholder="Announcement Heading" 
              />
            </FormControl>
            <FormControl id="description" mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea 
                name="description" 
                value={description} 
                onChange={handleInputChange} 
                placeholder="Announcement Description" 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
              Add Announcement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this announcement?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Announcements;
