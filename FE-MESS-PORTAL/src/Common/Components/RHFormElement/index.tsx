import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

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
}: IRHFormElementProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
          return (
            <TextField
              type={showPassword ? 'text' : 'password'}
              {...commonProps}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge='end'
                      size='small'
                      disabled={disabled}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon fontSize='small' />
                      ) : (
                        <VisibilityOutlinedIcon fontSize='small' />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          );
        }

        return <TextField type='text' {...commonProps} />;
      }}
    />
  );
};

export default RHFormElement;
