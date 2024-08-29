import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnnounce, getAnnouncementList, deleteAnnounce, reset } from '../Features/Announcements/announceSlice';
import {
  Table, Thead, Tbody,
  Tr, Td, Th, TableContainer,
  Box, Collapse, Heading,
  Button, Modal, ModalOverlay,
  ModalContent, ModalHeader,
  ModalFooter, ModalBody,
  ModalCloseButton, FormControl,
  FormLabel, Input, useDisclosure,
  Textarea,
  useColorModeValue,
  useToast,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import UtilFunctions from '../Utils/UtilFunctions'
import Spinner from '../Components/Spinner';
import AddIcon from '@mui/icons-material/Add';


const Announcements = () => {
  const dispatch = useDispatch();
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  const toast = useToast();
  const { announcements, isLoading, isError, message, isSuccess } = useSelector((state) => state.announcements);
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('gray.800', 'white');

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  useEffect(() => {
    dispatch(getAnnouncementList());
    return () => {
      dispatch(reset());
    }
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

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: 'error',
        duration: 3000
      })
    }
  }, [isError])


  const toggleRow = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  const handleModalClose = () => {
    resetForm();
    onAddClose();
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast({
        title: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      dispatch(reset())
    }

    if (isError && !isSuccess) {
      toast({
        title: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      dispatch(reset())
    }
  }, [dispatch, message])

  if (isLoading) {
    return <Spinner message={'Please Wait .....'} />;
  }

  return (
    <Box
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      bg={bgColor}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
      gap={'1rem'}
      borderRadius={'1rem'}
      padding={'1rem'}
    // height={'100%'}
    >
      <Heading
        mb={4}
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
      >Announcements</Heading>
      <Button
        onClick={onAddOpen}
        colorScheme='green'
      >
        <AddIcon />
      </Button>
      <TableContainer>
        {announcements && announcements.length === 0 ? (
          <Text textAlign={'center'} mt={4} color={'red'}>No Announcements Made Till Now....</Text>
        ) : (

          <Table variant='striped' colorScheme='#1D1D1C'>
            <Thead>
              <Tr>
                <Th>Heading</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                announcements && announcements.map((row, id) => (
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
                            flexDirection={isMobile ? 'column' : 'row'}
                            alignItems={isMobile ? 'flex-start' : 'center'}
                            gap={'1rem'}
                          >
                            {row.description}
                            <Button
                              background="#ff0101"
                              _hover={{ background: '#d80000' }}
                              color={'white'} onClick={() => handleDeleteClick(row)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Collapse>
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))
              }
            </Tbody>
          </Table>
        )
        }
      </TableContainer>

      {/* Add Announcement Modal */}
      <Modal isOpen={isAddOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent
          bg={bgColor}
          color={textColor}
          marginLeft={'0.5rem'}
          marginRight={'0.5rem'}
          alignSelf={'center'}
        >
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
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
            <FormControl id="description" mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                placeholder="Announcement Description"
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleFormSubmit}
            >
              Add Announcement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor} color={textColor} marginLeft={'0.5rem'}
          marginRight={'0.5rem'}
          alignSelf={'center'}>
          <ModalHeader>Delete Announcement</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            Are you sure you want to delete this announcement?
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={handleDeleteConfirm}
              background="#ff0101"
              _hover={{ background: '#d80000' }}
              color={'white'}
            >
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
