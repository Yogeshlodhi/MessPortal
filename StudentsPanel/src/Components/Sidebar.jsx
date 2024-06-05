import { Box, Heading,Flex, Text, useColorModeValue } from '@chakra-ui/react'
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
function Sidebar() {
  // const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');
  // const textColor = useColorModeValue('lightMode.text', 'darkMode.text');
  // const headingColor = useColorModeValue('lightMode.heading', 'darkMode.heading');

  return (
    <Box
      // backgroundColor='#2C3E50'
      height={'100vh'}
      boxShadow="0px 0px 10px rgba(0,0,0,0.45)"
      // boxShadow="9px 3px 15px -6px rgba(0,0,0,0.45)"
      // width={'20vw'}
      position="relative"
    >
      <Box>
        <Heading
          // minHeight={'3.5rem'}
          // padding={'1rem'}
          // textAlign={'center'}
          // color={headingColor}
          minHeight={'3.5rem'}
          padding={'1rem'}
          textAlign={'center'}
          textTransform={'uppercase'}
        >
          Mess Portal
        </Heading>
        {
          SidebarOptions.map((item) => {
            return (
              <Flex
                display='flex'
                alignItems='center'
                marginBottom='15px'
                paddingLeft={'1rem'}
                paddingRight={'1rem'}
                key={item.id}
                width={'100%'}
              >
                <NavLink
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.5rem'
                  }}
                  activeclassname="active"
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </Flex>
            )
          }
          )
        }
      </Box>
    </Box>
  );
}

export default Sidebar

