import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserTypeSelectionCardProps {
  userType: string;
  userDescription: string;
  userIcon: React.ReactElement;
  userHeading: string;
}

const UserTypeSelectionCard = ({
  userType,
  userDescription,
  userIcon: UserIcon,
  userHeading,
}: UserTypeSelectionCardProps) => {
  const navigate = useNavigate();
  return (
    <Box
      className="c-pointer br-8 shadow-sm p-12 d-f ai-c gap-12 hover:bg-gray-100"
      onClick={() => navigate(`/${userType}/login`)}
    >
      <Box className="d-f ai-c jc-c p-12 bg-green-800 br-8 text-white">
        {UserIcon}
      </Box>
      <Box className="d-f flex-dir-col">
        <Typography variant="h6">{userHeading}</Typography>
        <Typography variant="body2">{userDescription}</Typography>
      </Box>
    </Box>
  );
};

export default UserTypeSelectionCard;
