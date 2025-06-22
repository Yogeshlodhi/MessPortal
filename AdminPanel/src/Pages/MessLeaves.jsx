import React, { useEffect } from 'react'
import LeaveAccordion from '../Components/LeaveAccordion'
import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import UtilFunctions from '../Utils/UtilFunctions';
import { getLeavesList } from '../Features/Leaves/leaveSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { takeAction } from '../Features/Leaves/leaveSlice';
import Spinner from '../Components/Spinner'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0,128,128)',
    },
    secondary: {
      main: 'rgb(0,128,128)',
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#005252',
        },
      },
    },
  },
});


const MessLeaves = () => {
  const dispatch = useDispatch();
  const { leaves, isLoadingLeaves } = useSelector((state) => state.leaves);

  const leaveAction = (data) => {
    dispatch(takeAction(data));
  };

  useEffect(() => {
    dispatch(getLeavesList());
  }, [dispatch]);

  if (isLoadingLeaves) {
    return <Spinner message={'Getting Leaves.....'} />
  }

  const bgColor = useColorModeValue('lightMode.bg', 'darkMode.bg');

  return (
    <Box
      border={'3px solid rgba(0, 0, 0, 0.05)'}
      bg={bgColor}
      boxShadow={'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
      gap={'1rem'}
      // borderRadius={'0.5rem'}
      padding={'1rem'}
    // height={'100%'}
    >
      <Heading
        fontSize={'2rem'}
        textAlign={'center'}
        textTransform={'uppercase'}
        mb={6}
      >
        Students Leaves</Heading>
      <ThemeProvider theme={theme}>
        <Box>
          {leaves && leaves?.length > 0 ? (
            leaves.filter((leave) => {
              return leave.studentName !== "Student Does Not Exist Anymore";
            }).map((leave) => (
              <Accordion key={leave._id} style={{ marginBottom: '1rem', color: 'white' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: 'white'}} />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  {`${leave.studentRoll} (No. Of Days: ${UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))})`}
                </AccordionSummary>
                <AccordionDetails style={{ color: 'black' }}>
                  {leave.reason}
                  <Text>Start Date: {UtilFunctions.formatDate(new Date(leave.startDate))}</Text>
                  <Text>End Date: {UtilFunctions.formatDate(new Date(leave.endDate))}</Text>
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    Approval Status :
                    <Text color={leave.status === 'Pending' ? 'orange' : (leave.status === 'Approved' ? 'green' : 'red')}>
                      {leave.status}
                    </Text>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    Approval Action By :
                    {leave.actionTakenBy}
                  </Box>
                </AccordionDetails>
                <AccordionActions>
                  <ButtonGroup>
                    <Button
                      background={'red'}
                      padding={'0.5rem'}
                      borderRadius={'0.5rem'}
                      size={'md'}
                      onClick={() => {
                        leaveAction({ leaveId: leave._id, status: 'Rejected' });
                      }}
                      _hover={{ background: '#d80000', color: 'white' }}
                      >
                      <CloseIcon />
                      Reject
                    </Button>
                    <Button
                      padding={'0.5rem'}
                      borderRadius={'0.5rem'}
                      size={'md'}
                      backgroundColor={'green'}
                      onClick={() => {
                        leaveAction({ leaveId: leave._id, status: 'Approved' });
                      }}
                      _hover={{ background: '#006060', color: 'white' }}
                    >
                      <DoneIcon />
                      Approve
                    </Button>
                  </ButtonGroup>
                </AccordionActions>
              </Accordion>
            ))
          ) : (
            <Heading>No Leaves Applied So Far...</Heading>
          )
          }
        </Box>
      </ThemeProvider>
    </Box>
  )
}

export default MessLeaves
