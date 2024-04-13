import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Box
      backgroundColor='#2C3E50'
      color='#FFFFFF'
      height='100vh'
      paddingRight={'1rem'}
    >
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
        <Box
          display='flex'
          alignItems='center'
          marginBottom='15px'
          padding='0.5rem'
        >
          <DashboardIcon style={{ marginRight: '10px' }} />
          <Link
            to="/"
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.5rem' }}
          >
            Dashboard
          </Link>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          marginBottom='15px'
          padding={'0.5rem'}
        >
          <EventNoteIcon style={{ marginRight: '10px' }} />
          <Link
            to="/apply-leave"
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.5rem' }}
          >
            Apply Leave
          </Link>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          marginBottom='15px'
          justifyContent='center'
          padding={'0.5rem'}
        >
          <RateReviewIcon style={{ marginRight: '10px' }} />
          <Link
            to="/feedback"
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.5rem' }}
          >
            Feedback & Suggestion
          </Link>
        </Box>
        <Box

          display='flex'
          alignItems='center'
          marginBottom='15px'
          justifyContent='center'
          padding={'0.5rem'}
        >
          <MenuBookIcon style={{ marginRight: '10px' }} />
          <Link
            to="/menu"
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.5rem' }}
          >
            Menu
          </Link>
        </Box>
        <Box

          display='flex'
          alignItems='center'
          marginBottom='15px'
          justifyContent='center'
          padding={'0.5rem'}
        >
          <CampaignIcon style={{ marginRight: '10px' }} />
          <Link
            to="/announcements"
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '1.5rem' }}
          >
            Announcements
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
