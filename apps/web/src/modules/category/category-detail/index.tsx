import { useParams } from 'react-router-dom';
import { CategoryForm } from './category-form';
import { Box, Typography } from '@mui/material';
import { useGetCategoryByIdQuery } from '../category-api-slice';
import { BoxLoading } from '@packages/molecules';
import { ICategory } from '@packages/common';
import { useEffect } from 'react';

const initialCategory: ICategory = {
  id: 0,
  title: '',
};

export const CategoryDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: categoryData,
    isLoading,
    refetch,
  } = useGetCategoryByIdQuery(id as string, {
    skip: id === 'new',
  });

  const category = id === 'new' ? initialCategory : (categoryData ?? null);

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
        {id === 'new' ? 'Add New Category' : 'Edit Category'}
      </Typography>
      <CategoryForm category={category} />
    </Box>
  );
};
