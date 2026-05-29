import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { API_ERROR_TITLE, API_ERROR_SUBTITLE, API_ERROR_BUTTON_LABEL } from './constants/apiError.general';
import type { IApiErrorProps } from './constants/apiError.interfaces';

import './apiError.scss';

const ApiError = ({
  title = API_ERROR_TITLE,
  subtitle = API_ERROR_SUBTITLE,
  buttonLabel = API_ERROR_BUTTON_LABEL,
  refetch,
}: IApiErrorProps) => (
  <Box className='apiErrorWrapper' role='alert'>
    <ErrorOutlineIcon color='error' className='apiErrorWrapper__icon' />
    <Typography variant='headingS' component='h3'>
      {title}
    </Typography>
    <Typography variant='textM' className='apiErrorWrapper__subtitle'>
      {subtitle}
    </Typography>
    {refetch && (
      <Button variant='outlined' onClick={refetch} className='apiErrorWrapper__retry'>
        {buttonLabel}
      </Button>
    )}
  </Box>
);

export default ApiError;
