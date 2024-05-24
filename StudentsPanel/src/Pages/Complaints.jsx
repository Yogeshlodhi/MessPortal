import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Complaints = () => {
  const bgColor = useColorModeValue('brand.100', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'white');
  return (
    <Box
      bg={bgColor}
      color={textColor}
    >
      Complaints
    </Box>
  )
}

export default Complaints
