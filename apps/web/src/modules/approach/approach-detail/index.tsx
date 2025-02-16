import { useParams } from 'react-router-dom';
import { ApproachForm } from './approach-form';
import { Box, Typography } from '@mui/material';
import { useGetApproachByIdQuery } from '../approach-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IPlan } from '@packages/common';
import { useEffect } from 'react';

const initialApproach: IPlan = {
  id: 0,
  step: 0,
  title: '',
  summary: '',
  description: '',
  media: '',
};

export const ApproachDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: approachData,
    isLoading,
    refetch,
  } = useGetApproachByIdQuery(id as string, {
    skip: id === 'new',
  });

  const approach = id === 'new' ? initialApproach : (approachData ?? null);

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
        {id === 'new' ? 'Add New Approach' : 'Edit Approach'}
      </Typography>
      <ApproachForm approach={approach} />
    </Box>
  );
};
