
import React, { useEffect, useState } from 'react';
import {
  Box, Button, IconButton, Input, Table, TableContainer,
  Tbody, Td, Th, Thead, Tr, VStack, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, useDisclosure,
  Avatar,
  Text,
  Heading,
  useMediaQuery,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { getdata } from '../Features/Students/studentSlice';
import Spinner from '../Components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { clearStudent, getSingleStudent } from '../Features/Students/studentProfileSlice';
import * as XLSX from 'xlsx';

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { students, isLoading, isError, message } = useSelector((state) => state.students);
  
  const { student, isLoadingStudent } = useSelector((state) => state.studentProfile);

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const [isMobile] = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    if (isError && message) {
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        duration: 3000
      })
    }
    dispatch(getdata());
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
    const exportData = students.map((student, index) => ({
      'Sr. No': index + 1,
      'Student Roll': student.studentRoll,
      'Student Name': student.studentName,
      'Student Email': student.emailId,
      'Number': student.number,
      'Bank Account No.': student.bankAccount,
      'IFSC Code': student.ifsc,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
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
    <VStack
      width={'100%'}
      gap={'2rem'}
      bg={bgColor}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      borderRadius={'1rem'}
      padding={'0.5rem'}
    >
      <Box width={'100%'}>
        <Input
          placeholder="Search Student With Name / RollNo / EmailId"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <TableContainer width={'100%'}>
        <Table variant="striped" colorScheme='#1D1D1C'>
          <Thead>
            <Tr>
              <Th>Sr. No</Th>
              <Th>Student Roll</Th>
              <Th>Student Name</Th>
              <Th>Student Email</Th>
              <Th>Number</Th>
              <Th>Profile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students
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
          onClose={onClose}
          size={isMobile ? 'sm' : 'xl'}
        >
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
          />
          <ModalContent width={'auto'} bg={bgColor} alignSelf={'center'} marginLeft={'0.5rem'} marginRight={'0.5rem'}>
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
                    width: isMobile ? '100%' : '10rem',
                    height: isMobile ? '5rem' : '10rem',
                    objectFit: 'cover'
                  }}
                  name={selectedStudent.studentName}
                  src={selectedStudent.avatar?.url}
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