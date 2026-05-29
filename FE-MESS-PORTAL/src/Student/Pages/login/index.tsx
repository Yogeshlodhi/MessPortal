import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import AuthShell from 'Common/Components/AuthShell';
import RHFormElement from 'Common/Components/RHFormElement';
import { ROUTE } from 'Common/constants/routes.constants';

import { useLogin } from './hooks/useLogin';

import {
  LOGIN_ADMIN_LINK_LABEL,
  LOGIN_EMAIL_LABEL,
  LOGIN_EMAIL_PLACEHOLDER,
  LOGIN_GUEST_BUTTON_LABEL,
  LOGIN_GUEST_LABEL,
  LOGIN_PASSWORD_LABEL,
  LOGIN_REGISTER_LABEL,
  LOGIN_REGISTER_LINK_LABEL,
  LOGIN_SUBMIT_LABEL,
  LOGIN_SUBTITLE,
  LOGIN_TITLE,
} from './constants/login.general';

const Login = () => {
  const { control, errors, isLoading, onSubmit, fillGuestCredentials } = useLogin();

  return (
    <AuthShell variant='student' eyebrow='Student Portal'>
      <Box className='authForm__header'>
        <Typography variant='headingL' component='h1'>
          {LOGIN_TITLE}
        </Typography>
        <Typography variant='textM' className='authForm__subtitle'>
          {LOGIN_SUBTITLE}
        </Typography>
      </Box>

      <Box component='form' onSubmit={onSubmit} className='authForm__form' noValidate>
        <RHFormElement
          control={control}
          name='emailId'
          mode='text'
          label={LOGIN_EMAIL_LABEL}
          placeholder={LOGIN_EMAIL_PLACEHOLDER}
          error={errors.emailId}
          autoComplete='email'
        />
        <RHFormElement
          control={control}
          name='password'
          mode='password'
          label={LOGIN_PASSWORD_LABEL}
          error={errors.password}
          autoComplete='current-password'
        />

        <Button
          type='submit'
          variant='contained'
          size='large'
          disabled={isLoading}
          className='authForm__submit'
        >
          {isLoading ? <CircularProgress size={22} color='inherit' /> : LOGIN_SUBMIT_LABEL}
        </Button>
      </Box>

      <Box className='authForm__guest'>
        <Typography variant='subtextM'>{LOGIN_GUEST_LABEL}</Typography>
        <Button variant='outlined' size='small' onClick={fillGuestCredentials}>
          {LOGIN_GUEST_BUTTON_LABEL}
        </Button>
      </Box>

      <Box className='authForm__footer'>
        <Typography variant='textM'>
          {LOGIN_REGISTER_LABEL}{' '}
          <Link to={ROUTE.STUDENT_REGISTER} className='authForm__link'>
            {LOGIN_REGISTER_LINK_LABEL}
          </Link>
        </Typography>
        <Link to={ROUTE.ADMIN_LOGIN} className='authForm__link'>
          {LOGIN_ADMIN_LINK_LABEL}
        </Link>
      </Box>
    </AuthShell>
  );
};

export default Login;
