import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IRequest } from '@packages/common';
import {
  FormikCheckbox,
  FormikDateTimePicker,
  FormikFileUpload,
  FormikSelectField,
  FormikTextField,
} from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddRequestMutation,
  useUpdateRequestMutation,
} from '../request-api-slice';
import { useGetSubcategoriesQuery } from '../../subcategory';

interface RequestFormProps {
  request: IRequest | null;
}

export const RequestForm: FC<RequestFormProps> = ({ request }) => {
  useDashboardAlert();
  const { data: subcategories } = useGetSubcategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true, // fresh after two minutes after the last fetch
  });
  const [addRequest, { isLoading: isAdding }] = useAddRequestMutation();
  const [updateRequest, { isLoading: isUpdating }] = useUpdateRequestMutation();

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
      datetime: Yup.string().required('Required'),
      customer_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      phone: Yup.string().required('Required'),
      phone_alt: Yup.string(),
      schedule: Yup.string().required('Required'),
      subcategories: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: request?.id ?? 0,
      datetime: request?.datetime ?? '',
      customer_name: request?.customer_name ?? '',
      email: request?.email ?? '',
      phone: request?.phone ?? '',
      phone_alt: request?.phone_alt ?? '',
      schedule: request?.schedule ?? '',
      note: request?.note ?? '',
      media1: request?.media1 ?? '',
      media3: request?.media3 ?? '',
      media2: request?.media2 ?? '',
      subcategories: request?.subcategories ?? [],
      seen: request?.seen ?? false,
      is_online: request?.is_online ?? false,
      city_id: request?.city_id ?? 0,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IRequest) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateRequest(values).unwrap();
      } else {
        await addRequest(rest).unwrap();
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
            <FormikDateTimePicker name="datetime" label="Schedule Time" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="note" label="Notes" multiline rows={4} />
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
              name="media1"
              label="Client pictures"
              accept={['image/*']}
            />
          </Box>
          <Box mb={2}>
            <FormikFileUpload
              name="media2"
              label="Client pictures"
              accept={['image/*']}
            />
          </Box>
          <Box mb={2}>
            <FormikFileUpload
              name="media3"
              label="Client pictures"
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
              name="seen"
              label={'Is Being Seen?'}
              checked={formik.values.is_online}
              disabled
            />
          </Box>
          <Box display="flex" mb={2} width="100%">
            <FormikCheckbox
              name="is_online"
              label={'Online Request?'}
              checked={formik.values.is_online}
              disabled
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
