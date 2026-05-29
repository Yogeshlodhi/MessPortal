import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

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

import './register.scss';

const Register = () => {
  const { control, errors, isLoading, onSubmit } = useRegister();

  return (
    <Box className='registerWrapper'>
      <Card className='registerWrapper__card'>
        <CardContent>
          <Box className='registerWrapper__header'>
            <Typography variant='headingL' component='h1'>
              {REGISTER_TITLE}
            </Typography>
            <Typography variant='textM' className='registerWrapper__subtitle'>
              {REGISTER_SUBTITLE}
            </Typography>
          </Box>

          <Box component='form' onSubmit={onSubmit} className='registerWrapper__form' noValidate>
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
              className='registerWrapper__submit'
            >
              {isLoading ? <CircularProgress size={22} color='inherit' /> : REGISTER_SUBMIT_LABEL}
            </Button>
          </Box>

          <Box className='registerWrapper__footer'>
            <Typography variant='textM'>
              {REGISTER_LOGIN_LABEL}{' '}
              <Link to={ROUTE.STUDENT_LOGIN} className='registerWrapper__link'>
                {REGISTER_LOGIN_LINK_LABEL}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
