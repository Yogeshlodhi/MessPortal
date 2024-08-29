import React, { useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../Features/Mess/messSlice';
import Spinner from '../Components/Spinner';
import UtilFunctions from '../Utils/UtilFunctions';

const Menu = () => {
  const dispatch = useDispatch();
  const bgColor = useColorModeValue('lightMode.Bg', 'darkMode.Bg');
  const textColor = useColorModeValue('black', 'white');
  
  const { menu, isErrorMenu, isMenuSuccess, isMenuLoading, menuMessage } = useSelector((state) => state.mess);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  if (!isMenuLoading && menu && menu.length === 0) {
    return <Heading textAlign={'center'}>No menu has been approved till now, Please contact the Admin </Heading>;
  }
  else if (isMenuLoading || !menu) {
    return <Spinner message={'Fetching Mess Menu'} />;
  }

  const weeklyMenu = menu.weeklyMenu || {};

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius={'1rem'}
      padding={'0.5rem'}
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
    >
      <Box
        maxW="100%"
        mx="auto"
        p={4}
        borderRadius="md"
        id="table-content"
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
        <Box overflowX="auto">
          <Table 
            variant="striped" 
            whiteSpace="nowrap"
            colorScheme='teal'
          >
            <Thead>
              <Tr>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Day</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Breakfast</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Lunch</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Dinner</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Extras</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(weeklyMenu).map((day) => (
                <Tr key={day}>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{weeklyMenu[day]?.breakfast}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{weeklyMenu[day]?.lunch}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{weeklyMenu[day]?.dinner}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{weeklyMenu[day]?.extras}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box mt={6} fontSize={{ base: 'sm', md: 'md' }} color={textColor}>
          <Box fontWeight="bold" mb={2}>Meal Timing:</Box>
          <Box>Breakfast: {menu.timing?.breakfast}</Box>
          <Box>Lunch: {menu.timing?.lunch}</Box>
          <Box>Dinner: {menu.timing?.dinner}</Box>
        </Box>
        {/* <Box mt={4} fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color={textColor}>
          Amount of One Meal: ₹{menu.amountOfOneMeal}
        </Box> */}
        <Box mt={5} fontSize={{ base: 'sm', md: 'md' }} display="flex" gap="1rem" flexWrap="wrap" color={textColor}>
          <Box fontWeight="bold" mb={2}>
            Additional Details:
          </Box>
          <Box>{menu.remarks}</Box>
        </Box>
      </Box>
      <Button mt={4}
        color={'white'}
        background={'#005252'}
        _hover={{ backgroundColor: 'teal' }}
        onClick={UtilFunctions.generatePDF}
      >
        Download as PDF
      </Button>
    </Box>
  );
};

export default Menu;



// import React, { useEffect } from 'react';
// import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useColorModeValue } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMenu } from '../Features/Mess/messSlice';
// import Spinner from '../Components/Spinner';
// import UtilFunctions from '../Utils/UtilFunctions';

// const Menu = () => {
//   const dispatch = useDispatch();
//   const bgColor = useColorModeValue('lightMode.Bg', 'darkMode.Bg');
//   const textColor = useColorModeValue('black', 'white');
  
//   const { menu, isErrorMenu, isMenuSuccess, isMenuLoading, menuMessage } = useSelector((state) => state.mess);

//   useEffect(() => {
//     dispatch(getMenu());
//   }, [dispatch]);

//   console.log(menu);

//   const mealData = menu && {
//     weeklyMenu: {
//       monday: menu.monday,
//       tuesday: menu.tuesday,
//       wednesday: menu.wednesday,
//       thursday: menu.thursday,
//       friday: menu.friday,
//       saturday: menu.saturday,
//       sunday: menu.sunday,
//     },
//     timing: menu.timing,
//     amountOfOneMeal: menu.amountOfOneMeal,
//     remarks: menu.remarks
//   };
  
//   if (
//     // !mealData || 
//     isMenuLoading  
//     // !menu.monday || 
//     // !menu.timing
//   ) {
//     return <Spinner message={'Fetching Mess Menu'} />;
//   }

//   return (
//     <Box
//       p={4}
//       bg={bgColor}
//       borderRadius={'1rem'}
//       padding={'0.5rem'}
//       border={'3px solid rgba(0, 0, 0, 0.05)'}
//       boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)'}
//     >
//       <Box
//         maxW="100%"
//         mx="auto"
//         p={4}
//         borderRadius="md"
//         id="table-content"
//         overflowX="auto"
//       >
//         <Heading
//           borderRadius="md"
//           py={4}
//           background={'#005252'}
//           color="white"
//           fontSize={'2rem'}
//           textAlign={'center'}
//           textTransform={'uppercase'}
//         >
//           Weekly Mess Schedule
//         </Heading>
//         <Box overflowX="auto">
//           <Table 
//             variant="striped" 
//             whiteSpace="nowrap"
//             colorScheme='teal'
//           >
//             <Thead>
//               <Tr>
//                 <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Day</Th>
//                 <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Breakfast</Th>
//                 <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Lunch</Th>
//                 <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Dinner</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {Object.keys(mealData.weeklyMenu).map((day) => (
//                 <Tr key={day}>
//                   <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{day.charAt(0).toUpperCase() + day.slice(1)}</Td>
//                   <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{mealData.weeklyMenu[day]?.breakfast}</Td>
//                   <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{mealData.weeklyMenu[day]?.lunch}</Td>
//                   <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }}>{mealData.weeklyMenu[day]?.dinner}</Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>
//         <Box mt={6} fontSize={{ base: 'sm', md: 'md' }} color={textColor}>
//           <Box fontWeight="bold" mb={2}>Meal Timing:</Box>
//           <Box>Breakfast: {mealData.timing?.breakfast}</Box>
//           <Box>Lunch: {mealData.timing?.lunch}</Box>
//           <Box>Dinner: {mealData.timing?.dinner}</Box>
//         </Box>
//         <Box mt={4} fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color={textColor}>
//           Amount of One Meal: ₹{mealData.amountOfOneMeal}
//         </Box>
//         <Box mt={5} fontSize={{ base: 'sm', md: 'md' }} display="flex" gap="1rem" flexWrap="wrap" color={textColor}>
//           <Box fontWeight="bold" mb={2}>
//             Additional Details:
//           </Box>
//           <Box>{mealData.remarks}</Box>
//         </Box>
//       </Box>
//       <Button mt={4}
//         color={'white'}
//         background={'#005252'}
//         _hover={{ backgroundColor: 'teal' }}
//         onClick={UtilFunctions.generatePDF}
//       >
//         Download as PDF
//       </Button>
//     </Box>
//   );
// };

// export default Menu;