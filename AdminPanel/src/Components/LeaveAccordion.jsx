import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button, ButtonGroup} from '@chakra-ui/react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(0,128,128)',
            // main: '#1976d2',
        },
        secondary: {
            main: 'rgb(0,128,128)',
            // main: '#dc004e',
        },
    },
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    // backgroundColor: 'rgb(0,128,128)',
                    backgroundColor: '#f5f5f5',
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(0,128,128)',
                    // backgroundColor: '#e0e0e0',
                },
            },
        },
    },
});

const LeaveAccordion = () => {
    const { LeavesList } = useSelector((state) => state.leaves);
    return (
        <ThemeProvider theme={theme}>
            <Box>
                {LeavesList
                    .filter((leave) => {
                        return leave.studentName === "Student Does Not Exist Anymore" ? null : leave
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
                                <Text>Start Date : {UtilFunctions.formatDate(new Date(leave.startDate))}</Text>
                                <Text>End Date : {UtilFunctions.formatDate(new Date(leave.endDate))}</Text>
                                <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                                    Approval Status :
                                    <Text color={leave.status === 'Pending' ? 'orange' : (leave.status === 'Approved' ? 'green' : 'red')}>
                                        {leave.status}
                                    </Text>
                                </Box>
                            </AccordionDetails>
                            <AccordionActions>
                                <ButtonGroup>
                                    <Button
                                        background={'red'}
                                        padding={'0.5rem'}
                                        borderRadius={'0.5rem'}
                                        size={'md'}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        padding={'0.5rem'}
                                        borderRadius={'0.5rem'}
                                        size={'md'}
                                        backgroundColor={'green'}
                                    >
                                        Approve
                                    </Button>
                                </ButtonGroup>
                            </AccordionActions>
                        </Accordion>
                    ))}
            </Box>
        </ThemeProvider>
    );
}

export default LeaveAccordion;