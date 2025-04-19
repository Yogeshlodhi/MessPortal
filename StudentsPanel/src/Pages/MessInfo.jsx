
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessInfo } from '../Features/Mess/messSlice';
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
    Text,
    Avatar
} from '@chakra-ui/react';
import Spinner from '../Components/Spinner';

const MessInfo = () => {
    const dispatch = useDispatch();
    const { messInfo, isLoadingMess } = useSelector((state) => state.mess);

    const [updateFormData, setUpdateFormData] = useState(null);

    useEffect(() => {
        dispatch(getMessInfo());
    }, [dispatch]);

    useEffect(() => {
        if (messInfo) {
            setUpdateFormData(messInfo);
        }
    }, [messInfo]);


    const { mealPrice, contractInfo, tenureStarts, tenureEnds } = updateFormData || {};

    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
    const [isMobile] = useMediaQuery('(max-width: 600px)');

    if (isLoadingMess || !updateFormData) {
        return <Spinner message={'Loading Information...'} />;
    }

    // Check if messInfo is empty
    if (Object.keys(messInfo).length === 0) {
        return (
            <Box
                p={4}
                borderRadius={'0.5rem'}
                padding={'0.5rem'}
                border={'3px solid rgba(0, 0, 0, 0.05)'}
                boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
                bg={bgColor}
            >
                <Heading textAlign={'center'}>No Information Available</Heading>
            </Box>
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
                <Avatar name={messInfo.messOwner} width={'10rem'} height={'10rem'} alignSelf={'center'} />
                <Box
                    display={'flex'}
                    alignSelf={'center'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    gap={'1rem'}
                    flexDirection={isMobile ? 'column' : 'row'}
                >
                    <Heading fontSize={'1.8rem'}>Mess Owner : </Heading>
                    <Heading fontSize={'1.5rem'} textTransform={'uppercase'} color={'teal'}>{messInfo.messOwner}</Heading>
                </Box>
            </Container>
            <Heading mt={6} textAlign={'center'} textTransform={'uppercase'} fontSize={'1.5rem'}>Contacts : </Heading>
            <Container maxW='70rem' className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-2 gap-4'} padding={'1rem'}>
                {
                    messInfo?.contacts?.length !== 0 ? (
                        messInfo.contacts?.map((contact) => (
                            <Box padding="4" borderWidth="1px" borderRadius="lg" overflow="hidden" key={contact.contactNo}>
                                <Box display="flex" alignItems="center">
                                    <FormLabel mb="0">Serving as :</FormLabel>
                                    <Text ml="2">{contact.role}</Text>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <FormLabel mb="0">Mobile Number :</FormLabel>
                                    <Text ml="2">{contact.contactNo}</Text>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <FormLabel mb="0">Email Id:</FormLabel>
                                    <Text ml="2">{contact.emailId}</Text>
                                </Box>
                            </Box>

                        ))
                    ) : (
                        <Text color={'teal'}>No Contacts Were Added</Text>
                    )
                }
            </Container>
            <Heading mt={6} paddingLeft={'3rem'} textTransform={'uppercase'} fontSize={'1.5rem'}>Contract Details : </Heading>
            <Container
                display={'flex'}
                centerContent
                maxW={'70rem'}
            >
                <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
                    <Box display={'flex'}>
                        <FormLabel>Caterer : </FormLabel>
                        <Text>{contractInfo || ''}</Text>
                    </Box>

                    <Box display={'flex'}>
                        <FormLabel>Tenure Starts : </FormLabel>
                        <Text>{tenureStarts}</Text>
                    </Box>

                    <Box display={'flex'}>
                        <FormLabel>Tenure Ends : </FormLabel>
                        <Text>{tenureEnds}</Text>
                    </Box>
                    <Box display={'flex'}>
                        <FormLabel>Price per day : </FormLabel>
                        <Text>{mealPrice}</Text>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default MessInfo;
