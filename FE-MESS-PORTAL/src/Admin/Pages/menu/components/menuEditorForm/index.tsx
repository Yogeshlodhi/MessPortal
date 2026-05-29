import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Control, FieldErrors } from 'react-hook-form';

import RHFormElement from 'Common/Components/RHFormElement';
import { DAY_KEYS_ORDER, DAY_LABELS } from '../../constants/menu.general';
import type { IMenuFormValues } from '../../constants/menu.interfaces';

import './menuEditorForm.scss';

interface IMenuEditorFormProps {
  control: Control<IMenuFormValues>;
  errors: FieldErrors<IMenuFormValues>;
}

const MenuEditorForm = ({ control, errors }: IMenuEditorFormProps) => (
  <Box className='menuEditorFormWrapper'>
    <Card>
      <CardContent>
        <Typography variant='headingS' component='h3'>
          Timings
        </Typography>
        <Box className='menuEditorFormWrapper__row'>
          <RHFormElement
            control={control}
            name='timing.breakfast'
            mode='text'
            label='Breakfast'
            error={errors.timing?.breakfast}
          />
          <RHFormElement
            control={control}
            name='timing.lunch'
            mode='text'
            label='Lunch'
            error={errors.timing?.lunch}
          />
          <RHFormElement
            control={control}
            name='timing.dinner'
            mode='text'
            label='Dinner'
            error={errors.timing?.dinner}
          />
          <RHFormElement
            control={control}
            name='timing.specialTiming'
            mode='text'
            label='Special'
            error={errors.timing?.specialTiming}
          />
        </Box>
      </CardContent>
    </Card>

    {DAY_KEYS_ORDER.map((day) => (
      <Card key={day}>
        <CardContent>
          <Typography variant='headingS' component='h3'>
            {DAY_LABELS[day]}
          </Typography>
          <Box className='menuEditorFormWrapper__row'>
            <RHFormElement
              control={control}
              name={`weeklyMenu.${day}.breakfast` as const}
              mode='text'
              label='Breakfast'
              error={errors.weeklyMenu?.[day]?.breakfast}
            />
            <RHFormElement
              control={control}
              name={`weeklyMenu.${day}.lunch` as const}
              mode='text'
              label='Lunch'
              error={errors.weeklyMenu?.[day]?.lunch}
            />
            <RHFormElement
              control={control}
              name={`weeklyMenu.${day}.dinner` as const}
              mode='text'
              label='Dinner'
              error={errors.weeklyMenu?.[day]?.dinner}
            />
            <RHFormElement
              control={control}
              name={`weeklyMenu.${day}.extras` as const}
              mode='text'
              label='Extras'
              error={errors.weeklyMenu?.[day]?.extras}
            />
          </Box>
        </CardContent>
      </Card>
    ))}

    <Card>
      <CardContent>
        <RHFormElement
          control={control}
          name='remarks'
          mode='textarea'
          label='Remarks'
          error={errors.remarks}
        />
      </CardContent>
    </Card>
  </Box>
);

export default MenuEditorForm;
