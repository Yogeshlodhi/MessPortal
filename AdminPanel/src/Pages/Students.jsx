import React, { useEffect, useState } from 'react';
import {
  Box, Button, IconButton, Input, Table, TableCaption, TableContainer,
  Tbody, Td, Tfoot, Th, Thead, Tr, VStack, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
  Avatar,
  Text,
  Heading
} from '@chakra-ui/react';
import { getStudentsList } from '../Features/Students/studentSlice';
import Spinner from '../Components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getSingleStudent, reset } from '../Features/Students/studentProfileSlice';
import profile from '../../../profile.jpg';

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { studentsList, isLoading, isError, message } = useSelector((state) => state.students);

  const { student, isLoadingStudent } = useSelector((state) => state.studentProfile);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getStudentsList());
  }, [navigate, isError, dispatch, message]);

  useEffect(() => {
    if (student) {
      setSelectedStudent(student.data);
      onOpen();
    }

  }, [student, onOpen]);

  const handleViewProfile = async (emailId) => {
    dispatch(getSingleStudent(emailId));
  };


  if (isLoading) {
    return <Spinner message={'Getting Students.....'} />;
  }

  if (isLoadingStudent) {
    return <Spinner message={'Getting Student Profile.....'} />;
  }

  return (
    <VStack width={'100%'} gap={'2rem'}>
      <Box width={'90%'}>
        <Input
          placeholder="Search Student With Name / RollNo / EmailId"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <TableContainer width={'90%'}>
        <Table variant="striped" colorScheme='teal'>
          <Thead>
            <Tr background={'teal'}>
              <Th color="#FFFFFF">Sr. No</Th>
              <Th color="#FFFFFF">Student Roll</Th>
              <Th color="#FFFFFF">Student Name</Th>
              <Th color="#FFFFFF">Student Email</Th>
              <Th color="#FFFFFF">Number</Th>
              <Th color="#FFFFFF">Profile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {studentsList
              .filter((student) => {
                const searchLower = search.toLowerCase();
                return searchLower === ''
                  ? true
                  : student.studentName.toLowerCase().includes(searchLower) ||
                  student.studentRoll.toLowerCase().includes(searchLower) ||
                  student.emailId.toLowerCase().includes(searchLower);
              })
              .map((student, index) => (
                <Tr key={student._id}>
                  <Td>{index + 1}</Td>
                  <Td>{student.studentRoll}</Td>
                  <Td>{student.studentName}</Td>
                  <Td>{student.emailId}</Td>
                  <Td>{student.number}</Td>
                  <Td>
                    <IconButton
                      aria-label="View Profile"
                      icon={<RemoveRedEyeIcon />}
                      onClick={() => handleViewProfile(student.emailId)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedStudent && (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
          <ModalOverlay
             bg='blackAlpha.300'
             backdropFilter='blur(10px)'
          />
          <ModalContent width={'auto'}>
            <ModalHeader>
              {selectedStudent.studentName}'s Profile
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display={'flex'} gap={'1rem'}>
              <Box>
                <Avatar 
                  style={{width: '10rem', height: '10rem'}}
                  name={selectedStudent.studentName} 
                  src={profile} 
                  borderRadius="1rem" 
                />
              </Box>
              <VStack alignItems={'flex-start'} >
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
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};

export default Students;
