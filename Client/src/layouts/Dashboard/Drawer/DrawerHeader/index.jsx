import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
//import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  const theme = useTheme();

  return (
    // <DrawerHeaderStyled theme={theme} open={!!open}>
    <Logo
      isIcon={!open}
      to="/admin-dashboard/"
      sx={{ width: open ? 'auto' : 35, height: 35, my: 2 }}
    />
    // </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };