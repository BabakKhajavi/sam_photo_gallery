import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { PageHeader } from './pagemap';
import { LoginFormContainer } from './auth';
import { SideMenu } from './menu';
import { useAppSelector } from '../store/redux-hooks';
import { Header } from './header';
import { BoxLoading } from '@packages/molecules';
import { Footer } from './footer';

export const Layout: FC = () => {
  const token = useAppSelector((state) => state.authReducer.token);
  return (
    <>
      {token ? (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={2}>
              <SideMenu />
            </Grid>
            <Grid
              item
              xs={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 80px)',
                overflow: 'hidden',
              }}
            >
              <Grid
                item
                sx={{
                  px: 3,
                  pt: 2,
                  pb: 1,
                  backgroundColor: 'grey.200',
                  overflowY: 'auto',
                  flexGrow: 1,
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                  },
                  scrollbarWidth: 'thin',
                }}
              >
                <PageHeader />
                <Suspense fallback={<BoxLoading />}>
                  <Outlet />
                </Suspense>
              </Grid>
              <Grid
                item
                sx={{
                  px: 3,
                  backgroundColor: 'grey.200',
                  bottom: 0,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Footer />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <LoginFormContainer />
        </Box>
      )}
    </>
  );
};
