'use client';
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const ErrorPage = ({ error }: { error: Error }) => {
  const router = useRouter();

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        {error.message || 'An unexpected error occurred.'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
