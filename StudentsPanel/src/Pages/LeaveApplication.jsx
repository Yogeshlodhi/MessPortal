// import React, { useEffect, useState } from 'react'
// import { Box, Button, Container, FormControl, FormLabel, Heading, Input, List, ListIcon, ListItem, Textarea, useColorModeValue, useToast } from '@chakra-ui/react'
// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { applyLeave, reset } from '../Features/Leave/leaveSlice';

// function LeaveApplication() {

//   const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
//   const textColor = useColorModeValue('lightMode.text', 'darkMode.text');
//   const btnColor = useColorModeValue('lightMode.btnTxt', 'darkMode.btnTxt');
//   const btnBg = useColorModeValue('lightMode.btnBg', 'darkMode.btnBg');


//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const toast = useToast()

//   const { student } = useSelector((state) => state.auth);

//   const [leaveForm, setLeaveForm] = useState({
//     studentRoll: student && student.studentRoll,
//     startDate: '',
//     endDate: '',
//     reason: ''
//   })

//   const { studentRoll, startDate, endDate, reason } = leaveForm;


//   const onFormChange = (e, field) => {
//     const { value } = e.target;
//     if (field === 'startDate' && endDate && value > endDate) {
//       toast({
//         title: 'Start date cannot be after end date',
//         duration: 3000,
//         status: 'error',
//         isClosable: true
//       })
//     } else if (field === 'endDate' && startDate && value < startDate) {
//       toast({
//         title: 'End date cannot be before start date',
//         duration: 3000,
//         status: 'error',
//         isClosable: true
//       })
//     } else {
//       setLeaveForm(prev => ({
//         ...prev,
//         [field]: value,
//       }));
//     }
//   }

//   const onApply = (e) => {
//     e.preventDefault();
//     const leaveData = {
//       studentRoll,
//       startDate,
//       endDate,
//       reason,
//     }
//     dispatch(applyLeave(leaveData));
//     toast({
//       title: 'Leave Applied',
//       duration: 3000,
//       status: 'success',
//       isClosable: true
//     })
//     navigate('/')
//   }


//   return (
//     <Box
//       className='flex gap-8 flex-col'
//       bg={bgColor}
//       color={textColor}
//     >
//       <Heading fontSize={'2rem'}>Apply For Leave</Heading>
//       <List spacing={1}>
//         <ListItem display={'flex'} alignItems={'center'}>
//           <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
//           The Leave must be of a minimum of 3 days
//         </ListItem>
//         <ListItem display={'flex'} alignItems={'center'}>
//           <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
//           Your leave start date should be minimum a day before applying
//         </ListItem>
//         <ListItem display={'flex'} alignItems={'center'}>
//           <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
//           Kindly upload the screenshot of the leave after the application
//         </ListItem>
//       </List>
//       <Container 
//         padding={'2rem'} 
//         maxW='70rem' 
//         // bg='#2C3E50' 
//         bg={bgColor}
//         color={textColor}
//         centerContent 
//         borderRadius={'1rem'} 
//         minHeight={'30rem'} 
//         maxH={'35rem'} 
//         height={'auto'}
//       >
//         <Box padding='4' w={'90%'} maxW='100%' className='grid grid-flow-col gap-5'>
//           <FormControl>
//             <FormLabel color={textColor}>From</FormLabel>
//             <Input
//               type='date'
//               // color={'white'}
//               color={textColor}
//               value={startDate}
//               name='startDate'
//               onChange={(e) => onFormChange(e, "startDate")}
//               />
//           </FormControl>
//           <FormControl>
//             <FormLabel color={textColor}>To</FormLabel>
//             <Input
//               type='date'
//               // color={'white'}
//               color={textColor}
//               value={endDate}
//               name='endDate'
//               onChange={(e) => onFormChange(e, "endDate")}
//             />
//           </FormControl>
//         </Box>
//         <FormControl w={'90%'} maxW='100%' padding='4' color={textColor}>
//           <Textarea
//             placeholder='Provide the reason for your leave'
//             minHeight={'15rem'}
//             maxHeight={'15rem'}
//             value={reason}
//             name='reason'
//             onChange={(e) => onFormChange(e, "reason")}
//             resize={'none'}
//           />
//         </FormControl>
//         <Button
//           display={'inline-block'}
//           width={'50%'}
//           marginTop={'1rem'}
//           color={'#2C3E50'}
//           // color={btnColor}
//           onClick={onApply}
//           // bg={btnBg}
//         >
//           Apply
//         </Button>
//       </Container>
//     </Box>
//   )
// }

