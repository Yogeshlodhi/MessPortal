import { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
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

type LoginFormValues = {
  institute_email_id: string;
  password: string;
};

const StudentLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      institute_email_id: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <Container>
      <Typography>Welcome Back!</Typography>
      <Box
        className="d-f flex-dir-col gap-24"
        onSubmit={handleSubmit(onSubmit)}
        component="form"
      >
        <Controller
          name="institute_email_id"
          control={control}
          rules={{ required: "Institute email is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Institute Email ID"
              error={!!errors.institute_email_id}
              helperText={errors.institute_email_id?.message}
              variant="outlined"
              required
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <FormControl variant="outlined" error={!!errors.password}>
              <InputLabel htmlFor="outlined-adornment-password" required>
                Password
              </InputLabel>
              <OutlinedInput
                {...field}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <LoadingButton
          color="primary"
          variant="contained"
          type="submit"
          loading={isSubmitting}
        >
          Continue
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default StudentLogin;
