import React, { useEffect, useState } from 'react';
import {
  Box, Button, IconButton, Input, Table, TableContainer,
  Tbody, Td, Th, Thead, Tr, VStack, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, useDisclosure,
  Avatar,
  Text,
  Heading,
  useMediaQuery
} from '@chakra-ui/react';
import { getStudentsList } from '../Features/Students/studentSlice';
import Spinner from '../Components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { clearStudent, getSingleStudent } from '../Features/Students/studentProfileSlice';
import * as XLSX from 'xlsx';

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { studentsList, isLoading, isError, message } = useSelector((state) => state.students);

  const { student, isLoadingStudent } = useSelector((state) => state.studentProfile);

  const [isMobile] = useMediaQuery('(max-width: 600px)')

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
  }, [student, onOpen, onClose]);

  useEffect(() => {
    return () => {
      dispatch(clearStudent());
      setSelectedStudent(null);
      onClose();
    };
  }, [dispatch, onClose]);

  const handleViewProfile = (emailId) => {
    dispatch(getSingleStudent(emailId));
  };

  const handleExportToExcel = () => {
    const data = studentsList.map((student, index) => ({
      'Sr. No': index + 1,
      'Student Roll': student.studentRoll,
      'Student Name': student.studentName,
      'Student Email': student.emailId,
      'Number': student.number,
      'Bank Account No.': student.bankAccount,
      'IFSC Code': student.ifsc,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    XLSX.writeFile(workbook, 'StudentsData.xlsx');
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
      <Button onClick={handleExportToExcel} colorScheme="teal">Export to Excel</Button>
      {selectedStudent && (
        <Modal 
          isOpen={isOpen} 
          // onClose={() => {
          //     onClose,
          //     setSelectedStudent(null)
          // }} 
          onClose={onClose}
          size={isMobile ? 'sm' : 'xl'}
          // size={'xl'}
        >
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
          />
          <ModalContent width={'auto'}>
            <ModalHeader>
              {selectedStudent.studentName}'s Profile
            </ModalHeader>
             <ModalCloseButton />
            <ModalBody 
              display={'flex'} 
              flexDirection={isMobile ? 'column' : 'row'}
              gap={'1rem'}
            >
              <Box>
                <Avatar
                  style={{ 
                    // width: '10rem', 
                    // height: '10rem',
                    width: isMobile ? '100%' : '10rem', 
                    height: isMobile ? '100%' : '10rem',
                    objectFit: 'cover'
                  }}
                  name={selectedStudent.studentName}
                  // src={profile}
                  src={selectedStudent.profileImage}
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
