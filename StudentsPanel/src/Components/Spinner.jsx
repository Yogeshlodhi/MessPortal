import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

function Spinner({message}) {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="rgba(0, 0, 0, 0.2)"
            zIndex={1000}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <InfinitySpin
                    visible={true}
                    color='teal'
                    ariaLabel="infinity-spin-loading"
                />
                <Heading textAlign="center" color="teal" marginTop={4}>
                    {message}
                </Heading>
            </Box>
        </Box>
    )
}

export default Spinner
