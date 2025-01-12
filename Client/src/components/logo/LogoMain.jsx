// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 *
 */
import logo from 'assets/logo/Seeduwa_Hospitals.jpg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <>
      <img src={logo} alt="Seeduwa Hospitals" width="auto" height="35px" />
    </>
  );
};

export default Logo;
