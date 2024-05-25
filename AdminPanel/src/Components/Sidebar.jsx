import { Box, Heading, Flex, Divider } from '@chakra-ui/react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import WindowIcon from '@mui/icons-material/Window';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Sidebar() {

    const SidebarOptions = [
        {
            id: 1,
            name: 'Dashboard',
            path: '/',
            icon: <WindowIcon style={{ marginRight: '10px' }} />,
        },
        {
            id: 2,
            name: 'Leaves',
            path: '/leaves',
            icon: <EventNoteIcon style={{ marginRight: '10px' }} />,
        },
        {
            id: 3,
            name: 'Feedback & Suggestion',
            path: '/feedbacks',
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
            name: 'Students',
            path: '/students',
            icon: <PeopleAltIcon style={{ marginRight: '10px' }} />,
        },
    ]

    return (
        <Box
            height={'100vh'}
            boxShadow={'8px 2px 5px -7px rgba(0,0,0,0.45)'}
        >
            <Heading
                minHeight={'3.5rem'}
                padding={'1rem'}
                textAlign={'center'}
                textTransform={'uppercase'}
            >
                Admin Panel
            </Heading>
            <Divider/>
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
                                className='link'
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
    )
}

export default Sidebar

