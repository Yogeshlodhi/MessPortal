import { Box, Flex, Text, Button, IconButton, Heading, Grid, Icon, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsList } from "../Features/Complaints/complaintSlice";
import Spinner from "../Components/Spinner";

const ComplaintsList = () => {

  const dispatch = useDispatch();
  const { complaints, isLoading } = useSelector(state => state.complaints);
  const {admin} = useSelector(state => state.auth);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const {isOpen, onOpen, onClose} = useDisclosure();

  // const {complaint} = useSelector(state => state.singleComplaint)
  const complaint = "yogesh";
  useEffect(() => {
      if(complaint){
        setSelectedComplaint(complaint);
        onOpen();
      }
  },[complaint, onOpen])



  useEffect(() => {
    dispatch(getComplaintsList());
  },[dispatch])


// complaintAbout: "Hygeine"
// createdAt: "2024-05-07T00:50:37.762Z"
// description: "The food quality has been declining continuously"
// roll: "2101CB61"
// status: "Solved"
// student: "Yogesh Kumar"
// updatedAt: "2024-06-02T10:45:20.645Z"

  const handleResolve = () => {
    // Logic to handle resolving the complaint
  };

  

  if(isLoading){
    return <Spinner message={'Loading Complaints....'}/>
  }

  return (
    <Box>
      <Heading mb={4} size="lg">
        Complaints
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {complaints.map((complaint, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            // bg="white"
            _hover={{ boxShadow: "lg" }}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="bold" fontSize="lg">{complaint.complaintAbout}</Text>
              {/* <Text fontSize={'smaller'}>{complaint.student}{' '}{`(${complaint.roll})`}</Text> */}
              {admin.adminType === 'Warden' ? 
                <IconButton
                  icon={<Icon as={MdClose} />}
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Close"
                  onClick={handleResolve}
                /> : ''
              }
            </Flex>
            <Text>{complaint.description}</Text>
            <ButtonGroup>
              <Button mt={4} colorScheme="blue" onClick={handleResolve}>View</Button>
              <Button mt={4} colorScheme={complaint.status === 'In Progress' ? 'orange' :
                complaint.status === 'Solved' ? 'green' :
                  'red'
              }
               onClick={handleResolve}>{complaint.status}</Button>
            </ButtonGroup>
          </Box>
        ))}
      </Grid>
      {selectedComplaint && (
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
          <ModalOverlay
             bg='blackAlpha.300'
             backdropFilter='blur(10px)'
          />
          <ModalContent>
            <ModalHeader>
              {/* {selectedStudent.studentName}'s Profile */}
              Complaint
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={'flex'} gap={'1rem'}>
              {/* <VStack alignItems={'flex-start'} >
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Heading fontSize={'medium'}>Roll No. : </Heading>
                  <Text>{selectedStudent.studentRoll}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Heading fontSize={'medium'}>Name : </Heading>
                  <Text>{selectedStudent.studentName}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Heading fontSize={'medium'}>Webmail : </Heading>
                  <Text>{selectedStudent.emailId}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Heading fontSize={'medium'}>Contact No. : </Heading>
                  <Text>{selectedStudent.number}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Heading fontSize={'medium'}>Bank Account No. : </Heading>
                  <Text>{selectedStudent.bankAccount}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                  <Heading fontSize={'medium'}>IFSC Code : </Heading>
                  <Text>{selectedStudent.ifsc}</Text>
                </Box>
              </VStack> */}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ComplaintsList;
