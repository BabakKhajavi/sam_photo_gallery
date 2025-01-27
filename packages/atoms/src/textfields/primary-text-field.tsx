import React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

export const PrimaryTextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
};
