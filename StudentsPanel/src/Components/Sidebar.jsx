import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Sidebar() {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');

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
      name: 'Feedback & Suggestion',
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
      name: 'Payments',
      path: '/payments',
      icon: <PaymentIcon style={{ marginRight: '10px' }} />,
    },
  ]

  return (
    <Box
      bg={bgColor}
      color={textColor}
      // backgroundColor='#2C3E50'
      // color='#FFFFFF'
      height='100vh'
      paddingRight={'1rem'}
    >
      <Box>
        <Heading
          minHeight={'3.5rem'}
          padding={'1rem'}
          textAlign={'center'}
        >
          Mess Portal
        </Heading>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          paddingLeft='20px'
          paddingTop='20px'
        >
          {
            SidebarOptions.map((item) => {
              return (
                <Box
                  display='flex'
                  alignItems='center'
                  marginBottom='15px'
                  padding='0.5rem'
                  key={item.id}
                >
                  {item.icon}
                  <Link
                    to={item.path}
                    style={{ textDecoration: 'none', fontSize: '1.5rem' }}
                  >
                    {item.name}
                  </Link>
                </Box>
              )
            }
            )
          }
        </Box>
      </Box>
      <Box>
        <ThemeToggle />
      </Box>
    </Box>
  );
}

export default Sidebar