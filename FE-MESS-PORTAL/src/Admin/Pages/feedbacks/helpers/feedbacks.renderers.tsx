import _map from 'lodash/map';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { IFeedback } from 'Common/types/domain.types';

export const renderFeedbackCards = (items: ReadonlyArray<IFeedback>) =>
  _map(items, (item) => (
    <Card key={item._id} className='adminFeedbacksWrapper__card'>
      <CardContent>
        <Box className='adminFeedbacksWrapper__cardHeader'>
          <Typography variant='headingS' component='h3'>
            {item.mealOfDay}
          </Typography>
          <Chip size='small' label={`Rating: ${item.feedback}/5`} />
        </Box>
        <Typography variant='textM' className='adminFeedbacksWrapper__description'>
          {item.feedbackDescription}
        </Typography>
        {item.suggestion && (
          <Typography variant='textM' className='adminFeedbacksWrapper__suggestion'>
            <strong>Suggestion: </strong>
            {item.suggestion}
          </Typography>
        )}
        <Typography variant='subtextM' className='adminFeedbacksWrapper__meta'>
          {item.studentRoll ? `By ${item.student ?? 'student'} (${item.studentRoll})` : ''}
          {item.submissionDate ? ` · ${new Date(item.submissionDate).toLocaleString()}` : ''}
        </Typography>
      </CardContent>
    </Card>
  ));
