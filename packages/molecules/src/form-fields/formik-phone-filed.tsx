import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';

interface FormikPhoneFieldProps extends Omit<TextFieldProps, 'control'> {
  name: string;
  label: string;
}

const PhoneNumberFormat = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <input
      {...other}
      ref={inputRef}
      onChange={(event) => {
        const value = event.target.value.replace(/\D/g, '');
        const formattedValue = formatPhoneNumber(value);
        onChange({
          target: {
            name: props.name,
            value: formattedValue,
          },
        });
      }}
    />
  );
};

const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};

export const FormikPhoneField: React.FC<FormikPhoneFieldProps> = ({
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
          InputProps={{
            inputComponent: PhoneNumberFormat as any,
          }}
          {...fieldProps}
        />
      )}
    </Field>
  );
};
