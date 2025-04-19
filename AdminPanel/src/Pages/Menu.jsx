import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Container, Input, FormControl, FormLabel, useToast, Divider, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, useColorModeValue, useMediaQuery
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getMenu, reset, updateMenu } from '../Features/Menu/menuSlice';
import UtilFunctions from '../Utils/UtilFunctions';
import AddMessMenu from '../Components/AddMessMenu';

const Menu = () => {
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('gray.800', 'white');
  const dispatch = useDispatch();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const { menu, isLoading, isSuccess, isError, message } = useSelector(state => state.menu);

  useEffect(() => {
    dispatch(getMenu());
    return () => {
      dispatch(reset());
    }
  }, [dispatch]);

  const [updateFormData, setUpdateFormData] = useState(null);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (menu) {
      setUpdateFormData(menu);
    }
  }, [menu]);

  const onChange = (e) => {
    setDisable(false);
    const [day, meal] = e.target.name.split('_');
    setUpdateFormData((prev) => ({
      ...prev,
      weeklyMenu: {
        ...prev.weeklyMenu,
        [day]: {
          ...prev.weeklyMenu[day],
          [meal]: e.target.value
        }
      }
    }));
  };

  const onRemarkOrTimingChange = (e) => {
    setDisable(false);
    const { name, value } = e.target;
    if (name.startsWith('timing_')) {
      const timingKey = name.split('_')[1];
      setUpdateFormData((prev) => ({
        ...prev,
        timing: {
          ...prev.timing,
          [timingKey]: value
        }
      }));
    } else {
      setUpdateFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMenu({ id: updateFormData._id, updatedMenu: updateFormData }))
    // dispatch(updateMenu({ month: updateFormData.monthOfMenu, updatedMenu: updateFormData }))
  };

  // console.log(menu)

  useEffect(() => {
    if (isSuccess) {
      if (Array.isArray(menu) && menu.length == 0) {
        toast({
          title: 'No Menu Exists, Please Add A New One',
          isClosable: true,
          status: 'warning',
          duration: 3000,
        });
      }
      else {
        setDisable(true);
        toast({
          title: message,
          isClosable: true,
          status: 'success',
          duration: 3000,
        });
      }
    }

    if (isError) {
      toast({
        title: message,
        isClosable: true,
        status: 'error',
        duration: 3000,
      });
    }
  }, [dispatch, message]);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


  // if (!isLoading && menu && menu.length === 0) {
  //   return <AddMessMenu />;
  // }
  if (!isLoading && Array.isArray(menu)) {
    if (menu.length === 0) {
      return <AddMessMenu />;
    }
  }

  else if (isLoading || !updateFormData || !updateFormData.weeklyMenu) {
    return <Spinner message={'Loading Menu....'} />;
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
      <Box
        maxW={isMobile ? "100%" : "80rem"}
        mx="auto"
        p="5"
        bg={bgColor}
        color={textColor}
        borderRadius="md"
        id='table-content'
        overflowX="auto"
      >
        <Heading
          borderRadius="md"
          py={4}
          background={'#005252'}
          color="white"
          fontSize={'2rem'}
          textAlign={'center'}
          textTransform={'uppercase'}
        >
          Weekly Mess Schedule
        </Heading>
        {menu ? (
          <>
            <Table variant="striped" whiteSpace="nowrap" colorScheme='#1D1D1C'>
              <Thead height={'4rem'}>
                <Tr>
                  <Th fontSize={'1.5rem'} textAlign="center">Day</Th>
                  <Th fontSize={'1.5rem'} textAlign="center">Breakfast</Th>
                  <Th fontSize={'1.5rem'} textAlign="center">Lunch</Th>
                  <Th fontSize={'1.5rem'} textAlign="center">Dinner</Th>
                  <Th fontSize={'1.5rem'} textAlign="center">Extras</Th>
                </Tr>
              </Thead>
              <Tbody>
                {daysOfWeek.map((day) => (
                  <Tr key={day}>
                    <Td textAlign="center" fontSize={'1.5rem'}>{day.charAt(0).toUpperCase() + day.slice(1)}</Td>
                    <Td textAlign="center">{updateFormData.weeklyMenu[day]?.breakfast}</Td>
                    <Td textAlign="center">{updateFormData.weeklyMenu[day]?.lunch}</Td>
                    <Td textAlign="center">{updateFormData.weeklyMenu[day]?.dinner}</Td>
                    <Td textAlign="center">{updateFormData.weeklyMenu[day]?.extras}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Box mt="6" fontSize="lg">
              <Box fontWeight="bold" mb="2">Meal Timing:</Box>
              <Box>Breakfast: {updateFormData.timing?.breakfast}</Box>
              <Box>Lunch: {updateFormData.timing?.lunch}</Box>
              <Box>Dinner: {updateFormData.timing?.dinner}</Box>
              <Box>Special Timing: {updateFormData.timing?.specialTiming}</Box>
            </Box>
            {/* <Box mt="4" fontSize="lg" fontWeight="bold">
              Amount of One Meal : ₹{updateFormData.amountOfOneMeal}
            </Box> */}
            <Box mt="5" fontSize="lg" display={'flex'} gap={'1rem'}>
              <Box fontWeight="bold" mb="2">
                Additional Details :
              </Box>
              {updateFormData.remarks}
            </Box>
          </>
        ) : (<Heading>No Menu Approved So Far...</Heading>)}
      </Box>
      <Button mt="4" color={'white'} background={'#005252'} _hover={{ backgroundColor: 'teal' }} onClick={UtilFunctions.generatePDF}>
        Download as PDF
      </Button>
      <Box position='relative' paddingTop={'4rem'}>
        <Divider />
        <Heading
          textAlign="center"
          borderRadius="md"
          fontSize={'2rem'}
          textTransform={'uppercase'}
        >
          Update Menu
        </Heading>
      </Box>
      {updateFormData ? (
        <Container maxW="container.xl" py={8}>
          <Box bg={bgColor} color={textColor} borderRadius="lg">
            <VStack>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%">
                <Heading size="lg" textTransform="uppercase" mb={2}>Additional Info</Heading>
                <FormControl>
                  <FormLabel>Remarks</FormLabel>
                  <Input
                    onChange={onRemarkOrTimingChange}
                    value={updateFormData?.remarks || ''}
                    name='remarks'
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Timing (Breakfast)</FormLabel>
                  <Input
                    onChange={onRemarkOrTimingChange}
                    value={updateFormData?.timing?.breakfast || ''}
                    name='timing_breakfast'
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Timing (Lunch)</FormLabel>
                  <Input
                    onChange={onRemarkOrTimingChange}
                    value={updateFormData?.timing?.lunch || ''}
                    name='timing_lunch'
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Timing (Dinner)</FormLabel>
                  <Input
                    onChange={onRemarkOrTimingChange}
                    value={updateFormData?.timing?.dinner || ''}
                    name='timing_dinner'
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Special Timing</FormLabel>
                  <Input
                    onChange={onRemarkOrTimingChange}
                    value={updateFormData?.timing?.specialTiming || ''}
                    name='timing_specialTiming'
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>

              </Box>
              {daysOfWeek.map(day => (
                <Box key={day} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%">
                  <Heading size="lg" textTransform="uppercase" mb={2}>{day}</Heading>
                  <FormControl mb={4}>
                    <FormLabel>Breakfast</FormLabel>
                    <Input
                      onChange={onChange}
                      value={updateFormData?.weeklyMenu[day]?.breakfast || ''}
                      name={`${day}_breakfast`}
                      focusBorderColor='#B5B4B4'
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Lunch</FormLabel>
                    <Input
                      onChange={onChange}
                      value={updateFormData?.weeklyMenu[day]?.lunch || ''}
                      name={`${day}_lunch`}
                      focusBorderColor='#B5B4B4'
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Dinner</FormLabel>
                    <Input
                      onChange={onChange}
                      value={updateFormData?.weeklyMenu[day]?.dinner || ''}
                      name={`${day}_dinner`}
                      focusBorderColor='#B5B4B4'
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Extras</FormLabel>
                    <Input
                      onChange={onChange}
                      value={updateFormData?.weeklyMenu[day]?.extras || ''}
                      name={`${day}_extras`}
                      focusBorderColor='#B5B4B4'
                    />
                  </FormControl>
                </Box>
              ))}

            </VStack>
            <Button
              onClick={onUpdate}
              width={isMobile ? '100%' : '30%'}
              display={'inline-block'}
              alignSelf={'center'}
              background={'teal'}
              color={'white'}
              fontSize={'1.5rem'}
              _hover={{ background: 'teal.500' }}
              isDisabled={disable}
              mt={4}
            >
              Update Menu
            </Button>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Menu;