// export default LeaveApplication


import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Textarea,
  useColorModeValue,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyLeave, reset } from '../Features/Leave/leaveSlice';

function LeaveApplication() {
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('lightMode.text', 'darkMode.text');
  const btnColor = useColorModeValue('lightMode.btnTxt', 'darkMode.btnTxt');
  const btnBg = useColorModeValue('lightMode.btnBg', 'darkMode.btnBg');
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { student } = useSelector((state) => state.auth);

  const [leaveForm, setLeaveForm] = useState({
    studentRoll: student && student.studentRoll,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const { studentRoll, startDate, endDate, reason } = leaveForm;

  const onFormChange = (e, field) => {
    const { value } = e.target;
    if (field === 'startDate' && endDate && value > endDate) {
      toast({
        title: 'Start date cannot be after end date',
        duration: 3000,
        status: 'error',
        isClosable: true,
      });
    } else if (field === 'endDate' && startDate && value < startDate) {
      toast({
        title: 'End date cannot be before start date',
        duration: 3000,
        status: 'error',
        isClosable: true,
      });
    } else {
      setLeaveForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const onApply = (e) => {
    e.preventDefault();
    const leaveData = {
      studentRoll,
      startDate,
      endDate,
      reason,
    };
    dispatch(applyLeave(leaveData));
    toast({
      title: 'Leave Applied',
      duration: 3000,
      status: 'success',
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <Box
      className='flex gap-8 flex-col'
      bg={bgColor}
      color={textColor}
      // padding={{ base: '2rem', md: '4rem' }}
    >
      <Heading 
        fontSize={'2rem'}
        textAlign={isMobile ? 'center' : 'unset'}
      >
        Apply For Leave
      </Heading>
      <List spacing={1}>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          The Leave must be of a minimum of 3 days
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          Your leave start date should be minimum a day before applying
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          Kindly upload the screenshot of the leave after the application
        </ListItem>
      </List>
      <Container
        padding={isMobile ? '0' : '2rem'}
        // maxW='70rem'
        maxW={isMobile ? '100%' : '70rem'}
        // background={'red'}
        // bg={bgColor}
        color={textColor}
        centerContent
        borderRadius={'1rem'}
        minHeight={'30rem'}
        maxH={'35rem'}
        height={'auto'}
      >
        <VStack spacing={5} w={'100%'}>
          <Box w={'100%'} display={{ base: 'block', md: 'flex' }} gap={5}>
            <FormControl 
              flex={1} 
              mb={{ base: 4, md: 0 }} 
              isRequired
            >
              <FormLabel color={textColor}>From</FormLabel>
              <Input
                type='date'
                color={textColor}
                value={startDate}
                name='startDate'
                onChange={(e) => onFormChange(e, 'startDate')}
              />
            </FormControl>
            <FormControl flex={1} isRequired>
              <FormLabel color={textColor}>To</FormLabel>
              <Input
                type='date'
                color={textColor}
                value={endDate}
                name='endDate'
                onChange={(e) => onFormChange(e, 'endDate')}
              />
            </FormControl>
          </Box>
          <FormControl w={'100%'} isRequired>
            <Textarea
              placeholder='Provide the reason for your leave'
              minHeight={'15rem'}
              maxHeight={'15rem'}
              value={reason}
              name='reason'
              onChange={(e) => onFormChange(e, 'reason')}
              resize={'none'}
              color={textColor}
            />
          </FormControl>
          <Button
            display={'inline-block'}
            width={{ base: '100%', md: '50%' }}
            marginTop={'1rem'}
            color={'#2C3E50'}
            onClick={onApply}
            // bg={btnBg}
          >
            Apply
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

export default LeaveApplication;
