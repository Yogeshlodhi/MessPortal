// Builds a FormData body from plain text fields plus named file fields.
// Skips undefined/null values so optional fields are not sent as empty strings.
export const buildMultipartBody = (
  fields: Record<string, unknown>,
  files: Record<string, File | null | undefined> = {},
): FormData => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  Object.entries(files).forEach(([key, file]) => {
    if (file) {
      formData.append(key, file);
    }
  });

  return formData;
};
