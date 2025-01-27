import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IContact } from '@packages/common';
import { FormikCheckbox, FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import {
  useAddContactMutation,
  useUpdateContactMutation,
} from '../contact-api-slice';

interface ContactFormProps {
  contact: IContact | null;
}

export const ContactForm: FC<ContactFormProps> = ({ contact }) => {
  useDashboardAlert();
  const [addContact, { isLoading: isAdding }] = useAddContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

  const validationSchema = useMemo(() => {
    return Yup.object({
      phone: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      address: Yup.string()
        .max(500, 'Must be 500 characters or less')
        .required('Required'),
      facebook: Yup.string().url('Invalid URL'),
      instagram: Yup.string().url('Invalid URL'),
      linkedin: Yup.string().url('Invalid URL'),
      youtube: Yup.string().url('Invalid URL'),
      is_main: Yup.boolean(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: contact?.id ?? 0,
      phone: contact?.phone ?? '',
      email: contact?.email ?? '',
      address: contact?.address ?? '',
      facebook: contact?.facebook ?? '',
      instagram: contact?.instagram ?? '',
      linkedin: contact?.linkedin ?? '',
      youtube: contact?.youtube ?? '',
      is_main: contact?.is_main ?? false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IContact) => {
      const rest = Object.assign({}, values);
      delete rest.id;

      if (values.id) {
        await updateContact(values).unwrap();
      } else {
        await addContact(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="phone" label="Phone" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="email" label="Email" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="address" label="Address" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="facebook" label="Facebook" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="instagram" label="Instagram" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="linkedin" label="Linkedin" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="youtube" label="Youtube" />
          </Box>
          <Box display="flex" mb={2} width="100%">
            <FormikCheckbox
              name="is_main"
              label={'Is Main Contact?'}
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
