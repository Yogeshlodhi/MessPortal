import React from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, List, ListIcon, ListItem, Textarea } from '@chakra-ui/react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const LeaveApplication = () => {
  return (
    <Box padding={'2rem'} className='flex gap-8 flex-col'>
      <Heading fontSize={'2rem'}>Apply For Leave</Heading>
      <List spacing={1}>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          The Leave must be of a minimum of 3 days
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          Your leave start date should be minimum a day before applying
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <ListIcon as={RadioButtonCheckedIcon} color='green.500' />
          Kindly upload the screenshot of the leave after the application
        </ListItem>

      </List>
      <Container padding={'2rem'} maxW='70rem' bg='#2C3E50' centerContent borderRadius={'1rem'} minHeight={'30rem'} maxH={'35rem'} height={'auto'}>
        <Box padding='4' w={'90%'} maxW='100%' className='grid grid-flow-col gap-5'>
          <FormControl>
            <FormLabel color={'white'}>From</FormLabel>
            <Input type='date' color={'white'} />
          </FormControl>
          <FormControl>
            <FormLabel color={'white'}>To</FormLabel>
            <Input type='date' color={'white'} />
          </FormControl>
        </Box>
        <FormControl w={'90%'} maxW='100%' padding='4' color={'white'}>
          <Textarea placeholder='Provide the reason for your leave' minHeight={'15rem'} maxHeight={'15rem'}/>
        </FormControl>
        <Button display={'inline-block'} width={'50%'} marginTop={'1rem'} color={'#2C3E50'}>
          Apply
        </Button>
      </Container>
    </Box>
  )
}

export default LeaveApplication
