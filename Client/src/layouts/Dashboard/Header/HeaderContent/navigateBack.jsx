import { useNavigate } from 'react-router-dom';
//mui components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous URL
  };
  const handleGoForward = () => {
    navigate(1); // Navigate to the next URL
  };

  return (
    <Box sx={{ mx: 5 }}>
      <IconButton onClick={handleGoBack}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton onClick={handleGoForward}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default BackButton;
