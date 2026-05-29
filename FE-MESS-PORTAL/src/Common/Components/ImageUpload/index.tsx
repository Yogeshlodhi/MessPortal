import { useEffect, useRef, useState, type DragEvent, type KeyboardEvent } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import type { IImageDropzoneProps, IImageUploadProps } from './constants/imageUpload.interfaces';

import './imageUpload.scss';

const ImageDropzone = ({
  value,
  onChange,
  onBlur,
  label,
  hint,
  accept = 'image/*',
  error,
  helperText,
}: IImageDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const openPicker = () => inputRef.current?.click();

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onChange(file);
    onBlur?.();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const dropzoneClass = [
    'imageUploadWrapper__dropzone',
    isDragging && 'imageUploadWrapper__dropzone--dragging',
    error && 'imageUploadWrapper__dropzone--error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Box className='imageUploadWrapper'>
      {label && (
        <Typography variant='semiBoldLabelM' component='span' className='imageUploadWrapper__label'>
          {label}
        </Typography>
      )}

      <Box
        className={dropzoneClass}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role='button'
        tabIndex={0}
        aria-label={label ?? 'Upload image'}
      >
        {value && previewUrl ? (
          <Box className='imageUploadWrapper__preview'>
            <img src={previewUrl} alt={value.name} className='imageUploadWrapper__previewImg' />
            <Box className='imageUploadWrapper__previewInfo'>
              <ImageOutlinedIcon fontSize='small' />
              <Typography variant='subtextM' className='imageUploadWrapper__fileName'>
                {value.name}
              </Typography>
            </Box>
            <IconButton
              size='small'
              className='imageUploadWrapper__remove'
              onClick={(event) => {
                event.stopPropagation();
                handleRemove();
              }}
              aria-label='Remove image'
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        ) : (
          <Box className='imageUploadWrapper__placeholder'>
            <CloudUploadOutlinedIcon className='imageUploadWrapper__uploadIcon' />
            <Typography variant='semiBoldLabelM'>Browse or drop an image</Typography>
            {hint && (
              <Typography variant='subtextS' className='imageUploadWrapper__hint'>
                {hint}
              </Typography>
            )}
          </Box>
        )}

        <input
          ref={inputRef}
          type='file'
          accept={accept}
          hidden
          onChange={(event) => handleFiles(event.target.files)}
        />
      </Box>

      {helperText && (
        <Typography
          variant='subtextS'
          className={error ? 'imageUploadWrapper__helper--error' : 'imageUploadWrapper__helper'}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

const ImageUpload = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  accept,
  error,
}: IImageUploadProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <ImageDropzone
        value={(field.value as File | null) ?? null}
        onChange={field.onChange}
        onBlur={field.onBlur}
        label={label}
        hint={hint}
        accept={accept}
        error={Boolean(error)}
        helperText={error?.message}
      />
    )}
  />
);

export default ImageUpload;
