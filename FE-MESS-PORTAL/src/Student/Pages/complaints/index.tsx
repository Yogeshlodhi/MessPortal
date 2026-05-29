import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import ImageUpload from 'Common/Components/ImageUpload';
import RHFormElement from 'Common/Components/RHFormElement';
import { IMAGE_UPLOAD_HINT } from 'Utils/Common/imageValidation';

import { useComplaints } from './hooks/useComplaints';

import {
  COMPLAINT_ABOUT_LABEL,
  COMPLAINT_DESCRIPTION_LABEL,
  COMPLAINT_IMAGE_LABEL,
  COMPLAINT_SUBMIT_LABEL,
  COMPLAINT_TITLE,
} from './constants/complaints.general';

import './complaints.scss';

const Complaints = () => {
  const { control, errors, isLoading, onSubmit } = useComplaints();

  return (
    <Box className='complaintsWrapper'>
      <Card>
        <CardContent>
          <Typography variant='headingL' component='h1'>
            {COMPLAINT_TITLE}
          </Typography>
          <Box component='form' onSubmit={onSubmit} className='complaintsWrapper__form' noValidate>
            <RHFormElement
              control={control}
              name='complaintAbout'
              mode='text'
              label={COMPLAINT_ABOUT_LABEL}
              error={errors.complaintAbout}
            />
            <RHFormElement
              control={control}
              name='description'
              mode='textarea'
              label={COMPLAINT_DESCRIPTION_LABEL}
              error={errors.description}
            />
            <ImageUpload
              control={control}
              name='attachment'
              label={COMPLAINT_IMAGE_LABEL}
              hint={IMAGE_UPLOAD_HINT}
              error={errors.attachment}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading}
              className='complaintsWrapper__submit'
            >
              {isLoading ? <CircularProgress size={22} color='inherit' /> : COMPLAINT_SUBMIT_LABEL}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Complaints;
