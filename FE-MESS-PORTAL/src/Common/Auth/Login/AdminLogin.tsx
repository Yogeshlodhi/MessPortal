import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { control } = useForm();
  return (
    <Container>
      <Typography>Welcome Back!</Typography>
      <Box className="d-f flex-dir-col gap-24">
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Institute Email ID"
              variant="outlined"
              required
            />
          )}
        />
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="outlined-adornment-password"
                required
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            )}
          />
        </FormControl>
        <LoadingButton color="primary" variant="contained">
          Continue
        </LoadingButton>
      </Box>
      <Box>
        <Typography>Guest User?</Typography>
        <Button onClick={() => {}}>Get Credentials</Button>
      </Box>
      <Box>
        <Button onClick={() => {}}>Go To Admin Panel</Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;