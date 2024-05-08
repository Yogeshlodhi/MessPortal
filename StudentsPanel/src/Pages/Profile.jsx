import { Box, Heading, Container, Input, FormControl, FormLabel } from '@chakra-ui/react'

import React from 'react'

const Profile = () => {
  const student = JSON.parse(localStorage.getItem('student'));
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
      <Heading>Hello ! <span style={{ color: getRandomColor() }}>{student.data.studentName}</span></Heading>
      <Container padding={'2rem'} maxW='70rem' centerContent >
        <Box padding='4' w={'90%'} maxW='100%' className='grid grid-cols-2 gap-6'>
          <FormControl>
            <FormLabel>Student Name</FormLabel>
            <Input placeholder={student.data.studentName}/>
          </FormControl>
          <FormControl >
            <FormLabel>Student Roll No.</FormLabel>
            <Input placeholder={student.data.studentRoll}/>
          </FormControl>
          <FormControl >
            <FormLabel>Webmail Id</FormLabel>
            <Input placeholder={student.data.emailId}/>
          </FormControl>
          <FormControl >
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder={student.data.number}/>
          </FormControl>
          <FormControl >
            <FormLabel>Bank Account Number</FormLabel>
            <Input placeholder='111111111111111'/>
          </FormControl>
          <FormControl >
            <FormLabel>IFSC Code</FormLabel>
            <Input placeholder='CYOJSFIUH1237'/>
          </FormControl>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile
