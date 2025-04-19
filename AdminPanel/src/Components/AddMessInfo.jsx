
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import {
    Box,
    Heading,
    Button,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Container,
    useMediaQuery,
    Avatar,
    useToast
} from '@chakra-ui/react';
import { addMessInfo } from '../Features/MessInfo/messInfoSlice';

const AddMessInfo = () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const { isLoadingMess, isErrorMess, messMessage } = useSelector((state) => state.messInfo);

    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
    const [isMobile] = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();

    const [addFormData, setAddFormData] = useState({
        mealPrice: '',
        messOwner: '',
        contractInfo: '',
        tenureStarts: '',
        tenureEnds: ''
    });

    const { mealPrice, messOwner, contractInfo, tenureStarts, tenureEnds } = addFormData;

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        if (field === 'tenureStarts' && tenureEnds && value > tenureEnds) {
            toast({
                title: 'Start date cannot be after end date',
                duration: 3000,
                status: 'error',
                isClosable: true,
            });
        } else if (field === 'tenureEnds' && tenureStarts && value < tenureStarts) {
            toast({
                title: 'End date cannot be before start date',
                duration: 3000,
                status: 'error',
                isClosable: true,
            });
        } else {
            setAddFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleAddInfo = (e) => {
        e.preventDefault();
        const MessInfo = {
            mealPrice,
            messOwner,
            contractInfo,
            tenureEnds,
            tenureStarts
        };
        
        dispatch(addMessInfo(MessInfo));
        toast({
            title: 'Information Added Successfully!',
            duration: 3000,
            status: 'success',
            isClosable: true,
        });
        navigate('/');
    };

    return (
        <Box
            p={4}
            borderRadius={'0.5rem'}
            padding={'0.5rem'}
            border={'3px solid rgba(0, 0, 0, 0.05)'}
            boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
            bg={bgColor}
        >
            <Heading textTransform={'uppercase'} textAlign={'center'}>Mess Information</Heading>
            <Container mt={4} maxW='70rem' display={'flex'} justifyContent={'space-around'} flexDirection={isMobile ? 'column' : 'row'}>
                <Avatar name='Mess Owner' width={'10rem'} height={'10rem'} alignSelf={'center'} />
                <Box
                    display="flex"
                    alignSelf="center"
                    justifyContent={isMobile ? "center" : "flex-start"}
                    alignItems="center"
                    gap="1rem"
                    width={isMobile ? "100%" : "60%"}
                    flexDirection={isMobile ? "column" : "row"}
                >
                    <Heading fontSize="1.8rem" flexShrink={0}>
                        Mess Owner:
                    </Heading>
                    <FormControl flex={1}>
                        <Input
                            value={messOwner}
                            name='messOwner'
                            onChange={(e) => handleInputChange(e, 'messOwner')}
                            fontSize="1.5rem"
                            textTransform="uppercase"
                            color="teal"
                            placeholder='Owner Name'
                        />
                    </FormControl>
                </Box>
            </Container>

            <Heading mt={6} paddingLeft={'3rem'} textTransform={'uppercase'} fontSize={'1.5rem'}>Contract Details : </Heading>
            <Container
                display={'flex'}
                centerContent
                maxW={'70rem'}
            >
                <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Caterer : </FormLabel>
                            <Input
                                value={contractInfo}
                                name="contractInfo"
                                onChange={(e) => handleInputChange(e, 'contractInfo')}
                                placeholder='Contractor'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Tenure Starts : </FormLabel>
                            <Input
                                type='date'
                                value={tenureStarts}
                                name="tenureStarts"
                                onChange={(e) => handleInputChange(e, 'tenureStarts')}
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Tenure Ends : </FormLabel>
                            <Input
                                type='date'
                                value={tenureEnds}
                                name="tenureEnds"
                                onChange={(e) => handleInputChange(e, 'tenureEnds')}
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Meal Price : </FormLabel>
                            <Input
                                value={mealPrice}
                                name="mealPrice"
                                onChange={(e) => handleInputChange(e, 'mealPrice')}
                                placeholder='Per Meal Price'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Container>
            <Button
                onClick={handleAddInfo}
                width={isMobile ? '100%' : '30%'}
                display={'inline-block'}
                alignSelf={'center'}
                background={'teal'}
                color={'white'}
                fontSize={'1.5rem'}
                _hover={{ background: 'teal.500' }}
                mt={4}
            >
                Add Information
            </Button>
        </Box>
    );
};

export default AddMessInfo;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import AddIcon from '@mui/icons-material/Add';
// import CallIcon from '@mui/icons-material/Call';
// import MailIcon from '@mui/icons-material/Mail';
// import {
//     Box,
//     Heading,
//     Button,
//     useColorModeValue,
//     FormControl,
//     FormLabel,
//     Input,
//     Container,
//     useMediaQuery,
//     Avatar,
//     useToast
// } from '@chakra-ui/react';
// import { addMessInfo } from '../Features/MessInfo/messInfoSlice';

