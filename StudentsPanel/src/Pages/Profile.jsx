// import React, { useEffect, useState } from 'react'
// import { Box, Heading, Container, Input, FormControl, FormLabel, useToast, Button, useColorModeValue, Image, VStack, Flex, Text } from '@chakra-ui/react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout, updateStudent } from '../Features/Auth/authSlice';
// import Spinner from '../Components/Spinner';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const Profile = () => {
//   const bgColor = useColorModeValue('brand.100', 'brand.900');
//   const textColor = useColorModeValue('gray.800', 'white');
//   const { student } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const toast = useToast();

//   const { isLoading } = useSelector(state => state.auth);

//   const [updateFormData, setUpdateFormData] = useState({
//     emailId: student.emailId,
//     studentName: student.studentName,
//     studentRoll: student.studentRoll,
//     number: student.number,
//     bankAccount: student.bankAccount,
//     ifsc: student.ifsc
//   })

//   const [disable, setDisable] = useState(true);
//   const { emailId, studentName, studentRoll, number, bankAccount, ifsc } = updateFormData;

//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     if (color !== '#fff') return color;
//     return 'black';
//   };

//   const [randomColor, setRandomColor] = useState('');
//   useEffect(() => {
//     setRandomColor(getRandomColor());
//   }, []);

//   const onChange = (e) => {
//     setDisable(false);
//     setUpdateFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const onUpdate = (e) => {
//     e.preventDefault()
//     const updatedData = {
//       studentName,
//       studentRoll,
//       number,
//       ifsc,
//       bankAccount,
//       emailId
//     }
//     dispatch(updateStudent(updatedData));
//     setDisable(true);
//     toast({
//       title: 'Profile Updated Successfully',
//       status: 'success',
//       isClosable: true,
//       duration: 3000
//     })
//   }

//   if (isLoading) {
//     return <Spinner message={'Updating Your Profile'} />
//   }

//   const attachment = false;

//   return (
//     <Box
//       padding={'2rem'}
//       className='flex gap-4 flex-col'
//       bg={bgColor}
//       color={textColor}
//     >
//       {/* <Heading>Hello ! <span style={{ color: getRandomColor() }}>{studentName}</span></Heading> */}
//       <Heading>Hello ! <span style={{ color: randomColor }}>{studentName}</span></Heading>
//       <Container padding={'2rem'} maxW='70rem' centerContent >
//         <Box padding='4' w={'90%'} maxW='100%' className='grid grid-cols-2 gap-6'>
//           <FormControl>
//             <FormLabel>Student Name</FormLabel>
//             <Input
//               onChange={onChange}
//               value={studentName}
//               name='studentName'
//             />
//           </FormControl>
//           <FormControl >
//             <FormLabel>Student Roll No.</FormLabel>
//             <Input
//               onChange={onChange}
//               value={studentRoll}
//               name='studentRoll'
//             />
//           </FormControl>
//           <FormControl >
//             <FormLabel>Webmail Id</FormLabel>
//             <Input
//               onChange={onChange}
//               value={emailId}
//               name='emailId'
//             />
//           </FormControl>
//           <FormControl >
//             <FormLabel>Phone Number</FormLabel>
//             <Input
//               onChange={onChange}
//               value={number}
//               name='number'
//             />
//           </FormControl>
//           <FormControl >
//             <FormLabel>Bank Account Number</FormLabel>
//             <Input
//               onChange={onChange}
//               value={bankAccount}
//               name='bankAccount'
//             />
//           </FormControl>
//           <FormControl >
//             <FormLabel>IFSC Code</FormLabel>
//             <Input
//               onChange={onChange}
//               value={ifsc}
//               name='ifsc'
//             />
//           </FormControl>
//           <Box
//             border="1px dotted black"
//             p={4}
//             borderRadius={'1rem'}
//             // height={'50% '}
//             // mt={6} 
//             overflow={'hidden'}
//             borderWidth={'0.1rem'}
//             // width={'50%'}
//             alignSelf={'center'}
//           >
//             <VStack spacing={4} alignItems="center">
//               <FormLabel fontSize={'2rem'} mt={6} htmlFor="imageUpload">Update Profile Image</FormLabel>
//               <Flex alignItems="center" mt={6}>
//                 <Input
//                   type="file"
//                   id="imageUpload"
//                   name='profileImage'
//                   // onChange={(e) => {
//                   //   setComplaint((prev) => ({
//                   //     ...prev,
//                   //     attachment: e.target.files[0]
//                   //   }))
//                   // }}
//                   style={{ display: 'none' }}
//                 />
//                 <Box
//                   as="label"
//                   htmlFor="imageUpload"
//                   cursor="pointer"
//                 >
//                   <Box
//                     border="1px solid #CBD5E0"
//                     borderRadius="md"
//                     p={4}
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     _hover={{ borderColor: '#4A5568' }}
//                   >
//                     {attachment ? (
//                       <Image
//                         // src={URL.createObjectURL(attachment)}
//                         width={150}
//                         height={150}
//                         alt={'Complaint Image'}
//                         style={{ maxWidth: '100%', maxHeight: '100%' }}
//                       />
//                     ) : (
//                       <>
//                         <CloudUploadIcon />
//                         <Text ml={2}>Browse Files to Upload</Text>
//                       </>
//                     )}
//                   </Box>
//                 </Box>
//               </Flex>
//             </VStack>
//           </Box>
//         </Box>
//       </Container>
//       <Button
//         onClick={onUpdate}
//         width={'30%'}
//         display={'inline-block'}
//         alignSelf={'center'}
//         background={'teal'}
//         color={'white'}
//         fontSize={'1.5rem'}
//         _hover={{ background: 'teal.500' }}
//         isDisabled={disable}
//       >
//         Update Profile
//       </Button>
//     </Box>
//   )
// }

