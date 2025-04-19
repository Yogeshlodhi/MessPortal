import React, { useEffect, useState } from 'react';
import {
    Box, Heading, Container, Input, FormControl, FormLabel, useToast, Divider, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, useColorModeValue, useMediaQuery
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMenu } from '../Features/Menu/menuSlice';

const AddMessMenu = () => {

    const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
    const textColor = useColorModeValue('gray.800', 'white');
    const dispatch = useDispatch();
    const toast = useToast();
    const [isMobile] = useMediaQuery("(max-width: 600px)");

    const { menu, isLoading, isSuccess, isError, message } = useSelector(state => state.menu);

    const [updateFormData, setUpdateFormData] = useState({
        remarks: '',
        timing: {
            breakfast: '',
            lunch: '',
            dinner: '',
            specialTiming: '',
        },
        weeklyMenu: {
            monday: { breakfast: '', lunch: '', dinner: '', extras: '' },
            tuesday: { breakfast: '', lunch: '', dinner: '', extras: '' },
            wednesday: { breakfast: '', lunch: '', dinner: '', extras: '' },
            thursday: { breakfast: '', lunch: '', dinner: '', extras: '' },
            friday: { breakfast: '', lunch: '', dinner: '', extras: '' },
            saturday: { breakfast: '', lunch: '', dinner: '', extras: '' },
            sunday: { breakfast: '', lunch: '', dinner: '', extras: '' },
        },
    });

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const onChange = (e) => {
        const { name, value } = e.target;
        const [parent, field] = name.split('_');

        if (parent && field) {
            if (parent === 'timing') {
                setUpdateFormData(prevState => ({
                    ...prevState,
                    timing: {
                        ...prevState.timing,
                        [field]: value,
                    },
                }));
            } else {
                setUpdateFormData(prevState => ({
                    ...prevState,
                    weeklyMenu: {
                        ...prevState.weeklyMenu,
                        [parent]: {
                            ...prevState.weeklyMenu[parent],
                            [field]: value,
                        },
                    },
                }));
            }
        } else {
            setUpdateFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewMenu(updateFormData));
    };


    if (isLoading) {
        return <Spinner message={'Please Wait .....'} />;
    }

    return (
        <Box
            border={'3px solid rgba(0, 0, 0, 0.05)'}
            color={textColor}
            bg={bgColor}
            boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
            gap={'1rem'}
            borderRadius={'1rem'}
            padding={'1rem'}
        >
            <Heading
                textAlign="center"
                borderRadius="md"
                fontSize={'2rem'}
                textTransform={'uppercase'}
            >
                Add New Menu
            </Heading>
            <Divider />
            <Container maxW="container.xl" py={8}>
                <Box bg={bgColor} color={textColor} borderRadius="lg">
                    <VStack>
                        <FormControl isRequired>
                            <FormLabel>Remarks</FormLabel>
                            <Input
                                onChange={onChange}
                                value={updateFormData.remarks}
                                name='remarks'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Timing (Breakfast)</FormLabel>
                            <Input
                                onChange={onChange}
                                value={updateFormData.timing.breakfast}
                                name='timing_breakfast'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Timing (Lunch)</FormLabel>
                            <Input
                                onChange={onChange}
                                value={updateFormData.timing.lunch}
                                name='timing_lunch'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Timing (Dinner)</FormLabel>
                            <Input
                                onChange={onChange}
                                value={updateFormData.timing.dinner}
                                name='timing_dinner'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Special Timing</FormLabel>
                            <Input
                                onChange={onChange}
                                value={updateFormData.timing.specialTiming}
                                name='timing_specialTiming'
                                focusBorderColor='#B5B4B4'
                            />
                        </FormControl>

                        {daysOfWeek.map(day => (
                            <Box key={day} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%">
                                <Heading size="lg" textTransform="uppercase" mb={2}>{day}</Heading>
                                <FormControl isRequired>
                                    <FormLabel>Breakfast</FormLabel>
                                    <Input
                                        onChange={onChange}
                                        value={updateFormData.weeklyMenu[day].breakfast}
                                        name={`${day}_breakfast`}
                                        focusBorderColor='#B5B4B4'
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Lunch</FormLabel>
                                    <Input
                                        onChange={onChange}
                                        value={updateFormData.weeklyMenu[day].lunch}
                                        name={`${day}_lunch`}
                                        focusBorderColor='#B5B4B4'
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Dinner</FormLabel>
                                    <Input
                                        onChange={onChange}
                                        value={updateFormData.weeklyMenu[day].dinner}
                                        name={`${day}_dinner`}
                                        focusBorderColor='#B5B4B4'
                                    />
                                </FormControl>
                            </Box>
                        ))}
                    </VStack>
                    <Button
                        width="100%"
                        mt={4}
                        colorScheme="teal"
                        _hover={{ bg: 'teal.500' }}
                        onClick={handleFormSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default AddMessMenu;
