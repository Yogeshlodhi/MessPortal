import React, { useEffect, useState } from "react";
import {
  Box, Flex, Text, Button, IconButton, Heading, Grid, Icon, ButtonGroup,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, useMediaQuery,
  useColorModeValue,
  Image,
  useToast
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsList, deleteComplaint } from "../Features/Complaints/complaintSlice";
import Spinner from "../Components/Spinner";

const ComplaintsList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { complaints, isLoading, isLoadingComplaints, complaintsMessage, isError, isComplaintSuccess } = useSelector(state => state.complaints);
  const { admin } = useSelector(state => state.auth);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isMobile] = useMediaQuery('(max-width : 600px)')

  useEffect(() => {
    dispatch(getComplaintsList());
  }, [dispatch]);

  useEffect(() => {
    if(isComplaintSuccess){
      toast({
        title: complaintsMessage,
        isClosable: true,
        status: 'success',
        duration: 3000
      })
    }
  }, [complaintsMessage])

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    onOpen();
  };

  const handleResolve = (complaint) => {
    // console.log(complaint)
    dispatch(deleteComplaint(complaint._id));
    dispatch(getComplaintsList());
  };

  if (isLoading) return <Spinner message={'Loading Complaints....'} />;

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('gray.800', 'white');

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
      >
        Complaints
      </Heading>
      {complaints.length === 0 ? (
        <Text color={'red'}>No Complaints Available....</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
          {complaints.map((complaint, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold" fontSize="lg" className="overflow-hidden overflow-ellipsis whitespace-nowrap">{complaint.complaintAbout}</Text>
                {admin.adminType === 'Warden' && (
                  <IconButton
                    icon={<Icon as={MdClose} />}
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Close"
                    onClick={() => handleResolve(complaint)}
                  />
                )}
              </Flex>
              <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {complaint.description}
              </Text>
              <ButtonGroup>
                <Button mt={4} colorScheme="blue" onClick={() => handleView(complaint)}>
                  View
                </Button>
                <Button mt={4} colorScheme={
                  complaint.status === 'In Progress' ? 'orange' :
                    complaint.status === 'Solved' ? 'green' :
                      'red'
                }
                  // onClick={handleResolve}
                  isDisabled
                >
                  {complaint.status}
                </Button>
              </ButtonGroup>
            </Box>
          ))}
        </Grid>
      )}
      {selectedComplaint && (
        <Modal size={isMobile ? 'sm' : 'lg'} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent bg={bgColor}
            color={textColor}
            marginLeft={'0.5rem'}
            marginRight={'0.5rem'}
            alignSelf={'center'}
          >
            <ModalHeader>Complaint Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <Heading fontSize="md">Complaint About :</Heading>
                <Text>{selectedComplaint.complaintAbout}</Text>
              </Box>
              <Box mb={4}>
                <Heading fontSize="md">Description :</Heading>
                <Text>{selectedComplaint.description}</Text>
              </Box>
              <Box mb={4} display={'flex'} alignItems={'center'} gap={'1rem'}>
                <Heading fontSize="md">Status :</Heading>
                <Text>{selectedComplaint.status}</Text>
              </Box>
              {/* Add more fields as needed */}
              <Box mb={4}>
                {selectedComplaint.attachment ? (
                  <Image
                    src={selectedComplaint.attachment?.url}
                    width={'100%'}
                    height={'100%'}
                    style={{ objectFit: 'contain', borderRadius: '0.5rem' }}
                    alt="Can not fetch the Complaint Image"
                  />
                ) : (
                  <Text color={'red'} fontWeight={'bold'}>No Image Was Attached With This Complaint</Text>
                )
                }
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ComplaintsList;
