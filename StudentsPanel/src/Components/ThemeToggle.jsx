import { useColorMode, Button, useColorModeValue, IconButton } from "@chakra-ui/react";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useColorModeValue(
    <DarkModeIcon />,
    <LightModeIcon />
  );

  return (
    // <Button onClick={toggleColorMode}>
    //   Toggle {colorMode === "light" ? "Dark" : "Light"}
    // </Button>
    <IconButton
      aria-label="Toggle theme"
      icon={icon}
      onClick={toggleColorMode}
    />
  )
}

export default ThemeToggle;
