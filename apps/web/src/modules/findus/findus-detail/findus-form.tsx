import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IFindUs } from '@packages/common';
import { FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddFindUsMutation,
  useUpdateFindUsMutation,
} from '../findus-api-slice';

interface FindUsFormProps {
  findus: IFindUs | null;
}

export const FindUsForm: FC<FindUsFormProps> = ({ findus }) => {
  useDashboardAlert();
  const [addFindUs, { isLoading: isAdding }] = useAddFindUsMutation();
  const [updateFindUs, { isLoading: isUpdating }] = useUpdateFindUsMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      type: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: findus?.id ?? 0,
      type: findus?.type ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IFindUs) => {
      const rest = Object.assign({}, values);
      delete rest.id;
      if (values.id) {
        await updateFindUs(values).unwrap();
      } else {
        await addFindUs(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="type" label="FindUs Type" />
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
