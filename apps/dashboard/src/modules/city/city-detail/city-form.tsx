import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { ICity } from '@packages/common';
import { FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import { useAddCityMutation, useUpdateCityMutation } from '../city-api-slice';

interface CityFormProps {
  city: ICity | null;
}

export const CityForm: FC<CityFormProps> = ({ city }) => {
  useDashboardAlert();
  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const [updateCity, { isLoading: isUpdating }] = useUpdateCityMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: city?.id ?? 0,
      name: city?.name ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: ICity) => {
      const rest = Object.assign({}, values);
      delete rest.id;
      if (values.id) {
        await updateCity(values).unwrap();
      } else {
        await addCity(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="name" label="City Name" />
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
