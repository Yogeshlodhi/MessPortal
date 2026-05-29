import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import RHFormElement from 'Common/Components/RHFormElement';

import { useLeaveApplication } from './hooks/useLeaveApplication';

import {
  LEAVE_END_LABEL,
  LEAVE_REASON_LABEL,
  LEAVE_RULES,
  LEAVE_RULES_TITLE,
  LEAVE_START_LABEL,
  LEAVE_SUBMIT_LABEL,
  LEAVE_TITLE,
} from './constants/leaveApplication.general';

import './leaveApplication.scss';

const LeaveApplication = () => {
  const { control, errors, isSubmitting, onSubmit } = useLeaveApplication();

  return (
    <Box className='leaveApplicationWrapper'>
      <Card>
        <CardContent>
          <Typography variant='headingL' component='h1'>
            {LEAVE_TITLE}
          </Typography>

          <Box className='leaveApplicationWrapper__rules'>
            <Box className='leaveApplicationWrapper__rulesTitle'>
              <InfoOutlinedIcon fontSize='small' />
              <Typography variant='semiBoldLabelM' component='h2'>
                {LEAVE_RULES_TITLE}
              </Typography>
            </Box>
            {LEAVE_RULES.map((rule) => (
              <Box key={rule} className='leaveApplicationWrapper__rule'>
                <ArrowRightAltIcon fontSize='small' className='leaveApplicationWrapper__ruleIcon' />
                <Typography variant='textM'>{rule}</Typography>
              </Box>
            ))}
          </Box>

          <Box
            component='form'
            onSubmit={onSubmit}
            className='leaveApplicationWrapper__form'
            noValidate
          >
            <Box className='leaveApplicationWrapper__dates'>
              <RHFormElement
                control={control}
                name='startDate'
                mode='date'
                label={LEAVE_START_LABEL}
                error={errors.startDate}
              />
              <RHFormElement
                control={control}
                name='endDate'
                mode='date'
                label={LEAVE_END_LABEL}
                error={errors.endDate}
              />
            </Box>
            <RHFormElement
              control={control}
              name='reason'
              mode='textarea'
              label={LEAVE_REASON_LABEL}
              error={errors.reason}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isSubmitting}
              className='leaveApplicationWrapper__submit'
            >
              {isSubmitting ? <CircularProgress size={22} color='inherit' /> : LEAVE_SUBMIT_LABEL}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LeaveApplication;
