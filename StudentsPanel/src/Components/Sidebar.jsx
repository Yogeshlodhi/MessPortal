import { Box, Heading, Flex, Text, useColorModeValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure, useMediaQuery, Tooltip, WrapItem, Divider } from '@chakra-ui/react';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const SidebarOptions = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    icon: <DashboardIcon style={{ marginRight: '10px' }} />,
  },
  {
    id: 2,
    name: 'Apply-Leave',
    path: '/apply-leave',
    icon: <EventNoteIcon style={{ marginRight: '10px' }} />,
  },
  {
    id: 3,
    // name: 'Feedback & Suggestion',
    name: 'Daily Feedback',
    path: '/feedback',
    icon: <RateReviewIcon style={{ marginRight: '10px' }} />,
  },
  {
    id: 4,
    name: 'Menu',
    path: '/menu',
    icon: <MenuBookIcon style={{ marginRight: '10px' }} />,
  },
  {
    id: 5,
    name: 'Announcements',
    path: '/announcements',
    icon: <CampaignIcon style={{ marginRight: '10px' }} />,
  },
  {
    id: 6,
    name: 'Complaints',
    path: '/complaints',
    icon: <ThumbDownOffAltIcon style={{ marginRight: '10px' }} />,
  },
  {
    id: 7,
    name: 'Mess Information',
    path: '/messinfo',
    icon: <InfoIcon style={{ marginRight: '10px' }} />,
  },
  // {
  //   id: 8,
  //   name: 'Payments',
  //   path: '/payments',
  //   icon: <PaymentIcon style={{ marginRight: '10px' }} />,
  // },
];

function Sidebar({ onClose }) {
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const boxShadow = useColorModeValue('0px 0px 10px rgba(0,0,0,0.45)', '0px 0px 5px #636368');
  // const bgColor = useColorModeValue('lightMode.bg', 'darkMode.');
  return (
    <Box
      height={isMobile ? '100%' : '100vh'}
      boxShadow={isMobile ? 'none' : boxShadow}
    >
      <Heading
        minHeight="3.5rem"
        padding="0.8rem"
        textAlign="center"
        textTransform="uppercase"
      >
        Mess Portal
      </Heading>
      <Divider/>
      {SidebarOptions.map((item) => (
        <Flex
          key={item.id}
          display="flex"
          alignItems="center"
          marginBottom="10px"
          paddingLeft="1rem"
          paddingRight="1rem"
          width="100%"
        >
          <NavLink
            to={item.path}
            style={{
              textDecoration: 'none',
              fontSize: '1.5rem',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.5rem',
            }}
            activeclassname="active"
            className="link"
            onClick={onClose}
          >
            {item.icon}
            {item.name}
          </NavLink>
        </Flex>
      ))}
      <WrapItem cursor={'pointer'} visibility={isMobile ? 'visible' : 'hidden'} alignItems={'center'} gap={'1rem'} justifyContent={'center'}>
        <Text fontSize={'1.5rem'}>Change Theme</Text>
        <ThemeToggle />
      </WrapItem>
    </Box>
  );
}

export default Sidebar;
