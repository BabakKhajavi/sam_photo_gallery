import { useParams } from 'react-router-dom';
import { ContactForm } from './contact-form';
import { Box, Typography } from '@mui/material';
import { useGetContactByIdQuery } from '../contact-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IContact } from '@packages/common';
import { useEffect } from 'react';

const initialContact: IContact = {
  id: 0,
  phone: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  youtube: '',
  is_main: false,
};

export const ContactDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: contactData,
    isLoading,
    refetch,
  } = useGetContactByIdQuery(id as string, {
    skip: id === 'new',
  });

  const contact = id === 'new' ? initialContact : (contactData ?? null);

  useEffect(() => {
    if (id === 'new') {
      return;
    }

    refetch();
  }, [id, refetch]);

  if (isLoading) {
    return <BoxLoading />;
  }

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '10px',
        minHeight: '650px',
      }}
    >
      <Typography variant="h5" textAlign="left" gutterBottom>
        {id === 'new' ? 'Add New Contact' : 'Edit Contact'}
      </Typography>
      <ContactForm contact={contact} />
    </Box>
  );
};
