import { useParams } from 'react-router-dom';
import { GalleryForm } from './gallery-form';
import { Box, Typography } from '@mui/material';
import { useGetGalleryByIdQuery } from '../gallery-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IGallery } from '@packages/common';
import { useEffect } from 'react';

const initialGallery: IGallery = {
  id: 0,
  title: '',
  subtitle: '',
  description: '',
  media: '',
  media_thumb: '',
  is_main: false,
  subcategory_id: 0,
};

export const GalleryDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: galleryData,
    isLoading,
    refetch,
  } = useGetGalleryByIdQuery(id as string, {
    skip: id === 'new',
  });

  const gallery = id === 'new' ? initialGallery : (galleryData ?? null);

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
        {id === 'new' ? 'Add New Gallery' : 'Edit Gallery'}
      </Typography>
      <GalleryForm gallery={gallery} />
    </Box>
  );
};
