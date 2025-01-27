import React from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { Field, FieldProps } from 'formik';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

interface FormikDateTimePickerProps {
  name: string;
  label: string;
}

export const FormikDateTimePicker: React.FC<FormikDateTimePickerProps> = ({
  name,
  label,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
          <DateTimePicker
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              form.setFieldValue(
                name,
                date ? dayjs(date).format('YYYY-MM-DDTHH:mm:ss') : '',
              );
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};
