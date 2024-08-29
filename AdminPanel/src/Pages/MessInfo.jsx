import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessInfo, addContact, updateMessInfo } from '../Features/MessInfo/messInfoSlice';
import AddIcon from '@mui/icons-material/Add';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import { MdClose } from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';
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
    IconButton,
    Icon,
    Text,
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

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        console.log("clicked")
        console.log({ id: updateFormData._id, updatedInfo: updateFormData })
        dispatch(updateMessInfo({ id: updateFormData._id, updatedInfo: updateFormData }))
    }

    const { mealPrice, messOwner, contractInfo, tenureStarts, tenureEnds } = updateFormData || {};

    if (isLoadingMess || !updateFormData) return <Spinner message={'Loading Information...'} />;

    if (Object.keys(messInfo).length === 0) {
        return (
            <AddMessInfo />
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
                    justifyContent='flex-start'
                    // justifyContent={isMobile ? "center" : "flex-start"}
                    // alignItems="center"
                    alignItems="flex-start"
                    gap="1rem"
                    width={isMobile ? "100%" : "60%"}
                    flexDirection={isMobile ? "column" : "row"}
                >
                    <Heading fontSize="1.8rem" flexShrink={0}>Mess Owner :</Heading>
                    <FormControl flex={1}>
                        <Input
                            value={messOwner}
                            name='messOwner'
                            onChange={handleInputChange}
                            fontSize="1.5rem"
                            textTransform="uppercase"
                            color="teal"
                        />
                    </FormControl>
                </Box>
            </Container>

            <Box display="flex" alignItems="flex-start" mt={6}>
                <Heading textTransform="uppercase" fontSize="1.5rem" mr={4}>Contacts :</Heading>
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
                    <Box key={index} padding="4" borderWidth="1px" borderRadius="lg" overflow="hidden" position="relative" paddingTop={'3rem'}>
                        <IconButton
                            icon={<Icon as={DeleteIcon} />}
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Close"
                            position="absolute"
                            top="4px"
                            right="4px"
                        // onClick={() => handleResolve(contact)}
                        />
                        <Box display="flex" alignItems="center" mb={4}>
                            <WorkIcon />
                            <FormControl ml={6}>
                            <Text maxWidth={'300px'}>{contact.role}</Text>
                            </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center" mb={4}>
                            <CallIcon />
                            <FormControl ml={6}>
                                <Text maxWidth={'300px'}>{contact.contactNo}</Text>
                            </FormControl>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <MailIcon />
                            <FormControl ml={6}>
                                <Text maxWidth={'300px'}>{contact.emailId}</Text>
                            </FormControl>
                        </Box>
                    </Box>
                ))}
            </Container>

            <Heading mt={6} textTransform={'uppercase'} fontSize={'1.5rem'}>Contract Details : </Heading>
            <Container
                display={'flex'}
                centerContent
                maxW={'70rem'}
            >
                <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
                    <Box display={'flex'}>
                        <FormControl mt={2}>
                            <FormLabel>Caterer : </FormLabel>
                            <Input
                                value={contractInfo}
                                name="contractInfo"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl mt={4}>
                            <FormLabel>Tenure Starts : </FormLabel>
                            <Input
                                type='date'
                                value={tenureStarts}
                                name="tenureStarts"
                                onChange={handleInputChange}
                                />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl mt={4}>
                            <FormLabel>Tenure Ends : </FormLabel>
                            <Input
                                type='date'
                                value={tenureEnds}
                                name="tenureEnds"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                    <Box display={'flex'}>
                        <FormControl mt={4}>
                            <FormLabel>Total Price Per Day : </FormLabel>
                            <Input
                                value={mealPrice}
                                name="mealPrice"
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Container>
            <Button
                width={isMobile ? '100%' : '30%'}
                display={'inline-block'}
                alignSelf={'center'}
                background={'teal'}
                color={'white'}
                fontSize={'1.5rem'}
                _hover={{ background: 'teal.500' }}
                mt={4}
                onClick={handleUpdateInfo}
            >
                Update Information
            </Button>
            <Modal isOpen={isAddOpen} onClose={onAddClose}>
                <ModalOverlay />
                <ModalContent bg={bgColor} color={textColor} marginLeft={'0.5rem'} marginRight={'0.5rem'} alignSelf={'center'}>
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
                                placeholder='Mess Secretery'
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Mobile Number :</FormLabel>
                            <Input
                                name="contactNo"
                                value={newContact.contactNo}
                                onChange={handleNewContactChange}
                                focusBorderColor='#B5B4B4'
                                placeholder='9999999999'
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Email Id:</FormLabel>
                            <Input
                                name="emailId"
                                value={newContact.emailId}
                                onChange={handleNewContactChange}
                                focusBorderColor='#B5B4B4'
                                placeholder='user@gmail.com'
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