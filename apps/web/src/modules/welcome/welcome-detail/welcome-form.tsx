import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IHome } from '@packages/common';
import { FormikFileUpload, FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddWelcomeMutation,
  useUpdateWelcomeMutation,
} from '../welcome-api-slice';

interface WelcomeFormProps {
  welcome: IHome | null;
}

export const WelcomeForm: FC<WelcomeFormProps> = ({ welcome }) => {
  useDashboardAlert();
  const [addWelcome, { isLoading: isAdding }] = useAddWelcomeMutation();
  const [updateWelcome, { isLoading: isUpdating }] = useUpdateWelcomeMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      step: Yup.number().max(10, 'No More than 10').required('Required'),
      title: Yup.string().required('Required'),
      subtitle: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      sub_description: Yup.string().required('Required'),
      media: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: welcome?.id ?? 0,
      title: welcome?.title ?? '',
      subtitle: welcome?.subtitle ?? '',
      description: welcome?.description ?? '',
      sub_description: welcome?.sub_description ?? '',
      media: welcome?.media ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IHome) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateWelcome(values).unwrap();
      } else {
        await addWelcome(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="title" label="Title" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="subtitle" label="Subtitle" />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="description"
              label="Description"
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="sub_description"
              label="Sub description"
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <FormikFileUpload name="media" label="image" accept={['image/*']} />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <PrimaryButton
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
              loading={isAdding || isUpdating}
            >
              Submit
            </PrimaryButton>
          </Box>
        </form>
      </FormikProvider>
    </Box>
  );
};
