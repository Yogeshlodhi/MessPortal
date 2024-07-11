import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Container, Input, FormControl, FormLabel, useToast, Divider, AbsoluteCenter, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, useColorModeValue, useMediaQuery
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getMenu, updateMenu } from '../Features/Menu/menuSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Menu = () => {
  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  const textColor = useColorModeValue('gray.800', 'white');
  const dispatch = useDispatch();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  const { isLoading, menu } = useSelector(state => state.menu);
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
      [day]: {
        ...prev[day],
        [meal]: e.target.value
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
    const { monthOfMenu } = updateFormData;
    dispatch(updateMenu({ month: monthOfMenu, updatedMenu: updateFormData }))
      .unwrap()
      .then(() => {
        setDisable(true);
        toast({
          title: 'Menu Updated Successfully',
          status: 'success',
          isClosable: true,
          duration: 3000
        });
      })
      .catch(error => {
        console.error('Failed to update menu:', error);
        toast({
          title: 'Failed to Update Menu',
          description: error.message || 'An error occurred while updating the menu',
          status: 'error',
          isClosable: true,
          duration: 3000
        });
      });
  };

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const generatePDF = () => {
    const input = document.getElementById('table-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('meal-schedule.pdf');
    });
  };

  if (isLoading || !updateFormData) {
    return <Spinner message={'Loading Menu'} />;
  }

  const mealData = {
    weeklyMenu: {
      monday: menu.monday,
      tuesday: menu.tuesday,
      wednesday: menu.wednesday,
      thursday: menu.thursday,
      friday: menu.friday,
      saturday: menu.saturday,
      sunday: menu.sunday,
    }
  };

  return (
    <Box
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      color={textColor}
      // margin={isMobile ? '0.5rem' : 0}
      bg={bgColor}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
      gap={'1rem'}
      borderRadius={'1rem'}
      // height={isMobile ? 'auto' : '100%'}
      padding={'1rem'}
    >
      <Box
        maxW={isMobile ? "100%" : "70rem"}
        mx="auto"
        p="5"
        bg={bgColor}
        color={textColor}
        borderRadius="md"
        // boxShadow="md"
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
        <Table variant="striped"
          whiteSpace="nowrap"
          colorScheme='#1D1D1C'>
          <Thead height={'4rem'}>
            <Tr>
              <Th fontSize={'1.5rem'} textAlign="center">Day</Th>
              <Th fontSize={'1.5rem'} textAlign="center">Breakfast</Th>
              <Th fontSize={'1.5rem'} textAlign="center">Lunch</Th>
              <Th fontSize={'1.5rem'} textAlign="center">Dinner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(mealData.weeklyMenu).map((day) => (
              <Tr key={day}>
                <Td textAlign="center" fontSize={'1.5rem'}>{day.charAt(0).toUpperCase() + day.slice(1)}</Td>
                <Td textAlign="center">{mealData.weeklyMenu[day].breakfast}</Td>
                <Td textAlign="center">{mealData.weeklyMenu[day].lunch}</Td>
                <Td textAlign="center">{mealData.weeklyMenu[day].dinner}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box mt="6" fontSize="lg">
          <Box fontWeight="bold" mb="2">Meal Timing:</Box>
          <Box>Breakfast: {menu.timing.breakfast}</Box>
          <Box>Lunch: {menu.timing.lunch}</Box>
          <Box>Dinner: {menu.timing.dinner}</Box>
        </Box>
        <Box mt="4" fontSize="lg" fontWeight="bold">
          Amount of One Meal : ₹{menu.amountOfOneMeal}
        </Box>
        <Box mt="5" fontSize="lg" display={'flex'} gap={'1rem'}>
          <Box fontWeight="bold" mb="2">
            Additional Details :
          </Box>
          {menu.remarks}
        </Box>
      </Box>
      <Button mt="4" color={'white'}
        background={'#005252'}
        _hover={{ backgroundColor: 'teal' }} onClick={generatePDF}>Download as PDF</Button>
      <Box position='relative' paddingTop={'4rem'}>
        <Divider />
        <Heading
          textAlign="center"
          borderRadius="md"
          fontSize={'2rem'}
          textTransform={'uppercase'}
        >
          Update Menu for {updateFormData.monthOfMenu}
        </Heading>
      </Box>
      <Container maxW="container.xl" py={8}>
        <Box
          bg={bgColor}
          color={textColor}
          borderRadius="lg"
        >
          <VStack>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              w="100%"
            >
              <Heading size="lg" textTransform="uppercase" mb={2}>Additional Info</Heading>
              <FormControl>
                <FormLabel>Remarks</FormLabel>
                <Input
                  onChange={onRemarkOrTimingChange}
                  value={updateFormData.remarks || ''}
                  name='remarks'
                  focusBorderColor='#B5B4B4'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Timing (Breakfast)</FormLabel>
                <Input
                  onChange={onRemarkOrTimingChange}
                  value={updateFormData.timing?.breakfast || ''}
                  name='timing_breakfast'
                  focusBorderColor='#B5B4B4'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Timing (Lunch)</FormLabel>
                <Input
                  onChange={onRemarkOrTimingChange}
                  value={updateFormData.timing?.lunch || ''}
                  name='timing_lunch'
                  focusBorderColor='#B5B4B4'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Timing (Dinner)</FormLabel>
                <Input
                  onChange={onRemarkOrTimingChange}
                  value={updateFormData.timing?.dinner || ''}
                  name='timing_dinner'
                  focusBorderColor='#B5B4B4'
                />
              </FormControl>
            </Box>
            {daysOfWeek.map(day => (
              <Box
                key={day}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                w="100%"
              // bg={useColorModeValue('white', 'gray.700')}
              >
                <Heading size="lg" textTransform="uppercase" mb={2}>{day}</Heading>
                <FormControl mb={4}>
                  <FormLabel>Breakfast</FormLabel>
                  <Input
                    onChange={onChange}
                    value={updateFormData[day]?.breakfast || ''}
                    name={`${day}_breakfast`}
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Lunch</FormLabel>
                  <Input
                    onChange={onChange}
                    value={updateFormData[day]?.lunch || ''}
                    name={`${day}_lunch`}
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Dinner</FormLabel>
                  <Input
                    onChange={onChange}
                    value={updateFormData[day]?.dinner || ''}
                    name={`${day}_dinner`}
                    focusBorderColor='#B5B4B4'
                  />
                </FormControl>
              </Box>
            ))}
            <FormControl>
              <FormLabel textTransform={'uppercase'}>Amount for one meal</FormLabel>
              <Input
                onChange={(e) => {
                  setDisable(false);
                  setUpdateFormData({ ...updateFormData, amountOfOneMeal: e.target.value })
                }}
                value={updateFormData.amountOfOneMeal || ''}
                name='amountOfOneMeal'
                focusBorderColor='#B5B4B4'
              />
            </FormControl>
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
    </Box>
  );
};

export default Menu;

