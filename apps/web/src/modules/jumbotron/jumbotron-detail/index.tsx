import { useParams } from 'react-router-dom';
import { JumbotronForm } from './jumbotron-form';
import { Box, Typography } from '@mui/material';
import { useGetJumbotronByIdQuery } from '../jumbotron-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IJumbotron } from '@packages/common';
import { useEffect } from 'react';

const initialJumbotron: IJumbotron = {
  id: 0,
  title: '',
  subtitle: '',
  media: '',
  is_main_jumbotron: false,
  subcategory_id: 0,
};

export const JumbotronDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: jumbotronData,
    isLoading,
    refetch,
  } = useGetJumbotronByIdQuery(id as string, {
    skip: id === 'new',
  });

  const jumbotron = id === 'new' ? initialJumbotron : (jumbotronData ?? null);

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
        {id === 'new' ? 'Add New Jumbotron' : 'Edit Jumbotron'}
      </Typography>
      <JumbotronForm jumbotron={jumbotron} />
    </Box>
  );
};
