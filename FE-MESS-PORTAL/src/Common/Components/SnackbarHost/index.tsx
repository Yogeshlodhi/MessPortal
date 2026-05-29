import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from 'Redux/Store';
import { hideSnackbar } from 'Redux/Slices/Common/SnackbarSlice';

import { SNACKBAR_AUTO_HIDE_MS } from './constants/snackbarHost.general';

import './snackbarHost.scss';

const SnackbarHost = () => {
  const dispatch = useAppDispatch();
  const { open, severity, message, transactionId } = useAppSelector((state) => state.snackbar);

  const handleClose = () => dispatch(hideSnackbar());

  return (
    <Snackbar
      open={open}
      autoHideDuration={SNACKBAR_AUTO_HIDE_MS}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        variant='filled'
        className='snackbarHostWrapper__alert'
      >
        <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
        <Typography variant='textM' component='span'>
          {message}
        </Typography>
        {transactionId && (
          <Typography variant='subtextS' component='span' className='snackbarHostWrapper__txnId'>
            ID: {transactionId}
          </Typography>
        )}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarHost;
