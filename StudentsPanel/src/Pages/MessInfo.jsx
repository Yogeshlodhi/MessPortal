// mealprice, contactinfo, emailid, messowner, contractinfo
// tenure starts, tenure ends
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessInfo } from '../Features/MessInfo/messInfoSlice';
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
    const { messInfo, isLoadingMess } = useSelector((state) => state.messInfo);

    const [updateFormData, setUpdateFormData] = useState(null);

    useEffect(() => {
        dispatch(getMessInfo());
    }, [dispatch])

    useEffect(() => {
        if (messInfo) {
            setUpdateFormData(messInfo)
        }
    }, [messInfo])

    const { mealPrice, contactNo, emailId, messOwner, contractInfo, tenureStarts, tenureEnds } = updateFormData || {};

    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
    const [isMobile] = useMediaQuery('(max-width: 600px)');

    if (isLoadingMess || !updateFormData) {
        return <Spinner message={'Loading Information...'} />;
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
                <Avatar name='Mess Owner' width={'10rem'} height={'10rem'} alignSelf={'center'}/>
                <Box 
                    display={'flex'} 
                    alignSelf={'center'} 
                    justifyContent={'flex-start'} 
                    alignItems={'center'} 
                    gap={'1rem'}
                    flexDirection={isMobile ? 'column' : 'row'}
                >
                    <Heading fontSize={'1.8rem'}>Mess Owner : </Heading>
                    <Heading fontSize={'1.5rem'} textTransform={'uppercase'} color={'teal'}>{messOwner || ''}</Heading>
                </Box>
            </Container>
            <Container maxW='70rem' centerContent>
                <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
                    <Box display={'flex'}>
                        <FormLabel>Meal Price : </FormLabel>
                        <Text>{mealPrice || ''}</Text>
                    </Box>
                    <Box display={'flex'}>
                        <FormLabel>Contact Info : </FormLabel>
                        <Text>{contactNo || ''}</Text>
                    </Box>

                    <Box display={'flex'}>
                        <FormLabel>Email Id : </FormLabel>
                        <Text>{emailId || ''}</Text>
                    </Box>
                </Box>
            </Container>
            <Heading paddingLeft={'3rem'} fontSize={'1.5rem'}>Contract Information : </Heading>
            <Container 
                display={'flex'} 
                centerContent
                // gap={'2rem'} 
                maxW={'70rem'} 
                // flexDirection={isMobile ? 'column' : 'row'}
            >
                <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-4'}>
                    <Box display={'flex'}>
                        <FormLabel>Caterer : </FormLabel>
                        <Text>{contractInfo || ''}</Text>
                    </Box>

                    <Box display={'flex'}>
                        <FormLabel>Tenure Starts : </FormLabel>
                        <Text>{tenureStarts || ''}</Text>
                    </Box>

                    <Box display={'flex'}>
                        <FormLabel>Tenure Ends : </FormLabel>
                        <Text>{tenureEnds || ''}</Text>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default MessInfo;