// const AddMessInfo = () => {
//     const dispatch = useDispatch();
//     const toast = useToast();

//     const { isLoadingMess, isErrorMess, messMessage } = useSelector((state) => state.messInfo);

//     const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
//     const textColor = useColorModeValue('gray.800', 'white');
//     const [isMobile] = useMediaQuery('(max-width: 600px)');

//     const [addFormData, setAddFormData] = useState({
//         mealPrice: '',
//         messOwner: '',
//         contractInfo: '',
//         tenureStarts: '',
//         tenureEnds: ''
//     });

//     const { mealPrice, messOwner, contractInfo, tenureStarts, tenureEnds } = addFormData;

//     const handleInputChange = (e, field) => {
//         const { value } = e.target;
//         if (field === 'tenureStarts' && tenureEnds && value > tenureEnds) {
//             toast({
//                 title: 'Start date cannot be after end date',
//                 duration: 3000,
//                 status: 'error',
//                 isClosable: true,
//             });
//         } else if (field === 'tenureEnds' && tenureStarts && value < tenureStarts) {
//             toast({
//                 title: 'End date cannot be before start date',
//                 duration: 3000,
//                 status: 'error',
//                 isClosable: true,
//             });
//         } else {
//             setAddFormData((prev) => ({
//                 ...prev,
//                 [field]: value,
//             }));
//         }
//     };


//     const handleAddInfo = (e) => {
//         e.preventDefault();
//         const MessInfo = {
//             mealPrice,
//             messOwner,
//             contractInfo,
//             tenureEnds,
//             tenureStarts
//         };
        
//         dispatch(addMessInfo(MessInfo));
//         toast({
//             title: 'Information Added Successfully!',
//             duration: 3000,
//             status: 'success',
//             isClosable: true,
//         });
//         navigate('/');
//     };


//     return (
//         <Box
//             p={4}
//             borderRadius={'0.5rem'}
//             padding={'0.5rem'}
//             border={'3px solid rgba(0, 0, 0, 0.05)'}
//             boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
//             bg={bgColor}
//         >
//             <Heading textTransform={'uppercase'} textAlign={'center'}>Mess Information</Heading>
//             <Container mt={4} maxW='70rem' display={'flex'} justifyContent={'space-around'} flexDirection={isMobile ? 'column' : 'row'}>
//                 <Avatar name='Mess Owner' width={'10rem'} height={'10rem'} alignSelf={'center'} />
//                 <Box
//                     display="flex"
//                     alignSelf="center"
//                     justifyContent={isMobile ? "center" : "flex-start"}
//                     alignItems="center"
//                     gap="1rem"
//                     width={isMobile ? "100%" : "60%"}
//                     flexDirection={isMobile ? "column" : "row"}
//                 >
//                     <Heading fontSize="1.8rem" flexShrink={0}>
//                         Mess Owner:
//                     </Heading>
//                     <FormControl flex={1}>
//                         <Input
//                             value={messOwner}
//                             name='messOwner'
//                             onChange={handleInputChange}
//                             fontSize="1.5rem"
//                             textTransform="uppercase"
//                             color="teal"
//                             placeholder='Owner Name'
//                         />
//                     </FormControl>
//                 </Box>
//             </Container>

//             <Heading mt={6} paddingLeft={'3rem'} textTransform={'uppercase'} fontSize={'1.5rem'}>Contract Details : </Heading>
//             <Container
//                 display={'flex'}
//                 centerContent
//                 maxW={'70rem'}
//             >
//                 <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Caterer : </FormLabel>
//                             <Input
//                                 value={contractInfo}
//                                 name="contractInfo"
//                                 onChange={(e) => handleInputChange(e, 'contractInfo')}
//                                 placeholder='Contractor'
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>
//                     </Box>
//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Tenure Starts : </FormLabel>
//                             <Input
//                                 type='date'
//                                 value={tenureStarts}
//                                 name="tenureStarts"
//                                 onChange={(e) => handleInputChange(e, 'tenureStarts')}
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>
//                     </Box>
//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Tenure Ends : </FormLabel>
//                             <Input
//                                 type='date'
//                                 value={tenureEnds}
//                                 name="tenureEnds"
//                                 onChange={(e) => handleInputChange(e, 'tenureEnds')}
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>
//                     </Box>
//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Meal Price : </FormLabel>
//                             <Input
//                                 value={mealPrice}
//                                 name="mealPrice"
//                                 onChange={(e) => handleInputChange(e, 'mealPrice')}
//                                 placeholder='Per Meal Price'
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>
//                     </Box>
//                 </Box>
//             </Container>
//             <Button
//                 onClick={handleAddInfo}
//                 width={isMobile ? '100%' : '30%'}
//                 display={'inline-block'}
//                 alignSelf={'center'}
//                 background={'teal'}
//                 color={'white'}
//                 fontSize={'1.5rem'}
//                 _hover={{ background: 'teal.500' }}
//                 mt={4}
//             >
//                 Add Information
//             </Button>
//         </Box>
//     );
// };

// export default AddMessInfo;
