// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 *
 */
import logo from 'assets/logo/Logo_transparent.jpg';
import logowithname from 'assets/logo/hospital_logo_with_name.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <>
      <img src={logo} alt="Seeduwa Hospitals" width="auto" height="35px" />
    </>
  );
};

const LogoPng = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          height: '80px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '12px',
        }}
      >
        {' '}
        <img src={logowithname} alt="Seeduwa Hospitals" width="auto" height="250px" />
      </Box>
    </>
  );
};
export { Logo, LogoPng };
