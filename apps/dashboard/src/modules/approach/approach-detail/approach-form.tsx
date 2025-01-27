import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IApproach } from '@packages/common';
import {
  FormikFileUpload,
  FormikSelectField,
  FormikTextField,
} from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddApproachMutation,
  useUpdateApproachMutation,
} from '../approach-api-slice';

interface ApproachFormProps {
  approach: IApproach | null;
}

const approachSteps = [
  { value: 1, label: 'Step 1' },
  { value: 2, label: 'Step 2' },
  { value: 3, label: 'Step 3' },
  { value: 4, label: 'Step 4' },
  { value: 5, label: 'Step 5' },
];

export const ApproachForm: FC<ApproachFormProps> = ({ approach }) => {
  useDashboardAlert();
  const [addApproach, { isLoading: isAdding }] = useAddApproachMutation();
  const [updateApproach, { isLoading: isUpdating }] =
    useUpdateApproachMutation();

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
      id: approach?.id ?? 0,
      step: approach?.step ?? 0,
      title: approach?.title ?? '',
      summary: approach?.summary ?? '',
      description: approach?.description ?? '',
      media: approach?.media ?? '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IApproach) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateApproach(values).unwrap();
      } else {
        await addApproach(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikSelectField
              name="step"
              label="Step"
              options={approachSteps}
            />
          </Box>
          <Box mb={2}>
            <FormikTextField name="title" label="Title" />
          </Box>
          <Box mb={2}>
            <FormikTextField
              name="summary"
              label="Summary"
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
