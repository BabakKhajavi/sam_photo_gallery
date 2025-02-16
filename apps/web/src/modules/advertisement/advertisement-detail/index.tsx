import { useParams } from 'react-router-dom';
import { AdvertisementForm } from './advertisement-form';
import { Box, Typography } from '@mui/material';
import { useGetAdvertisementByIdQuery } from '../advertisement-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IAdvertisement } from '@packages/common';
import { useEffect } from 'react';

const initialAdvertisement: IAdvertisement = {
  id: 0,
  type: '',
  htmlContent: '',
  styles: '',
};

export const AdvertisementDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: advertisementData,
    isLoading,
    refetch,
  } = useGetAdvertisementByIdQuery(id as string, {
    skip: id === 'new',
  });

  const advertisement =
    id === 'new' ? initialAdvertisement : (advertisementData ?? null);

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
        {id === 'new' ? 'Add New Advertisement' : 'Edit Advertisement'}
      </Typography>
      <AdvertisementForm advertisement={advertisement} />
    </Box>
  );
};
