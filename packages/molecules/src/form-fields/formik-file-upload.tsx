import React, { useState } from 'react';
import { Field, FieldProps } from 'formik';
import { TextField, Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';

type AcceptFileType =
  | 'image/*'
  | 'application/pdf'
  | 'video/mp4'
  | 'video/avi'
  | 'video/mov'
  | 'audio/*'
  | 'text/*'
  | '*';

interface FormikFileUploadProps {
  name: string;
  label: string;
  accept?: AcceptFileType[];
}

export const FormikFileUpload: React.FC<FormikFileUploadProps> = ({
  name,
  label,
  accept = ['*'],
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    form: any,
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setFieldValue(name, file);
    }
  };

  return (
    <Field name={name}>
      {({ form, meta }: FieldProps) => (
        <Box display="flex" alignItems="center">
          <TextField
            label={label}
            value={fileName || form.values?.[name]?.split('/').pop()}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            fullWidth
            size="small"
            slotProps={{
              htmlInput: {
                readOnly: true,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <PrimaryButton
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: 40,
            }}
            component={'label'}
          >
            Upload
            <input
              type="file"
              accept={accept.join(',')}
              hidden
              onChange={(event) => handleFileChange(event, form)}
            />
          </PrimaryButton>
        </Box>
      )}
    </Field>
  );
};
