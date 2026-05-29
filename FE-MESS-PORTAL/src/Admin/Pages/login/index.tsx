import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import RHFormElement from 'Common/Components/RHFormElement';
import { ROUTE } from 'Common/constants/routes.constants';

import { useAdminLogin } from './hooks/useAdminLogin';

import {
  ADMIN_LOGIN_EMAIL_LABEL,
  ADMIN_LOGIN_PASSWORD_LABEL,
  ADMIN_LOGIN_STUDENT_LINK_LABEL,
  ADMIN_LOGIN_SUBMIT_LABEL,
  ADMIN_LOGIN_SUBTITLE,
  ADMIN_LOGIN_TITLE,
} from './constants/login.general';

import './login.scss';

const AdminLogin = () => {
  const { control, errors, isLoading, onSubmit } = useAdminLogin();

  return (
    <Box className='adminLoginWrapper'>
      <Card className='adminLoginWrapper__card'>
        <CardContent>
          <Box className='adminLoginWrapper__header'>
            <Typography variant='headingL' component='h1'>
              {ADMIN_LOGIN_TITLE}
            </Typography>
            <Typography variant='textM' className='adminLoginWrapper__subtitle'>
              {ADMIN_LOGIN_SUBTITLE}
            </Typography>
          </Box>

          <Box component='form' onSubmit={onSubmit} className='adminLoginWrapper__form' noValidate>
            <RHFormElement
              control={control}
              name='emailId'
              mode='text'
              label={ADMIN_LOGIN_EMAIL_LABEL}
              error={errors.emailId}
              autoComplete='email'
            />
            <RHFormElement
              control={control}
              name='password'
              mode='password'
              label={ADMIN_LOGIN_PASSWORD_LABEL}
              error={errors.password}
              autoComplete='current-password'
            />

            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading}
              className='adminLoginWrapper__submit'
            >
              {isLoading ? <CircularProgress size={22} color='inherit' /> : ADMIN_LOGIN_SUBMIT_LABEL}
            </Button>
          </Box>

          <Box className='adminLoginWrapper__footer'>
            <Link to={ROUTE.STUDENT_LOGIN} className='adminLoginWrapper__link'>
              {ADMIN_LOGIN_STUDENT_LINK_LABEL}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLogin;
