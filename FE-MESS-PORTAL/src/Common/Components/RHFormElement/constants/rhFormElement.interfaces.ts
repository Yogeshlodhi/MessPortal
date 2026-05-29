import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';

export type RHFormMode = 'text' | 'password' | 'textarea' | 'select' | 'date';

export interface IRHFormOption {
  label: string;
  value: string;
}

export interface IRHFormElementProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  mode: RHFormMode;
  label: string;
  placeholder?: string;
  error?: FieldError;
  options?: ReadonlyArray<IRHFormOption>;
  disabled?: boolean;
  autoComplete?: string;
  onChangeCustom?: (value: string) => void;
}
