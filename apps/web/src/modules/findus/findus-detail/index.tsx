import { useParams } from 'react-router-dom';
import { FindUsForm } from './findus-form';
import { Box, Typography } from '@mui/material';
import { useGetFindUsByIdQuery } from '../findus-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IFindUs } from '@packages/common';
import { useEffect } from 'react';

const initialFindUs: IFindUs = {
  id: 0,
  type: '',
};

export const FindUsDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: findusData,
    isLoading,
    refetch,
  } = useGetFindUsByIdQuery(id as string, {
    skip: id === 'new',
  });

  const findus = id === 'new' ? initialFindUs : (findusData ?? null);

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
        {id === 'new' ? 'Add New FindUs' : 'Edit FindUs'}
      </Typography>
      <FindUsForm findus={findus} />
    </Box>
  );
};
