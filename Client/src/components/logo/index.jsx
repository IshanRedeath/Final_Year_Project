import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

// project imports
import config from 'config';
import logo from 'assets/logo/Seeduwa_Hospitals.jpg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    // ButtonBase is used as it is light weight also we need a custom button
    <ButtonBase
      disableRipple
      component={Link}
      to={!to ? config.defaultPath : to} //if 'to' is not defined in params then redirect to defaultPath from config
      sx={sx}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Logo image */}
        <img src={logo} alt="Seeduwa Hospitals" width="auto" height="35px" />

        <Chip
          label={config.projectName}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{
            mt: 0.5,
            ml: 1,
            fontSize: '0.725rem',
            height: 20,
            '& .MuiChip-label': { px: 0.5 },
          }}
        />
      </Stack>
    </ButtonBase>
  );
};

//validate props types in my functions
LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
