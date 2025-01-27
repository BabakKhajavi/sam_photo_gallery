import { useParams } from 'react-router-dom';
import { ReviewForm } from './review-form';
import { Box, Typography } from '@mui/material';
import { useGetReviewByIdQuery } from '../review-api-slice';
import { BoxLoading } from '@packages/molecules';
import { IReview } from '@packages/common';
import { useEffect } from 'react';

const initialReview: IReview = {
  id: 0,
  stars: 0,
  source: '',
  description: '',
  link: '',
  owner: '',
  is_approved: false,
};

export const ReviewDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: reviewData,
    isLoading,
    refetch,
  } = useGetReviewByIdQuery(id as string, {
    skip: id === 'new',
  });

  const review = id === 'new' ? initialReview : (reviewData ?? null);

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
        {id === 'new' ? 'Add New Review' : 'Edit Review'}
      </Typography>
      <ReviewForm review={review} />
    </Box>
  );
};