// export default Profile


import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Container, Input, FormControl, FormLabel, useToast,
  Button, useColorModeValue, Image, VStack, Flex, Text
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateStudent } from '../Features/Auth/authSlice';
import Spinner from '../Components/Spinner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Profile = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const { student, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [updateFormData, setUpdateFormData] = useState({
    emailId: student.emailId,
    studentName: student.studentName,
    studentRoll: student.studentRoll,
    number: student.number,
    bankAccount: student.bankAccount ? student.bankAccount  : '',
    ifsc: student.ifsc ? student.ifsc : '',
  });

  const [profileImage, setProfileImage] = useState(student.profileImage);
  const [profile, setProfile] = useState(null);
  const [disable, setDisable] = useState(true);

  const { emailId, studentName, studentRoll, number, bankAccount, ifsc } = updateFormData;

  const onChange = (e) => {
    setDisable(false);
    setUpdateFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageChange = (e) => {
    setDisable(false);
    // Check if a file is selected
    if (e.target.files.length > 0) {
      setProfile(e.target.files[0]);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('studentRoll', studentRoll);
    formData.append('number', number);
    formData.append('ifsc', ifsc);
    formData.append('bankAccount', bankAccount);
    formData.append('emailId', emailId);
  
    // Append profile only if it's not null
    if (profile) {
      formData.append('image', profile);
    }

    try {
      await dispatch(updateStudent(formData));
      setDisable(true);
      toast({
        title: 'Profile Updated Successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (color !== '#fff') return color;
    return 'black';
  };

  const [randomColor, setRandomColor] = useState('');
  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  if (isLoading) {
    return <Spinner message={'Updating Your Profile'} />;
  }

  return (
    <Box padding={'2rem'} className='flex gap-4 flex-col' bg={bgColor} color={textColor}>
      <Heading>Hello ! <span style={{ color: randomColor }}>{studentName}</span></Heading>
      <Container padding={'2rem'} maxW='70rem' centerContent>
        <Box padding='4' w={'90%'} maxW='100%' className='grid grid-cols-2 gap-6'>
          <FormControl>
            <FormLabel>Student Name</FormLabel>
            <Input onChange={onChange} value={studentName} name='studentName' />
          </FormControl>
          <FormControl>
            <FormLabel>Student Roll No.</FormLabel>
            <Input onChange={onChange} value={studentRoll} name='studentRoll' />
          </FormControl>
          <FormControl>
            <FormLabel>Webmail Id</FormLabel>
            <Input onChange={onChange} value={emailId} name='emailId' />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input onChange={onChange} value={number} name='number' />
          </FormControl>
          <FormControl>
            <FormLabel>Bank Account Number</FormLabel>
            <Input onChange={onChange} value={bankAccount} name='bankAccount' />
          </FormControl>
          <FormControl>
            <FormLabel>IFSC Code</FormLabel>
            <Input onChange={onChange} value={ifsc} name='ifsc' />
          </FormControl>
          <Box
            border="1px dotted black"
            p={4}
            borderRadius={'1rem'}
            overflow={'hidden'}
            borderWidth={'0.1rem'}
            alignSelf={'center'}
          >
            <VStack spacing={4} alignItems="center">
              <FormLabel fontSize={'2rem'} mt={6} htmlFor="imageUpload">Update Profile Image</FormLabel>
              <Flex alignItems="center" mt={6}>
                <Input
                  type="file"
                  id="imageUpload"
                  name='profile'
                  onChange={onImageChange}
                  style={{ display: 'none' }}
                  // value={}
                />
                <Box as="label" htmlFor="imageUpload" cursor="pointer">
                  <Box
                    border="1px solid #CBD5E0"
                    borderRadius="md"
                    p={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ borderColor: '#4A5568' }}
                  >
                    {profile ? (
                      <Image
                        src={URL.createObjectURL(profile)}
                        width={150}
                        height={150}
                        alt={'Profile Image'}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : (
                      <>
                        <CloudUploadIcon />
                        <Text ml={2}>Browse Files to Upload</Text>
                      </>
                    )}
                  </Box>
                </Box>
              </Flex>
            </VStack>
          </Box>
          <Box alignSelf={'center'} justifySelf={'center'}>
            {profileImage ? (
              <Image
                src={profileImage}
                width={150}
                height={150}
                alt={'Profile Image'}
                style={{ objectFit: 'contain', borderRadius: '0.5rem' }}
              />
            ) : (
              <>
              </>
            )
            }
          </Box>

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
  );
};

export default Profile;
