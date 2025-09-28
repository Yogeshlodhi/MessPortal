import { Box, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

import cafeteria from "../../assets/images/common/cafeteria.jpg";
import UserTypeSelectionCard from "./UserTypeSelectionCard";

const LandingPage = () => {
  return (
    <Box className="d-f h-screen landing-page">
      <Box className="d-f jc-c gap-16 p-24 flex-dir-col w-50 bg-white landing-page-content">
        <Box className="d-f ai-c flex-dir-col jc-c">
          <Typography variant="h4" fontWeight="bold">
            Welcome
          </Typography>
          <Typography variant="subtitle1">
            Please select who you are!
          </Typography>
        </Box>

        <UserTypeSelectionCard
          userDescription="Manage Students & Mess"
          userIcon={<AdminPanelSettingsIcon />}
          userType='admin'
          userHeading='Admin'
        />

        <UserTypeSelectionCard
          userDescription="Check meals, payments, etc."
          userIcon={<PersonIcon />}
          userType='student'
          userHeading='Student'
        />
      </Box>

      <Box className="w-50 h-100 landing-page-banner">
        <img
          src={cafeteria}
          alt="Mess Banner"
          className="w-100 h-100 object-contain"
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
