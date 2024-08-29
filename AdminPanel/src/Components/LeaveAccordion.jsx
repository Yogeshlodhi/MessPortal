import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ButtonGroup, Heading, Text } from '@chakra-ui/react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import UtilFunctions from '../Utils/UtilFunctions'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { takeAction } from '../Features/Leaves/leaveSlice';
import { useState } from 'react';


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

const LeaveAccordion = () => {
    const dispatch = useDispatch();
    const { LeavesList } = useSelector((state) => state.leaves);
    const leaveAction = (data) => {
        dispatch(takeAction(data));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box>
                {LeavesList.data && LeavesList.data.length > 0 ? (
                    LeavesList.data.filter((leave) => {
                        return leave.studentName !== "Student Does Not Exist Anymore";
                    }).map((leave) => (
                        <Accordion key={leave._id} style={{ marginBottom: '1rem', color: 'white', borderRadius: '0.5rem' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: 'white ' }} />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                {`${leave.studentName} (No. Of Days: ${UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))})`}
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
                                    >
                                        <DoneIcon />
                                        Approve
                                    </Button>
                                </ButtonGroup>
                            </AccordionActions>
                        </Accordion>
                    ))
                    // {
                    // }
                ) : (
                    <Heading>No Leaves Found...</Heading>
                )
                }
            </Box>
        </ThemeProvider>
    );
};

export default LeaveAccordion;


