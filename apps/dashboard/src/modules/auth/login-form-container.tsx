import { useCallback } from 'react';
import { Box } from '@mui/material';

import { useLoginMutation } from './auth-api-slice';
import { useAppDispatch } from '../../store/redux-hooks';
import { refreshToken } from './auth-slice';
import { LoginForm } from '@packages/organisms';
import { ILogin } from '@packages/common';

export const LoginFormContainer = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = useCallback(
    async (values: ILogin) => {
      const { token } = await login(values).unwrap();
      if (token) {
        dispatch(refreshToken(token));
      }
    },
    [dispatch, login],
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <LoginForm
        loginTitle={'Welcome to \nOptimized Closet Portal'}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </Box>
  );
};
