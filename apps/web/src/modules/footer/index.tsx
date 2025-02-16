import { memo, FC } from 'react';

import { Box } from '@mui/material';

export const Footer: FC = memo(() => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        color: '#e4cd84',
        width: '100%',
        height: '70px',
        backgroundColor: (theme) => theme.palette.common.black,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      © 2023 www.optimizedclosets.com - All Rights Reserved.
    </Box>
  );
});

Footer.displayName = 'Footer';
