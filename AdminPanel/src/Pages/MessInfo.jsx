import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessInfo, addContact, updateContact } from '../Features/MessInfo/messInfoSlice';
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
    useDisclosure,
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import Spinner from '../Components/Spinner';
import WorkIcon from '@mui/icons-material/Work';
import AddMessInfo from '../Components/AddMessInfo';

const MessInfo = () => {
    const dispatch = useDispatch();
    const { messInfo, isLoadingMess } = useSelector((state) => state.messInfo);
    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
    const textColor = useColorModeValue('gray.800', 'white');
    const [isMobile] = useMediaQuery('(max-width: 600px)');
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    const [updateFormData, setUpdateFormData] = useState(null);
    const [newContact, setNewContact] = useState({
        role: '',
        contactNo: '',
        emailId: ''
    });

    // console.log(messInfo)

    useEffect(() => {
        dispatch(getMessInfo());
    }, [dispatch]);

    useEffect(() => {
        if (messInfo) {
            setUpdateFormData(messInfo);
        }
    }, [messInfo]);

    const handleAddContact = () => {
        dispatch(addContact({ ...newContact, id: messInfo._id }))
            .then(() => {
                onAddClose();
                setNewContact({ role: '', contactNo: '', emailId: '' });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNewContactChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { mealPrice, messOwner, contractInfo, tenureStarts, tenureEnds } = updateFormData || {};

    if (isLoadingMess || !updateFormData) {
        return <Spinner message={'Loading Information...'} />;
    }

    if (Object.keys(messInfo).length === 0) {
        return (
            <AddMessInfo/>
        );
    }

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
                <Avatar name={messOwner} width={'10rem'} height={'10rem'} alignSelf={'center'} />
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
                            value={messOwner || ''}
                            name='messOwner'
                            onChange={handleInputChange}
                            fontSize="1.5rem"
                            textTransform="uppercase"
                            color="teal"
                        />
                    </FormControl>
                </Box>
            </Container>

            <Box display="flex" alignItems="center" mt={6} paddingLeft="3rem">
                <Heading textTransform="uppercase" fontSize="1.5rem" mr={4}>
                    Contacts:
                </Heading>
                <Button
                    onClick={onAddOpen}
                    colorScheme="green"
                    alignSelf="center"
                    justifyContent="center"
                >
                    <AddIcon />
                </Button>
            </Box>

            <Container maxW='70rem' className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-3 gap-4'} padding={'1rem'}>
                {messInfo.contacts && messInfo.contacts.map((contact, index) => (
                    <Box key={index} padding="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Box display="flex" alignItems="center" mb={4}>
                            <WorkIcon />
                            <FormControl ml={6}>
                                <Input
                                    value={contact.role || ''}
                                    placeholder="Role"
                                    maxWidth="300px"
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" alignItems="center" mb={4}>
                            <CallIcon />
                            <FormControl ml={6}>
                                <Input
                                    value={contact.contactNo || ''}
                                    placeholder="Contact No"
                                    maxWidth="300px"
                                />
                            </FormControl>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <MailIcon />
                            <FormControl ml={6}>
                                <Input
                                    value={contact.emailId || ''}
                                    placeholder="Email ID"
                                    maxWidth="300px"
                                />
                            </FormControl>
                        </Box>
                    </Box>
                ))}
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
                                value={contractInfo || ''}
                                name="contractInfo"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Tenure Starts : </FormLabel>
                            <Input
                                value={tenureStarts || ''}
                                name="tenureStarts"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Tenure Ends : </FormLabel>
                            <Input
                                value={tenureEnds || ''}
                                name="tenureEnds"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl>
                            <FormLabel>Meal Price : </FormLabel>
                            <Input
                                value={mealPrice || ''}
                                name="mealPrice"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Container>
            <Button
                // onClick={handleUpdateContact}
                width={isMobile ? '100%' : '30%'}
                display={'inline-block'}
                alignSelf={'center'}
                background={'teal'}
                color={'white'}
                fontSize={'1.5rem'}
                _hover={{ background: 'teal.500' }}
                // isDisabled={disable}
                mt={4}
            >
                Update Information
            </Button>
            <Modal isOpen={isAddOpen} onClose={onAddClose}>
                <ModalOverlay />
                <ModalContent bg={bgColor} color={textColor}>
                    <ModalHeader>Add New Contact</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired mt={6}>
                            <FormLabel>Serving as :</FormLabel>
                            <Input
                                name="role"
                                value={newContact.role}
                                onChange={handleNewContactChange}
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Mobile Number :</FormLabel>
                            <Input
                                name="contactNo"
                                value={newContact.contactNo}
                                onChange={handleNewContactChange}
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Email Id:</FormLabel>
                            <Input
                                name="emailId"
                                value={newContact.emailId}
                                onChange={handleNewContactChange}
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            onClick={handleAddContact}
                        >
                            Add Contact
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default MessInfo;



// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getMessInfo } from '../Features/MessInfo/messInfoSlice';
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
//     Text,
//     Avatar,
//     useDisclosure,
//     Modal, ModalOverlay,
//     ModalContent, ModalHeader,
//     ModalFooter, ModalBody,
//     ModalCloseButton,
//     Textarea,
// } from '@chakra-ui/react';
// import Spinner from '../Components/Spinner';
// import WorkIcon from '@mui/icons-material/Work';

// const MessInfo = () => {
//     const dispatch = useDispatch();
//     const { messInfo, isLoadingMess } = useSelector((state) => state.messInfo);
//     const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
//     const [isMobile] = useMediaQuery('(max-width: 600px)');

//     const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

//     const [updateFormData, setUpdateFormData] = useState(null);
//     const handleModalClose = () => {
//         // resetForm();
//         onAddClose();
//     };

//     useEffect(() => {
//         dispatch(getMessInfo());
//     }, [dispatch])

//     useEffect(() => {
//         if (messInfo) {
//             setUpdateFormData(messInfo)
//         }
//     }, [messInfo])

//     const { mealPrice, contactNo, emailId, messOwner, contractInfo, tenureStarts, tenureEnds } = updateFormData || {};


//     if (isLoadingMess || !updateFormData) {
//         return <Spinner message={'Loading Information...'} />;
//     }

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
//                     // background="red"
//                     width={isMobile ? "100%" : "60%"}
//                     flexDirection={isMobile ? "column" : "row"}
//                 >
//                     <Heading fontSize="1.8rem" flexShrink={0}>
//                         Mess Owner:
//                     </Heading>
//                     <FormControl flex={1}>
//                         <Input
//                             value={messOwner || ''}
//                             name='messOwner'
//                             fontSize="1.5rem"
//                             textTransform="uppercase"
//                             color="teal"
//                         />
//                     </FormControl>
//                 </Box>

//             </Container>

//             <Box display="flex" alignItems="center" mt={6} paddingLeft="3rem">
//                 <Heading textTransform="uppercase" fontSize="1.5rem" mr={4}>
//                     Contacts:
//                 </Heading>
//                 <Button
//                     onClick={onAddOpen}
//                     colorScheme="green"
//                     alignSelf="center"
//                     justifyContent="center"
//                 >
//                     <AddIcon />
//                 </Button>
//             </Box>

//             <Container maxW='70rem' className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-3 gap-4'} padding={'1rem'}>
//                 <Box padding="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
//                     <Box display="flex" alignItems="center" mb={4}>
//                         <WorkIcon />
//                         <FormControl ml={6}>
//                             <Input
//                                 value={emailId || ''}
//                                 placeholder="Email ID"
//                                 maxWidth="300px"
//                             />
//                         </FormControl>
//                     </Box>
//                     <Box display="flex" alignItems="center" mb={4}>
//                         <CallIcon />
//                         <FormControl ml={6}>
//                             <Input
//                                 value={contactNo || ''}
//                                 placeholder="Contact No"
//                                 maxWidth="300px"
//                             />
//                         </FormControl>
//                     </Box>
//                     <Box display="flex" alignItems="center">
//                         <MailIcon />
//                         <FormControl ml={6}>
//                             <Input
//                                 value={emailId || ''}
//                                 placeholder="Email ID"
//                                 maxWidth="300px"
//                             />
//                         </FormControl>
//                     </Box>
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
//                                 value={contractInfo || ''}
//                             />
//                         </FormControl>
//                     </Box>

//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Tenure Starts : </FormLabel>
//                             <Input
//                                 value={tenureStarts || ''}
//                             />
//                         </FormControl>
//                     </Box>

//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Tenure Ends : </FormLabel>
//                             <Input
//                                 value={tenureEnds || ''}
//                             />
//                         </FormControl>
//                     </Box>
//                     <Box display={'flex'}>
//                         <FormControl>
//                             <FormLabel>Meal Price : </FormLabel>
//                             <Input
//                                 value={mealPrice || ''}
//                             />
//                         </FormControl>
//                     </Box>
//                 </Box>
//             </Container>
//             <Button
//                 // onClick={onUpdate}
//                 width={isMobile ? '100%' : '30%'}
//                 display={'inline-block'}
//                 alignSelf={'center'}
//                 background={'teal'}
//                 color={'white'}
//                 fontSize={'1.5rem'}
//                 _hover={{ background: 'teal.500' }}
//                 // isDisabled={disable}
//                 mt={4}
//             >
//                 Update Information
//             </Button>
//             <Modal isOpen={isAddOpen}
//                 onClose={handleModalClose}
//             >
//                 <ModalOverlay />
//                 <ModalContent
//                 // bg={bgColor}
//                 // color={textColor}
//                 >
//                     <ModalHeader>Add New Contact</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <FormControl isRequired mt={6}>
//                             <FormLabel>Serving as :</FormLabel>
//                             <Input
//                                 value={emailId || ''}
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>

//                         <FormControl mt={6}>
//                             <FormLabel>Mobile Number :</FormLabel>
//                             <Input
//                                 value={contactNo || ''}
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>

//                         <FormControl mt={6}>
//                             <FormLabel>Email Id:</FormLabel>
//                             <Input
//                                 value={emailId || ''}
//                                 focusBorderColor='#B5B4B4'
//                             />
//                         </FormControl>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button
//                             colorScheme="green"
//                             mr={3}
//                         // onClick={handleFormSubmit}
//                         >
//                             Add Contact
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Box>
//     );
// };

// export default MessInfo;
