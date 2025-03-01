import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LogoPng } from './logo/LogoMain';
import Stack from '@mui/material/Stack';

export default function Loading({ loadingState }) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }} open={loadingState}>
        <Stack spacing={5} direction="column" alignItems="center">
          <LogoPng />
          <CircularProgress color="inherit" />
        </Stack>
      </Backdrop>
    </div>
  );
}
