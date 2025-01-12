// import PropTypes from 'prop-types';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';

//Styled Scrollbar Component
const FadeScrollbar = styled(Box)(() => ({
  overflow: 'auto',
  maxHeight: '100vh',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: 'auto',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#c1c1c1',
    borderRadius: '4px',
    transition: 'opacity 0.3s',
    opacity: 0, // Hidden by default
  },
  '&:hover::-webkit-scrollbar-thumb': {
    opacity: 1, // Show scrollbar on hover
  },
  '&::-webkit-scrollbar-thumb:hover': {
    opacity: 1,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
  },
}));

const CustomScrollBarBox = ({ children, sx }) => {
  return (
    <>
      <FadeScrollbar sx={sx}>{children}</FadeScrollbar>
    </>
  );
};

export default CustomScrollBarBox;
