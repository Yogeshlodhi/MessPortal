import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import ImageUpload from 'Common/Components/ImageUpload';
import RHFormElement from 'Common/Components/RHFormElement';
import { IMAGE_UPLOAD_HINT } from 'Utils/Common/imageValidation';

import { useFeedback } from './hooks/useFeedback';
import {
  FEEDBACK_DESCRIPTION_LABEL,
  FEEDBACK_IMAGE_LABEL,
  FEEDBACK_MEAL_LABEL,
  FEEDBACK_RATING_LABEL,
  FEEDBACK_SUBMIT_LABEL,
  FEEDBACK_SUGGESTION_LABEL,
  FEEDBACK_TITLE,
  MEAL_OPTIONS,
  RATING_MAX,
} from './constants/feedback.general';

import './feedback.scss';

const Feedback = () => {
  const { control, errors, isLoading, onSubmit } = useFeedback();

  return (
    <Box className='feedbackWrapper'>
      <Card>
        <CardContent>
          <Typography variant='headingL' component='h1'>
            {FEEDBACK_TITLE}
          </Typography>

          <Box component='form' onSubmit={onSubmit} className='feedbackWrapper__form' noValidate>
            <Box className='feedbackWrapper__main'>
              <RHFormElement
                control={control}
                name='mealOfDay'
                mode='select'
                label={FEEDBACK_MEAL_LABEL}
                options={MEAL_OPTIONS}
                error={errors.mealOfDay}
              />

              <Controller
                control={control}
                name='feedback'
                render={({ field }) => (
                  <Box className='feedbackWrapper__rating'>
                    <Typography variant='semiBoldLabelM' component='span'>
                      {FEEDBACK_RATING_LABEL}
                    </Typography>
                    <Box className='feedbackWrapper__ratingRow'>
                      <Rating
                        name='feedback'
                        value={Number(field.value) || 0}
                        max={RATING_MAX}
                        size='large'
                        onChange={(_, newValue) => field.onChange(newValue ?? 0)}
                        onBlur={field.onBlur}
                      />
                      <Typography variant='textM' className='feedbackWrapper__ratingValue'>
                        {Number(field.value) > 0 ? `${field.value} / ${RATING_MAX}` : 'Not rated'}
                      </Typography>
                    </Box>
                    {errors.feedback && (
                      <Typography variant='subtextS' color='error'>
                        {errors.feedback.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />

              <RHFormElement
                control={control}
                name='feedbackDescription'
                mode='textarea'
                label={FEEDBACK_DESCRIPTION_LABEL}
                error={errors.feedbackDescription}
              />
              <RHFormElement
                control={control}
                name='suggestion'
                mode='textarea'
                label={FEEDBACK_SUGGESTION_LABEL}
                error={errors.suggestion}
              />
            </Box>

            <Box className='feedbackWrapper__side'>
              <ImageUpload
                control={control}
                name='feedbackImage'
                label={FEEDBACK_IMAGE_LABEL}
                hint={IMAGE_UPLOAD_HINT}
                error={errors.feedbackImage}
              />
            </Box>

            <Box className='feedbackWrapper__footer'>
              <Button
                type='submit'
                variant='contained'
                size='large'
                disabled={isLoading}
                className='feedbackWrapper__submit'
              >
                {isLoading ? <CircularProgress size={22} color='inherit' /> : FEEDBACK_SUBMIT_LABEL}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Feedback;
