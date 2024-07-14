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
    useMediaQuery
} from '@chakra-ui/react';
import UtilFunctions from '../Utils/UtilFunctions';
import Spinner from '../Components/Spinner';

const MessInfo = () => {
    const dispatch = useDispatch();
    const { messInfo, isLoadingMess } = useSelector((state) => state.messInfo);
    const [updateFormData, setUpdateFormData] = useState(null);
    // const [updateFormData, setUpdateFormData] = useState({
    //     mealPrice: '',
    //     contactNo: '',
    //     emailId: '',
    //     messOwner: '',
    //     contractInfo: '',
    //     tenureStarts: '',
    //     tenureEnds: '',
    // });
    

    useEffect(() => {
        dispatch(getMessInfo());
    }, [dispatch])

    useEffect(() => {
        if(messInfo){
            setUpdateFormData(messInfo)
        }
    }, [messInfo])

    const { mealPrice, contactNo, emailId, messOwner, contractInfo, tenureStarts, tenureEnds } = updateFormData || {};

    const onChange = (e) => {
        setUpdateFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

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
            <Container maxW='70rem' centerContent>
                <Box padding='4' w={'100%'} className={isMobile ? '' : 'grid grid-cols-2 gap-6'}>
                    <FormControl mt={4}>
                        <FormLabel>Meal Price : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={mealPrice || ''}
                            name='mealPrice'
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Contact Info : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={contactNo || ''}
                            name='contactNo'
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email Id : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={emailId || ''}
                            name='emailId'
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Mess Owner : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={messOwner || ''}
                            name='messOwner'
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Contract Info : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={contractInfo || ''}
                            name='contractInfo'
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Tenure Starts : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={tenureStarts || ''}
                            name='tenureStarts'
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Tenure Ends : </FormLabel>
                        <Input
                            onChange={onChange}
                            value={tenureEnds || ''}
                            name='tenureEnds'
                        />
                    </FormControl>
                </Box>
            </Container>
            <Button
                mt={4}
                width={'50%'}
                background={'teal'}
                color={'white'}
                fontSize={'1.5rem'}
                _hover={{ background: 'teal.500' }}
                onClick={() => {
                    // Handle button click action here
                }}
            >
                Update Mess Info
            </Button>
        </Box>
    );
};

export default MessInfo;
