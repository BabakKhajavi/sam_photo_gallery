import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IReview } from '@packages/common';
import {
  FormikCheckbox,
  FormikSelectField,
  FormikTextField,
} from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
} from '../review-api-slice';

interface ReviewFormProps {
  review: IReview | null;
}

const reviewStars = [
  { value: 1, label: '1 Star' },
  { value: 2, label: '2 Stars' },
  { value: 3, label: '3 Stars' },
  { value: 4, label: '4 Stars' },
  { value: 5, label: '5 Stars' },
];

export const ReviewForm: FC<ReviewFormProps> = ({ review }) => {
  useDashboardAlert();
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      stars: Yup.number().required('Required'),
      source: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      owner: Yup.string().required('Required'),
      link: Yup.string().url('Invalid URL'),
      is_approved: Yup.boolean(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: review?.id ?? 0,
      stars: review?.stars ?? 0,
      source: review?.source ?? '',
      description: review?.description ?? '',
      link: review?.link ?? '',
      owner: review?.owner ?? '',
      is_approved: review?.is_approved ?? false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IReview) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateReview(values).unwrap();
      } else {
        await addReview(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikTextField name="owner" label="Reviewer" />
          <Box mb={2} sx={{ width: 500 }}>
            <FormikSelectField
              name="stars"
              label="Stars"
              options={reviewStars}
            />
          </Box>
          <Box mb={2}>
            <FormikTextField name="source" label="Source" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="link" label="Review Link" />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="description"
              label="description"
              multiline
              rows={6}
            />
          </Box>
          <Box display="flex" mb={2} width="100%">
            <FormikCheckbox
              name="is_approved"
              label={'Is Main Review?'}
              checked={formik.values.is_approved}
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
