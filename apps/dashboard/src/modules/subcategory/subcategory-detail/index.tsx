import { useParams } from 'react-router-dom';
import { SubcategoryForm } from './subcategory-form';
import { Box, Typography } from '@mui/material';
import { useGetSubcategoryByIdQuery } from '../subcategory-api-slice';
import { BoxLoading } from '@packages/molecules';
import { ISubcategory } from '@packages/common';
import { useEffect } from 'react';

const initialSubcategory: ISubcategory = {
  id: 0,
  title: '',
  description: '',
  category_id: 0,
};

export const SubcategoryDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: subcategoryData,
    isLoading,
    refetch,
  } = useGetSubcategoryByIdQuery(id as string, {
    skip: id === 'new',
  });

  const subcategory =
    id === 'new' ? initialSubcategory : (subcategoryData ?? null);

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
        {id === 'new' ? 'Add New Subcategory' : 'Edit Subcategory'}
      </Typography>
      <SubcategoryForm subcategory={subcategory} />
    </Box>
  );
};
