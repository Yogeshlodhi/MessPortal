import { Controller, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import type { IRHFormElementProps } from './constants/rhFormElement.interfaces';

import './rhFormElement.scss';

const RHFormElement = <TFieldValues extends FieldValues>({
  control,
  name,
  mode,
  label,
  placeholder,
  error,
  options = [],
  disabled = false,
  autoComplete,
  onChangeCustom,
}: IRHFormElementProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        field.onChange(event);
        onChangeCustom?.(event.target.value);
      };

      const commonProps = {
        ...field,
        onChange: handleChange,
        label,
        placeholder,
        disabled,
        autoComplete,
        error: Boolean(error),
        helperText: error?.message ?? ' ',
        className: 'rhFormElementWrapper__input',
      };

      if (mode === 'select') {
        return (
          <TextField select {...commonProps}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }

      if (mode === 'textarea') {
        return <TextField multiline minRows={3} {...commonProps} />;
      }

      if (mode === 'date') {
        return <TextField type='date' InputLabelProps={{ shrink: true }} {...commonProps} />;
      }

      if (mode === 'password') {
        return <TextField type='password' {...commonProps} />;
      }

      return <TextField type='text' {...commonProps} />;
    }}
  />
);

export default RHFormElement;
