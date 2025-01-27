import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface FormikTextFieldProps {
  width?: string;
  height?: string;
  horizontalAlign?: 'flex-start' | 'flex-end' | 'center';
}

export const BoxLoading: React.FC<FormikTextFieldProps> = ({
  width,
  height,
  horizontalAlign = 'center',
}) => {
  return (
    <Box
      display="flex"
      justifyContent={horizontalAlign}
      alignItems="center"
      sx={{ width: width ?? '100%', height: height ?? 200 }}
    >
      <CircularProgress size={40} />;
    </Box>
  );
};
