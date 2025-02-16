import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { ISubcategory } from '@packages/common';
import { FormikSelectField, FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddSubcategoryMutation,
  useUpdateSubcategoryMutation,
} from '../subcategory-api-slice';
import { useGetCategoriesQuery } from '../../category';

interface SubcategoryFormProps {
  subcategory: ISubcategory | null;
}

export const SubcategoryForm: FC<SubcategoryFormProps> = ({ subcategory }) => {
  useDashboardAlert();
  const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [addSubcategory, { isLoading: isAdding }] = useAddSubcategoryMutation();
  const [updateSubcategory, { isLoading: isUpdating }] =
    useUpdateSubcategoryMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      category_id: Yup.number().required('Required'),
    });
  }, []);

  const categoryOptions = useMemo(() => {
    return (
      categories?.map((category) => ({
        value: category.id ?? 0,
        label: category.title,
      })) ?? []
    );
  }, [categories]);

  const formik = useFormik({
    initialValues: {
      id: subcategory?.id ?? 0,
      title: subcategory?.title ?? '',
      description: subcategory?.description ?? '',
      category_id: subcategory?.category_id ?? 0,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: ISubcategory) => {
      const rest = Object.assign({}, values);
      delete rest.id;
      if (values.id) {
        await updateSubcategory(values).unwrap();
      } else {
        await addSubcategory(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikSelectField
              name="category_id"
              label="Category"
              options={categoryOptions}
            />
          </Box>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="title" label="Title" />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="description"
              label="Description"
              multiline
              rows={6}
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
