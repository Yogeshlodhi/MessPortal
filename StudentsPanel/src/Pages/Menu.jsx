import React, { useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../Features/Mess/messSlice';
import Spinner from '../Components/Spinner';

const Menu = () => {
  const bgColor = useColorModeValue('lightMode.Bg', 'darkMode.Bg');
  const textColor = useColorModeValue('black', 'white');
  const headerBgColor = useColorModeValue('gray.200', 'gray.700');
  const tableRowBgColor = useColorModeValue('gray.50', 'darkMode.primaryBg');
  // const tableRowBgColor = useColorModeValue('gray.50', 'gray.800');

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

  const { menu } = useSelector((state) => state.mess);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  const menuData = menu && menu.data && menu.data[0];

  if (!menuData) {
    return <Spinner message={'Fetching Mess Menu'} />;
  }

  const mealData = {
    weeklyMenu: {
      monday: menuData.monday,
      tuesday: menuData.tuesday,
      wednesday: menuData.wednesday,
      thursday: menuData.thursday,
      friday: menuData.friday,
      saturday: menuData.saturday,
      sunday: menuData.sunday,
    },
  };

  return (
    <Box 
      p={4} 
      bg={bgColor}
      >
      <Box
        maxW="100%"
        mx="auto"
        p={4}
        borderRadius="md"
        id="table-content"
        boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
        overflowX="auto"
      >
        <Heading
          textAlign="center"
          py={4}
          bg="#FC476C"
          color="white"
          borderRadius="md"
        >
          Weekly Mess Schedule
        </Heading>
        <Box overflowX="auto">
          <Table variant="striped" size="md" mt={4} whiteSpace="nowrap">
            <Thead
            // bg={headerBgColor}
            >
              <Tr>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Day</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Breakfast</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Lunch</Th>
                <Th fontSize={{ base: 'md', md: 'lg' }} textAlign="center">Dinner</Th>
              </Tr>
            </Thead>
            <Tbody bg={tableRowBgColor}>
              {Object.keys(mealData.weeklyMenu).map((day) => (
                <Tr key={day}>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }} color={textColor}>{day.charAt(0).toUpperCase() + day.slice(1)}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }} color={textColor}>{mealData.weeklyMenu[day].breakfast}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }} color={textColor}>{mealData.weeklyMenu[day].lunch}</Td>
                  <Td textAlign="center" fontSize={{ base: 'sm', md: 'md' }} color={textColor}>{mealData.weeklyMenu[day].dinner}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box mt={6} fontSize={{ base: 'sm', md: 'md' }} color={textColor}>
          <Box fontWeight="bold" mb={2}>Meal Timing:</Box>
          <Box>Breakfast: {menuData && menuData.timing.breakfast}</Box>
          <Box>Lunch: {menuData && menuData.timing.lunch}</Box>
          <Box>Dinner: {menuData && menuData.timing.dinner}</Box>
        </Box>
        <Box mt={4} fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color={textColor}>
          Amount of One Meal : ₹{menuData && menuData.amountOfOneMeal}
        </Box>
        <Box mt={5} fontSize={{ base: 'sm', md: 'md' }} display="flex" gap="1rem" flexWrap="wrap" color={textColor}>
          <Box fontWeight="bold" mb={2}>
            Additional Details :
          </Box>
          <Box>{menuData && menuData.remarks}</Box>
        </Box>
      </Box>
      <Button mt={4}
        color={'white'}
        bg={'#FC476C'}
        onClick={generatePDF}
      >
        Download as PDF
      </Button>
    </Box>
  );
};

export default Menu;
