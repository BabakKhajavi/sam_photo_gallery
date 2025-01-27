import React from 'react';
import {
  Select,
  SelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { Field, FieldProps } from 'formik';

interface FormikSelectFieldProps extends Omit<SelectProps, 'name'> {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
}

export const FormikSelectField: React.FC<FormikSelectFieldProps> = ({
  name,
  label,
  options,
  ...fieldProps
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...fieldProps}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};
