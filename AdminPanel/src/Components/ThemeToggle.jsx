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
    <IconButton
      aria-label="Toggle theme"
      icon={icon}
      onClick={toggleColorMode}
      isRound
      size={'lg'}
    />
  )
}

export default ThemeToggle;
