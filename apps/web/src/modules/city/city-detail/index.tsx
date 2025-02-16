import { useParams } from 'react-router-dom';
import { CityForm } from './city-form';
import { Box, Typography } from '@mui/material';
import { useGetCityByIdQuery } from '../city-api-slice';
import { BoxLoading } from '@packages/molecules';
import { ICity } from '@packages/common';
import { useEffect } from 'react';

const initialCity: ICity = {
  id: 0,
  name: '',
};

export const CityDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: cityData,
    isLoading,
    refetch,
  } = useGetCityByIdQuery(id as string, {
    skip: id === 'new',
  });

  const city = id === 'new' ? initialCity : (cityData ?? null);

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
        {id === 'new' ? 'Add New City' : 'Edit City'}
      </Typography>
      <CityForm city={city} />
    </Box>
  );
};
