import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Scrollbar Component
const FadeScrollbar = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  maxHeight: '100vh',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: 'auto',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '10px',
    transition: 'opacity 0.3s',
    opacity: 0, // Hidden by default
  },
  '&:hover::-webkit-scrollbar-thumb': {
    opacity: 1, // Show scrollbar on hover
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

// Component
export default function FadeScrollBar({ children, sx, ...other }) {
  return (
    <FadeScrollbar sx={sx} {...other}>
      {children}
    </FadeScrollbar>
  );
}

FadeScrollBar.propTypes = {
  children: PropTypes.any,
  sx: PropTypes.any,
};
