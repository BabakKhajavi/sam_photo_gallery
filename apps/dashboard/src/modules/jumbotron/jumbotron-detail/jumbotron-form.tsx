import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IJumbotron } from '@packages/common';
import {
  FormikCheckbox,
  FormikFileUpload,
  FormikSelectField,
  FormikTextField,
} from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddJumbotronMutation,
  useUpdateJumbotronMutation,
} from '../jumbotron-api-slice';
import { useGetSubcategoriesQuery } from '../../subcategory';

interface JumbotronFormProps {
  jumbotron: IJumbotron | null;
}

export const JumbotronForm: FC<JumbotronFormProps> = ({ jumbotron }) => {
  useDashboardAlert();
  const { data: subcategories } = useGetSubcategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true, // fresh after two minutes after the last fetch
  });
  const [addJumbotron, { isLoading: isAdding }] = useAddJumbotronMutation();
  const [updateJumbotron, { isLoading: isUpdating }] =
    useUpdateJumbotronMutation();

  const subcategoryOptions = useMemo(() => {
    return (
      subcategories?.map((category) => ({
        value: category.id ?? 0,
        label: category.title,
      })) ?? []
    );
  }, [subcategories]);

  const validationSchema = useMemo(() => {
    return Yup.object({
      title: Yup.string().required('Required'),
      subtitle: Yup.string().required('Required'),
      is_main_jumbotron: Yup.boolean().required('Required'),
      description: Yup.string().required('Required'),
      media: Yup.string().required('Required'),
      subcategory_id: Yup.number().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: jumbotron?.id ?? 0,
      title: jumbotron?.title ?? '',
      subtitle: jumbotron?.subtitle ?? '',
      is_main_jumbotron: jumbotron?.is_main_jumbotron ?? false,
      subcategory_id: jumbotron?.subcategory_id ?? 0,
      media: jumbotron?.media ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IJumbotron) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateJumbotron(values).unwrap();
      } else {
        await addJumbotron(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikSelectField
              name="subcategory_id"
              label="Subcategory"
              options={subcategoryOptions}
            />
          </Box>
          <Box mb={2}>
            <FormikTextField name="title" label="Title" />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="subtitle"
              label="Subtitle"
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <FormikFileUpload name="media" label="Image" accept={['image/*']} />
          </Box>
          <Box display="flex" mb={2} width="100%">
            <FormikCheckbox
              name="is_main_jumbotron"
              label={'Is Main Image?'}
              checked={formik.values.is_main_jumbotron}
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
