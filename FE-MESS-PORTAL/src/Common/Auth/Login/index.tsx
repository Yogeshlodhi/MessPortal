import { Box, Button, Link, Typography } from "@mui/material";
import StudentLogin from "./StudentLogin";
import AdminLogin from "./AdminLogin";
import CustomDialog from "../../Modal";
import { useState } from "react";

interface ILoginProps {
  userType: string;
}

const Login = ({ userType }: ILoginProps) => {
  console.log(userType);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleOpenInfoModal = () => {
    setOpenInfoModal(true);
  };
  return (
    <Box>
      <Box>
        <Typography>Mess</Typography>
        <Box>
          <Typography>Don&apos;t have an account?</Typography>
          <Link href="/register">Register Now</Link>
        </Box>
      </Box>
      <Box>
        {userType === "student" ? <StudentLogin /> : <AdminLogin />}
        <Box>
          <Typography>Guest User?</Typography>
          <Button onClick={() => {}}>Get Credentials</Button>
        </Box>

        <Box>
          <Button onClick={handleOpenInfoModal}>Go To Admin Panel</Button>
        </Box>

        {openInfoModal && <CustomDialog />}
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            marginLeft={"0.5rem"}
            marginRight={"0.5rem"}
            alignSelf={"center"}
            bg={bgColor}
            color={textColor}
          >
            <ModalHeader>Guest User Credentials</ModalHeader>
            <ModalCloseButton />
            <ModalBody padding={4}>
              <Box className="flex items-center gap-10">
                <Heading fontSize={"large"}>Email ID : </Heading>
                <Text>guest_2101cb61@iitp.ac.in</Text>
              </Box>
              <Box className="flex items-center gap-10">
                <Heading fontSize={"large"}>Password : </Heading>
                <Text>guest123</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal> */}
      </Box>
    </Box>
  );
};

export default Login;
