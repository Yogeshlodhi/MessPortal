import * as yup from 'yup';

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const IMAGE_UPLOAD_HINT = 'PNG, JPG, WEBP or GIF up to 5MB';

// Optional image field shared by feedback and complaint forms.
export const optionalImageSchema = () =>
  yup
    .mixed<File>()
    .nullable()
    .defined()
    .default(null)
    .test(
      'fileSize',
      'Image must be 5MB or smaller',
      (file) => !file || file.size <= MAX_IMAGE_SIZE_BYTES,
    )
    .test(
      'fileType',
      'Only image files (PNG, JPG, WEBP, GIF) are allowed',
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
    );
