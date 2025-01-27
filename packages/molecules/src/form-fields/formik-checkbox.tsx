import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';
import { Field, FieldProps } from 'formik';

interface FormikCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  indeterminate?: boolean;
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({
  name,
  label,
  indeterminate,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <FormControlLabel
          control={<Checkbox {...field} indeterminate={indeterminate} />}
          label={label}
          {...props}
        />
      )}
    </Field>
  );
};
