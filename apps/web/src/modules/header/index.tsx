import { memo, useCallback, FC } from 'react';
import { logout } from '../auth/auth-slice';
import { useAppDispatch } from '../../store/redux-hooks';

import { router } from '../../routes';
import { Box } from '@mui/material';
import { FlatButton, OptimizedImage } from '@packages/atoms';
import { DashboardPaths } from '../../types';
import { LogoHorizontal } from '@packages/common';
export const Header: FC = memo(() => {
  const dispatch = useAppDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.navigate(DashboardPaths.ROOT);
  }, [dispatch]);
  return (
    <Box
      display="grid"
      justifyContent="space-between"
      alignItems="center"
      gridTemplateColumns="1fr auto"
      py={0.6}
      px={2}
      sx={{
        height: 70,
        backgroundColor: (theme) => theme.palette.common.black,
      }}
    >
      <Box>
        <OptimizedImage
          src={LogoHorizontal}
          alt="a golden closet picture on the left with the company name and url"
          width={250}
        />
      </Box>
      <Box>
        <FlatButton onClick={handleLogout} isGolden>
          Logout
        </FlatButton>
      </Box>
    </Box>
  );
});

Header.displayName = 'Header';
