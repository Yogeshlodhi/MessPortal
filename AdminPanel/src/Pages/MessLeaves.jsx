import React, { useEffect } from 'react'
import LeaveAccordion from '../Components/LeaveAccordion'
import { Box, Heading } from '@chakra-ui/react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ButtonGroup, Text } from '@chakra-ui/react';
// import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import UtilFunctions from '../../../StudentsPanel/src/Utils/UtilFunctions';
// import { useDispatch, useSelector } from 'react-redux';
import { getLeavesList } from '../Features/Leaves/leaveSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { takeAction } from '../Features/Leaves/leaveSlice';
import Spinner from '../Components/Spinner'

const MessLeaves = () => {
  const dispatch = useDispatch();
  const { LeavesList, isLoading, isSuccess, isError, message } = useSelector((state) => state.leaves);

  // const dispatch = useDispatch();
  //   const { LeavesList } = useSelector((state) => state.leaves);

  const leaveAction = (data) => {
    // console.log(data)
    dispatch(takeAction(data));
  };


  useEffect(() => {
    dispatch(getLeavesList());
  }, [dispatch]);

  // console.log(LeavesList)
  if (isLoading) {
    return <Spinner message={'Getting Leaves.....'} />
  }

  return (
    <Box>
      <LeaveAccordion />
    </Box>
    // <Box>
    //   {LeavesList.data && LeavesList.data.length > 0 ? (
    //     LeavesList.data.filter((leave) => {
    //       return leave.studentName !== "Student Does Not Exist Anymore";
    //     }).map((leave) => (
    //       <Accordion key={leave._id} style={{ marginBottom: '1rem', color: 'white', borderRadius: '0.5rem' }}>
    //         <AccordionSummary
    //           expandIcon={<ExpandMoreIcon style={{ color: 'white ' }} />}
    //           aria-controls="panel3-content"
    //           id="panel3-header"
    //         >
    //           {`${leave.studentName} (No. Of Days: ${UtilFunctions.calculateDays(new Date(leave.startDate), new Date(leave.endDate))})`}
    //         </AccordionSummary>
    //         <AccordionDetails style={{ color: 'black' }}>
    //           {leave.reason}
    //           <Text>Start Date: {UtilFunctions.formatDate(new Date(leave.startDate))}</Text>
    //           <Text>End Date: {UtilFunctions.formatDate(new Date(leave.endDate))}</Text>
    //           <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
    //             Approval Status:
    //             <Text color={leave.status === 'Pending' ? 'orange' : (leave.status === 'Approved' ? 'green' : 'red')}>
    //               {leave.status}
    //             </Text>
    //           </Box>
    //           <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
    //             Approval Action By :
    //             {leave.actionTakenBy}
    //             {/* {console.log(leave.actionTakenBy ? leave.actionTakenBy : 'None')} */}
    //             {/* {console.log(leave)} */}
    //           </Box>
    //         </AccordionDetails>
    //         <AccordionActions>
    //           <ButtonGroup>
    //             <Button
    //               background={'red'}
    //               padding={'0.5rem'}
    //               borderRadius={'0.5rem'}
    //               size={'md'}
    //               onClick={() => {
    //                 leaveAction({ leaveId: leave._id, status: 'Rejected' });
    //               }}
    //             >
    //               <CloseIcon />
    //               Reject
    //             </Button>
    //             <Button
    //               padding={'0.5rem'}
    //               borderRadius={'0.5rem'}
    //               size={'md'}
    //               backgroundColor={'green'}
    //               onClick={() => {
    //                 leaveAction({ leaveId: leave._id, status: 'Approved' });
    //               }}
    //             >
    //               <DoneIcon />
    //               Approve
    //             </Button>
    //           </ButtonGroup>
    //         </AccordionActions>
    //       </Accordion>
    //     ))
    //     // {
    //     // }
    //   ) : (
    //     <Heading>No Leaves Found...</Heading>
    //   )
    //   }
    // </Box>
  )
}

export default MessLeaves
