// material-ui

import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project import
// import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import Navigation from './Navigation';
import BackButton from './navigateBack';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  return (
    <>
      <BackButton />
      <Navigation />
      <Box flexGrow="1"></Box>
      <Notification />
      {/* {!downLG && <Profile />}
      {downLG && <MobileSection />} */}
    </>
  );
}
