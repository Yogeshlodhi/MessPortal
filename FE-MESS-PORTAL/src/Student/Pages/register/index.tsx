import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import AuthShell from 'Common/Components/AuthShell';
import RHFormElement from 'Common/Components/RHFormElement';
import { ROUTE } from 'Common/constants/routes.constants';

import { useRegister } from './hooks/useRegister';

import {
  REGISTER_EMAIL_LABEL,
  REGISTER_EMAIL_PLACEHOLDER,
  REGISTER_LOGIN_LABEL,
  REGISTER_LOGIN_LINK_LABEL,
  REGISTER_NAME_LABEL,
  REGISTER_PASSWORD_LABEL,
  REGISTER_PHONE_LABEL,
  REGISTER_ROLL_LABEL,
  REGISTER_ROLL_PLACEHOLDER,
  REGISTER_SUBMIT_LABEL,
  REGISTER_SUBTITLE,
  REGISTER_TITLE,
} from './constants/register.general';

const Register = () => {
  const { control, errors, isLoading, onSubmit } = useRegister();

  return (
    <AuthShell variant='student' eyebrow='Create Account'>
      <Box className='authForm__header'>
        <Typography variant='headingL' component='h1'>
          {REGISTER_TITLE}
        </Typography>
        <Typography variant='textM' className='authForm__subtitle'>
          {REGISTER_SUBTITLE}
        </Typography>
      </Box>

      <Box component='form' onSubmit={onSubmit} className='authForm__form' noValidate>
        <RHFormElement
          control={control}
          name='studentName'
          mode='text'
          label={REGISTER_NAME_LABEL}
          error={errors.studentName}
          autoComplete='name'
        />
        <RHFormElement
          control={control}
          name='emailId'
          mode='text'
          label={REGISTER_EMAIL_LABEL}
          placeholder={REGISTER_EMAIL_PLACEHOLDER}
          error={errors.emailId}
          autoComplete='email'
        />
        <RHFormElement
          control={control}
          name='studentRoll'
          mode='text'
          label={REGISTER_ROLL_LABEL}
          placeholder={REGISTER_ROLL_PLACEHOLDER}
          error={errors.studentRoll}
        />
        <RHFormElement
          control={control}
          name='number'
          mode='text'
          label={REGISTER_PHONE_LABEL}
          error={errors.number}
          autoComplete='tel'
        />
        <RHFormElement
          control={control}
          name='password'
          mode='password'
          label={REGISTER_PASSWORD_LABEL}
          error={errors.password}
          autoComplete='new-password'
        />

        <Button
          type='submit'
          variant='contained'
          size='large'
          disabled={isLoading}
          className='authForm__submit'
        >
          {isLoading ? <CircularProgress size={22} color='inherit' /> : REGISTER_SUBMIT_LABEL}
        </Button>
      </Box>

      <Box className='authForm__footer'>
        <Typography variant='textM'>
          {REGISTER_LOGIN_LABEL}{' '}
          <Link to={ROUTE.STUDENT_LOGIN} className='authForm__link'>
            {REGISTER_LOGIN_LINK_LABEL}
          </Link>
        </Typography>
      </Box>
    </AuthShell>
  );
};

export default Register;
