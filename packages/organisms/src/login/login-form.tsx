import { FC, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { OptimizedImage, PrimaryButton } from '@packages/atoms';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from '@packages/molecules';
import { ILogin, LogoVertical } from '@packages/common';

const initialLogin: ILogin = {
  username: '',
  password: '',
};
interface LoginFormProps {
  onSubmit: (values: ILogin) => Promise<void>;
  isLoading?: boolean;
  loginTitle: string;
}
export const LoginForm: FC<LoginFormProps> = ({
  loginTitle,
  onSubmit,
  isLoading,
}) => {
  const validationSchema = useMemo(() => {
    return Yup.object({
      username: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: initialLogin,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: ILogin) => await onSubmit(values),
  });
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: 400,
            border: '3px solid #001d3d',
            borderRadius: '10px',
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: (theme) => theme.palette.common.black }}
            p={2}
          >
            <OptimizedImage
              src={LogoVertical}
              alt="A classic closet with with golden color and the company name at the bottom"
              width={600}
              height={400}
              sizes="(max-width: 600px) 600px, 1200px"
            />
          </Box>

          <Box p={3}>
            <Typography
              variant="h5"
              align="center"
              mb={3}
              sx={{ whiteSpace: 'pre-line' }}
            >
              {loginTitle}
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <FormikTextField
                name="username"
                label="Email"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mb={2}>
              <FormikTextField
                type="password"
                name="password"
                label="Password"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <PrimaryButton
                type="submit"
                disabled={
                  formik.isSubmitting || !formik.isValid || !formik.dirty
                }
                loading={isLoading}
              >
                Login
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
      </form>
    </FormikProvider>
  );
};
