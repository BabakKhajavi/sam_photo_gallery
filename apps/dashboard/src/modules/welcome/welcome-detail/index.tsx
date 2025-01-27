import { useParams } from 'react-router-dom';
import { WelcomeForm } from './welcome-form';
import { Box, Typography } from '@mui/material';
import { useGetWelcomeByIdQuery } from '../welcome-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IWelcome } from '@packages/common';
import { useEffect } from 'react';

const initialWelcome: IWelcome = {
  id: 0,
  title: '',
  subtitle: '',
  description: '',
  sub_description: '',
  media: '',
};

export const WelcomeDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: welcomeData,
    isLoading,
    refetch,
  } = useGetWelcomeByIdQuery(id as string, {
    skip: id === 'new',
  });

  const welcome = id === 'new' ? initialWelcome : (welcomeData ?? null);

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
        {id === 'new' ? 'Add New Welcome' : 'Edit Welcome'}
      </Typography>
      <WelcomeForm welcome={welcome} />
    </Box>
  );
};
