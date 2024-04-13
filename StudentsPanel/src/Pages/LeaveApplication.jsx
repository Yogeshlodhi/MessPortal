import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

const LeaveApplication = () => {
  return (
    <Box padding={'2rem'} className='flex gap-8 flex-col'>
      <Box className='flex gap-4' alignItems={'center'}>
        {/* <TextSnippetIcon style={{ fontSize: '2rem' }} /> */}
        <Heading fontSize={'2rem'}>Apply For Leave</Heading>
        {/* <DatePicker label="Basic date picker"/> */}
      </Box>
    </Box>
  )
}

export default LeaveApplication
