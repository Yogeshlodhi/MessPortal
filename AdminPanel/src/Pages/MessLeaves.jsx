import React, { useEffect } from 'react'
import LeaveAccordion from '../Components/LeaveAccordion'
import {Box} from '@chakra-ui/react'

import {useDispatch, useSelector} from 'react-redux';
import { getLeavesList } from '../Features/Leaves/leaveSlice';
import Spinner from '../Components/Spinner'

const MessLeaves = () => {
  const dispatch = useDispatch();
  const {LeavesList, isLoading, isSuccess, isError, message}  = useSelector((state) => state.leaves);

  useEffect(() => {
    dispatch(getLeavesList());
  },[dispatch]);

  // console.log(LeavesList)
  if(isLoading){
    return <Spinner message={'Getting Leaves.....'}/>
  }

  return (
    <Box>
      <LeaveAccordion />
    </Box>
  )
}

export default MessLeaves
