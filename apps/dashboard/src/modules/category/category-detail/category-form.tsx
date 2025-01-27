import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { ICategory } from '@packages/common';
import { FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from '../category-api-slice';

interface CategoryFormProps {
  category: ICategory | null;
}

export const CategoryForm: FC<CategoryFormProps> = ({ category }) => {
  useDashboardAlert();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      title: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: category?.id ?? 0,
      title: category?.title ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: ICategory) => {
      const rest = Object.assign({}, values);
      delete rest.id;
      if (values.id) {
        await updateCategory(values).unwrap();
      } else {
        await addCategory(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="title" label="Category Title" />
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
