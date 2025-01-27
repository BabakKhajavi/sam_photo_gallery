import { useParams } from 'react-router-dom';
import { RequestForm } from './request-form';
import { Box, Typography } from '@mui/material';
import { useGetRequestByIdQuery } from '../request-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IRequest } from '@packages/common';
import { useEffect } from 'react';

const initialRequest: IRequest = {
  id: 0,
  datetime: '',
  customer_name: '',
  email: '',
  phone: '',
  phone_alt: '',
  schedule: '',
  note: '',
  media1: '',
  media2: '',
  media3: '',
  seen: false,
  is_online: false,
  subcategories: [],
  city_id: 0,
};

export const RequestDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: requestData,
    isLoading,
    refetch,
  } = useGetRequestByIdQuery(id as string, {
    skip: id === 'new',
  });

  const request = id === 'new' ? initialRequest : (requestData ?? null);

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
        {id === 'new' ? 'Add New Request' : 'Edit Request'}
      </Typography>
      <RequestForm request={request} />
    </Box>
  );
};
