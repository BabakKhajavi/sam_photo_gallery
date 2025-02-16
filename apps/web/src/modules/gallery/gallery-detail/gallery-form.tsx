import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IGallery } from '@packages/common';
import {
  FormikCheckbox,
  FormikFileUpload,
  FormikSelectField,
  FormikTextField,
} from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddGalleryMutation,
  useUpdateGalleryMutation,
} from '../gallery-api-slice';
import { useGetSubcategoriesQuery } from '../../subcategory';

interface GalleryFormProps {
  gallery: IGallery | null;
}

export const GalleryForm: FC<GalleryFormProps> = ({ gallery }) => {
  useDashboardAlert();
  const { data: subcategories } = useGetSubcategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true, // fresh after two minutes after the last fetch
  });
  const [addGallery, { isLoading: isAdding }] = useAddGalleryMutation();
  const [updateGallery, { isLoading: isUpdating }] = useUpdateGalleryMutation();

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
      step: Yup.number().max(10, 'No More than 10').required('Required'),
      title: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Required'),
      summary: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      media: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: gallery?.id ?? 0,
      title: gallery?.title ?? '',
      subtitle: gallery?.subtitle ?? '',
      description: gallery?.description ?? '',
      media: gallery?.media ?? '',
      media_thumb: gallery?.media_thumb ?? '',
      is_main: gallery?.is_main ?? false,
      subcategory_id: gallery?.subcategory_id ?? 0,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IGallery) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateGallery(values).unwrap();
      } else {
        await addGallery(rest).unwrap();
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
            <FormikTextField
              name="description"
              label="Description"
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <FormikFileUpload
              name="media_thumb"
              label="thumbnail"
              accept={['image/*']}
            />
          </Box>
          <Box mb={2}>
            <FormikFileUpload
              name="media"
              label="large image"
              accept={['image/*']}
            />
          </Box>
          <Box display="flex" mb={2} width="100%">
            <FormikCheckbox
              name="is_main"
              label={'Is Main Image?'}
              checked={formik.values.is_main}
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
