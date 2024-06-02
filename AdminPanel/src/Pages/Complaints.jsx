import { Box, Flex, Text, Button, IconButton, Heading, Grid, Icon, ButtonGroup } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

const ComplaintsList = () => {
  const complaints = [
    {
      complaintAbout: "Hygiene",
      description: "The food quality has been declining continuously."
    },
    {
      complaintAbout: "Facilities",
      description: "The bathroom faucets in block C are leaking."
    },
    {
      complaintAbout: "Noise",
      description: "There is loud music playing late at night."
    },
    {
      complaintAbout: "Facilities",
      description: "The bathroom faucets in block C are leaking."
    },
    {
      complaintAbout: "Hygiene",
      description: "The food quality has been declining continuously."
    },
    {
      complaintAbout: "Noise",
      description: "There is loud music playing late at night."
    },
    {
      complaintAbout: "Facilities",
      description: "The bathroom faucets in block C are leaking."
    },
    {
      complaintAbout: "Noise",
      description: "There is loud music playing late at night."
    },
    {
      complaintAbout: "Facilities",
      description: "The bathroom faucets in block C are leaking."
    },
    {
      complaintAbout: "Noise",
      description: "There is loud music playing late at night."
    },
    {
      complaintAbout: "Facilities",
      description: "The bathroom faucets in block C are leaking."
    },
    {
      complaintAbout: "Noise",
      description: "There is loud music playing late at night."
    },
    {
      complaintAbout: "Cleaning",
      description: "The common areas haven't been cleaned in days."
    }
  ];

  const handleResolve = () => {
    // Logic to handle resolving the complaint
  };

  return (
    <Box>
      <Heading mb={4} size="lg">
        Complaints
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {complaints.map((complaint, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            bg="white"
            _hover={{ boxShadow: "lg" }}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="bold" fontSize="lg">{complaint.complaintAbout}</Text>
              <IconButton
                icon={<Icon as={MdClose} />}
                variant="ghost"
                colorScheme="red"
                aria-label="Close"
                onClick={handleResolve}
              />
            </Flex>
            <Text>{complaint.description}</Text>
            <ButtonGroup>
              <Button mt={4} colorScheme="yellow" onClick={handleResolve}>In Progress</Button>
              <Button mt={4} colorScheme="orange" onClick={handleResolve}>Pending</Button>
            </ButtonGroup>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ComplaintsList;
