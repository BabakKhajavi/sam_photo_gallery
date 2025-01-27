import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IAdvertisement } from '@packages/common';
import { FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
} from '../advertisement-api-slice';

interface AdvertisementFormProps {
  advertisement: IAdvertisement | null;
}

export const AdvertisementForm: FC<AdvertisementFormProps> = ({
  advertisement,
}) => {
  useDashboardAlert();
  const [addAdvertisement, { isLoading: isAdding }] =
    useAddAdvertisementMutation();
  const [updateAdvertisement, { isLoading: isUpdating }] =
    useUpdateAdvertisementMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      type: Yup.string().required('Required'),
      htmlContent: Yup.string().required('Required'),
      styles: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: advertisement?.id ?? 0,
      type: advertisement?.type ?? '',
      htmlContent: advertisement?.htmlContent ?? '',
      styles: advertisement?.styles ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IAdvertisement) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateAdvertisement(values).unwrap();
      } else {
        await addAdvertisement(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="type" label="Advertisement Type" />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="styles"
              label="CSS Styles"
              multiline={true}
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="htmlContent"
              label="HTML Code"
              multiline={true}
              rows={15}
            />
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
