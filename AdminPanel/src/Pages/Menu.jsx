// import React from 'react'
// import { Box, Heading, Container, Text, VStack, HStack, useColorModeValue, Divider, Icon } from '@chakra-ui/react'
// import { FaCoffee, FaUtensils } from 'react-icons/fa'
// import { GiMeal } from 'react-icons/gi'

// const Menu = () => {
//   const bgColor = useColorModeValue('gray.100', 'gray.900');
//   const textColor = useColorModeValue('gray.800', 'white');
//   const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

//   const menuData = {
//     remarks: "There will be special Dinner tonight",
//     timing: {
//       breakfast: "8:00 AM To 10:00 AM",
//       lunch: "12:45 PM To 02:00 PM",
//       dinner: "8:00 PM To 10:00 PM"
//     },
//     monday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     tuesday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     wednesday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     thursday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     friday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     saturday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     sunday: {
//       breakfast: "Aloo Paratha",
//       lunch: "Mix Veg",
//       dinner: "Paneer"
//     },
//     amountOfOneMeal: 55,
//     monthOfMenu: "August"
//   };

//   return (
//     <Container maxW="container.xl" py={8}>
//       <Box bg={bgColor} color={textColor} borderRadius="lg" p={8} boxShadow="lg">
//         <Heading textAlign="center" mb={4}>Menu for {menuData.monthOfMenu}</Heading>
//         <Text textAlign="center" fontSize="lg" mb={6}>{menuData.remarks}</Text>
//         <VStack spacing={6}>
//           <Text fontSize="xl" fontWeight="bold">Timings:</Text>
//           <HStack spacing={12}>
//             <HStack>
//               <Icon as={FaCoffee} w={6} h={6} />
//               <Text fontSize="lg">Breakfast: {menuData.timing.breakfast}</Text>
//             </HStack>
//             <HStack>
//               <Icon as={GiMeal} w={6} h={6} />
//               <Text fontSize="lg">Lunch: {menuData.timing.lunch}</Text>
//             </HStack>
//             <HStack>
//               <Icon as={FaUtensils} w={6} h={6} />
//               <Text fontSize="lg">Dinner: {menuData.timing.dinner}</Text>
//             </HStack>
//           </HStack>
//           <Divider borderColor={textColor} />
//           {daysOfWeek.map(day => (
//             <Box key={day} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%" bg={useColorModeValue('white', 'gray.700')}>
//               <Heading size="md" textTransform="capitalize" mb={2}>{day}</Heading>
//               <Text><b>Breakfast:</b> {menuData[day].breakfast}</Text>
//               <Text><b>Lunch:</b> {menuData[day].lunch}</Text>
//               <Text><b>Dinner:</b> {menuData[day].dinner}</Text>
//             </Box>
//           ))}
//           <Divider borderColor={textColor} />
//           <Text fontSize="lg">Amount for one meal: <b>₹{menuData.amountOfOneMeal}</b></Text>
//         </VStack>
//       </Box>
//     </Container>
//   );
// }

// export default Menu;

import React, { useEffect, useState } from 'react'
import { Box, Heading, Container, Input, FormControl, FormLabel, useToast, Button, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { getMenu, updateMenu } from '../Features/Menu/menuSlice';

const Menu = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const dispatch = useDispatch();
  const toast = useToast();

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
  }

  const onUpdate = (e) => {
    e.preventDefault();
    const { monthOfMenu } = updateFormData; // Extract month from the form data
    dispatch(updateMenu({ month: monthOfMenu, updatedMenu: updateFormData })) // Pass month along with the updatedMenu
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
}


  if (isLoading || !updateFormData) {
    return <Spinner message={'Loading Menu'} />;
  }

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


  return (
    <Container maxW="container.xl" py={8}>
      <Box bg={bgColor} color={textColor} borderRadius="lg" p={8} boxShadow="lg">
        <Heading textAlign="center" mb={4}>Menu for {updateFormData.monthOfMenu}</Heading>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel>Remarks</FormLabel>
            <Input
              onChange={(e) => setUpdateFormData({ ...updateFormData, remarks: e.target.value })}
              value={updateFormData.remarks || ''}
              name='remarks'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Timing (Breakfast)</FormLabel>
            <Input
              onChange={(e) => setUpdateFormData({ ...updateFormData, timing: { ...updateFormData.timing, breakfast: e.target.value } })}
              value={updateFormData.timing?.breakfast || ''}
              name='timing_breakfast'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Timing (Lunch)</FormLabel>
            <Input
              onChange={(e) => setUpdateFormData({ ...updateFormData, timing: { ...updateFormData.timing, lunch: e.target.value } })}
              value={updateFormData.timing?.lunch || ''}
              name='timing_lunch'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Timing (Dinner)</FormLabel>
            <Input
              onChange={(e) => setUpdateFormData({ ...updateFormData, timing: { ...updateFormData.timing, dinner: e.target.value } })}
              value={updateFormData.timing?.dinner || ''}
              name='timing_dinner'
            />
          </FormControl>
          {daysOfWeek.map(day => (
            <Box key={day} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%" bg={useColorModeValue('white', 'gray.700')}>
              <Heading size="lg" textTransform="capitalize" mb={2}>{day}</Heading>
              <FormControl mb={4}>
                <FormLabel>Breakfast</FormLabel>
                <Input
                  onChange={onChange}
                  value={updateFormData[day]?.breakfast || ''}
                  name={`${day}_breakfast`}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Lunch</FormLabel>
                <Input
                  onChange={onChange}
                  value={updateFormData[day]?.lunch || ''}
                  name={`${day}_lunch`}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Dinner</FormLabel>
                <Input
                  onChange={onChange}
                  value={updateFormData[day]?.dinner || ''}
                  name={`${day}_dinner`}
                />
              </FormControl>
            </Box>
          ))}
          <FormControl>
            <FormLabel>Amount for one meal</FormLabel>
            <Input
              onChange={(e) => setUpdateFormData({ ...updateFormData, amountOfOneMeal: e.target.value })}
              value={updateFormData.amountOfOneMeal || ''}
              name='amountOfOneMeal'
            />
          </FormControl>
        </VStack>
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
          mt={4}
        >
          Update Menu
        </Button>
      </Box>
    </Container>
  )
}

export default Menu;
