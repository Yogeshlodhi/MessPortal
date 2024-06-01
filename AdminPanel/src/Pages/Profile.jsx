import React, { useState } from 'react'
import { Box, Heading, Container, Input, FormControl, FormLabel, useToast, Button, useColorModeValue } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { logout, updateStudent } from '../Features/Auth/authSlice';
// import Spinner from '../Components/Spinner';

const Profile = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
//   const { student } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading } = useSelector(state => state.auth);

  const [updateFormData, setUpdateFormData] = useState({
    // emailId: student.emailId,
    // studentName: student.studentName,
    // studentRoll: student.studentRoll,
    // number: student.number,
    // bankAccount: student.bankAccount,
    // ifsc: student.ifsc
  })

  const [disable, setDisable] = useState(true);
//   const { emailId, studentName, studentRoll, number, bankAccount, ifsc } = updateFormData;

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (color !== '#fff') return color;
    return 'black';
  };

  const onChange = (e) => {
    setDisable(false);
    // setUpdateFormData((prev) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    // }))
  }

  const onUpdate = (e) => {
    e.preventDefault()
    const updatedData = {
      studentName,
      studentRoll,
      number,
      ifsc,
      bankAccount,
      emailId
    }
    dispatch(updateStudent(updatedData));
    setDisable(true);
    toast({
      title: 'Profile Updated Successfully',
      status: 'success',
      isClosable: true,
      duration: 3000
    })
  }

  if (isLoading) {
    return <Spinner message={'Updating Your Profile'} />
  }


  return (
    <Box
      padding={'2rem'}
      className='flex gap-4 flex-col'
      bg={bgColor}
      color={textColor}
    >
      <Heading>Hello ! <span style={{ color: getRandomColor() }}>{studentName}</span></Heading>
      <Container padding={'2rem'} maxW='70rem' centerContent >
        <Box padding='4' w={'90%'} maxW='100%' className='grid grid-cols-2 gap-6'>
          <FormControl>
            <FormLabel>Student Name</FormLabel>
            <Input
              onChange={onChange}
              value={studentName}
              name='studentName'
            />
          </FormControl>
          <FormControl >
            <FormLabel>Student Roll No.</FormLabel>
            <Input
              onChange={onChange}
              value={studentRoll}
              name='studentRoll'
            />
          </FormControl>
          <FormControl >
            <FormLabel>Webmail Id</FormLabel>
            <Input
              onChange={onChange}
              value={emailId}
              name='emailId'
            />
          </FormControl>
          <FormControl >
            <FormLabel>Phone Number</FormLabel>
            <Input
              onChange={onChange}
              value={number}
              name='number'
            />
          </FormControl>
          <FormControl >
            <FormLabel>Bank Account Number</FormLabel>
            <Input
              onChange={onChange}
              value={bankAccount}
              name='bankAccount'
            />
          </FormControl>
          <FormControl >
            <FormLabel>IFSC Code</FormLabel>
            <Input
              onChange={onChange}
              value={ifsc}
              name='ifsc'
            />
          </FormControl>
        </Box>
      </Container>
      <Button
        onClick={onUpdate}
        width={'30%'}
        display={'inline-block'}
        alignSelf={'center'}
        background={'teal'}
        color={'white'}
        fontSize={'1.5rem'}
        _hover={{ background: 'teal.500' }}
        isDisabled={disable}
      >
        Update Profile
      </Button>
    </Box>
  )
}

export default Profile
