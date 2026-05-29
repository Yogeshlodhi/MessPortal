import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';

export interface IImageUploadProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  hint?: string;
  accept?: string;
  error?: FieldError;
}

export interface IImageDropzoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  label?: string;
  hint?: string;
  accept?: string;
  error?: boolean;
  helperText?: string;
}
