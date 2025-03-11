import React from 'react';

//mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//project imports
import { LogoPng } from './logo/LogoMain';

export default function Loading({ loadingState }) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={loadingState}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            height: '80px',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '12px',
            pr: 4,
          }}
        >
          {' '}
          <LogoPng />
          <CircularProgress color="primary" disableShrink />
        </Box>
      </Backdrop>
    </div>
  );
}
