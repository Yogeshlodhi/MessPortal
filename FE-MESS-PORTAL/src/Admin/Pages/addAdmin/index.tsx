import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import HcEmptyState from 'Common/Components/HcEmptyState';
import RHFormElement from 'Common/Components/RHFormElement';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useAddAdmin } from './hooks/useAddAdmin';

import {
  ADD_ADMIN_EMAIL_LABEL,
  ADD_ADMIN_FIRSTNAME_LABEL,
  ADD_ADMIN_LASTNAME_LABEL,
  ADD_ADMIN_PASSWORD_LABEL,
  ADD_ADMIN_ROLE_LABEL,
  ADD_ADMIN_SUBMIT_LABEL,
  ADD_ADMIN_TITLE,
  ROLE_OPTIONS,
} from './constants/addAdmin.general';

import './addAdmin.scss';

const AddAdmin = () => {
  const { control, errors, isLoading, onSubmit } = useAddAdmin();
  const { has } = usePermission();

  if (!has(PERMISSION.ADD_ADMIN)) {
    return <HcEmptyState renderText='Restricted' renderSubText='Only the Warden can add new admins.' />;
  }

  return (
    <Box className='addAdminWrapper'>
      <Card>
        <CardContent>
          <Typography variant='headingL' component='h1'>
            {ADD_ADMIN_TITLE}
          </Typography>
          <Box component='form' onSubmit={onSubmit} className='addAdminWrapper__form' noValidate>
            <RHFormElement
              control={control}
              name='firstName'
              mode='text'
              label={ADD_ADMIN_FIRSTNAME_LABEL}
              error={errors.firstName}
            />
            <RHFormElement
              control={control}
              name='lastName'
              mode='text'
              label={ADD_ADMIN_LASTNAME_LABEL}
              error={errors.lastName}
            />
            <RHFormElement
              control={control}
              name='emailId'
              mode='text'
              label={ADD_ADMIN_EMAIL_LABEL}
              error={errors.emailId}
              autoComplete='email'
            />
            <RHFormElement
              control={control}
              name='password'
              mode='password'
              label={ADD_ADMIN_PASSWORD_LABEL}
              error={errors.password}
              autoComplete='new-password'
            />
            <RHFormElement
              control={control}
              name='adminType'
              mode='select'
              label={ADD_ADMIN_ROLE_LABEL}
              options={ROLE_OPTIONS}
              error={errors.adminType}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading}
              className='addAdminWrapper__submit'
            >
              {isLoading ? <CircularProgress size={22} color='inherit' /> : ADD_ADMIN_SUBMIT_LABEL}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddAdmin;
