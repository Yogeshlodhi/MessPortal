import React from 'react'
import { Box, Heading, Container, Input, FormControl, FormLabel } from '@chakra-ui/react'
import {useSelector} from 'react-redux';

const Profile = () => {
  // const student = JSON.parse(localStorage.getItem('student'));
  const {student} = useSelector((state) => state.auth);
  
  console.log(student)
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (color != '#fff') return color;
    return 'black';
  };
  return (
    <Box padding={'2rem'} className='flex gap-4 flex-col'>
      <Heading>Hello ! <span style={{ color: getRandomColor() }}>{student.studentName}</span></Heading>
      <Container padding={'2rem'} maxW='70rem' centerContent >
        <Box padding='4' w={'90%'} maxW='100%' className='grid grid-cols-2 gap-6'>
          <FormControl>
            <FormLabel>Student Name</FormLabel>
            <Input placeholder={student.studentName}/>
          </FormControl>
          <FormControl >
            <FormLabel>Student Roll No.</FormLabel>
            <Input placeholder={student.studentRoll}/>
          </FormControl>
          <FormControl >
            <FormLabel>Webmail Id</FormLabel>
            <Input placeholder={student.emailId}/>
          </FormControl>
          <FormControl >
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder={student.number}/>
          </FormControl>
          <FormControl >
            <FormLabel>Bank Account Number</FormLabel>
            <Input placeholder={student.bankAccount}/>
          </FormControl>
          <FormControl >
            <FormLabel>IFSC Code</FormLabel>
            <Input placeholder={student.ifsc}/>
          </FormControl>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile
