import React, { useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useDispatch, useSelector} from 'react-redux'
import { getMenu } from '../Features/Mess/messSlice';
import Spinner from '../Components/Spinner';

const Menu = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
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
  
  const dispatch = useDispatch();

  const {menu} = useSelector(state => state.mess);
  
  
  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch])

  const menuData = menu && menu.data && menu.data[0];
  
  if (!menuData) {
    return <Spinner message={'Fetching Mess Menu'}/>
  }
  
  const mealData = {
    weeklyMenu : {
      monday : menuData.monday,
      tuesday : menuData.tuesday,
      wednesday : menuData.wednesday,
      thursday : menuData.thursday,
      friday : menuData.friday,
      saturday : menuData.saturday,
      sunday : menuData.sunday,
    }
  };

  
  return (
    <Box>
      <Box 
        maxW="70rem" 
        mx="auto" 
        p="5" 
        // bg="white" 
        bg={bgColor}
        color={textColor}
        borderRadius="md" 
        boxShadow="md" 
        id='table-content'
      >
        <Heading 
          textAlign={'center'} 
          paddingTop={'0.5rem'} 
          paddingBottom={'1.5rem'} 
          // bg={bgColor}
          // color={textColor}
          background={'teal'} 
          color={'white'}
        >
          Weekly Mess Schedule
        </Heading>
        <Table variant="striped" size="md">
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
          <Box>Breakfast: { menuData && menuData.timing.breakfast}</Box>
          <Box>Lunch: {menuData && menuData.timing.lunch}</Box>
          <Box>Dinner: {menuData && menuData.timing.dinner}</Box>
        </Box>
        <Box mt="4" fontSize="lg" fontWeight="bold">
          Amount of One Meal : ₹{menuData && menuData.amountOfOneMeal}
        </Box>
        <Box mt="5" fontSize="lg" display={'flex'} gap={'1rem'}>
          <Box fontWeight="bold" mb="2">
            Additional Details : 
          </Box>
          {menuData && menuData.remarks}
        </Box>
      </Box>
      <Button mt="4" colorScheme="teal" onClick={generatePDF}>Download as PDF</Button>
    </Box>
  )
}

export default Menu
