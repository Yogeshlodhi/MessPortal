import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <Box background={'red'} flex={1} height={'100vh'}>
            <div>
                <Link to="/option1">Option 1</Link>
            </div>
            <div>
                <Link to="/option2">Option 2</Link>
            </div>
        </Box>
    )
}

export default Sidebar
