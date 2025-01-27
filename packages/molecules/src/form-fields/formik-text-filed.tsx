import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import { useField } from 'formik';

interface FormikTextFieldProps extends Omit<TextFieldProps, 'control'> {
  name: string;
  label: string;
}

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  name,
  label,
  ...fieldProps
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          label={label}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          fullWidth
          {...fieldProps}
        />
      )}
    </Field>
  );
};
