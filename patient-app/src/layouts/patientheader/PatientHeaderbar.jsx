//Mui components
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid2';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

//Mui Icons
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
//My Headerbar Components
import UserMenu from './PatientUserMenu';
//React Router lib
import { useLocation, useNavigate } from 'react-router-dom';
const iconProps = { fontSize: { xs: 35, md: 35 } };

const navItems = [
  {
    name: 'Visits',
    icon: <PendingActionsTwoToneIcon sx={{ ...iconProps }} />,
    value: 'visits',
  },
  {
    name: 'Messages',
    icon: <MailTwoToneIcon sx={{ ...iconProps }} />,
    value: 'messages',
  },
  {
    name: 'Tests',
    icon: <ScienceTwoToneIcon sx={{ ...iconProps }} />,
    value: 'test-results',
  },
  {
    name: 'Medication',
    icon: <HealingTwoToneIcon sx={{ ...iconProps }} />,
    value: 'medication',
  },
];
//Patient navigation menu located on middle of Appbar
const Navigation = ({ showLabel }) => {
  const [value, setValue] = React.useState('');
  const location = useLocation(); //returns current URL

  const navigate = useNavigate();
  useEffect(() => {
    //TODO change This as app routers are defined as(.split('/').[2])
    const pathName = location.pathname.split('/').at(-1);
    setValue(pathName);
  }, [location]); // Check weather pathname is within the four Navigation Items if so the active value set to that path onMount

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/patient-dashboard/${newValue}`);
  }; //On user navigation change the the page will route to that relavant route

  return (
    <Box>
      <BottomNavigation value={value} onChange={handleChange} showLabels={showLabel}>
        {navItems.map((item, index) => (
          <BottomNavigationAction
            sx={{
              maxWidth: '10px', // Ensures the action buttons don’t stretch
              px: 0.5, // Tightens spacing between buttons
            }}
            key={index}
            label={item.name}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
//This is original navigation component to automate changes of navigating menu based on screen sizes
function PatientNavigation() {
  const isMobile = useMediaQuery('only screen and (max-width : 550px)');

  return <>{isMobile ? <Navigation showLabel={false} /> : <Navigation showLabel={true} />}</>;
}

export default function PatientHeaderbar() {
  const user = { name: 'Ishan', role: 'patient' };

  const navigate = useNavigate();
  const Logout = () => {
    console.log('user Loggoed out');
    //Replace logout logic
    navigate('/login');
  };

  const redirectTo = () => {
    if (user) {
      navigate(`/${user.role}-dashboard`);
    } else {
      navigate('/login');
    }
  };
  const isMobile = useMediaQuery('only screen and (max-width : 550px)');

  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down'); // Scrolling down
      } else {
        setScrollDirection('up'); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Slide in={isMobile ? scrollDirection === 'up' : true} appear={false} direction="down">
      <AppBar
        sx={{
          justifyContent: 'center',
        }}
        component="nav"
        color="inherit"
        position="fixed"
      >
        <Box>
          <Toolbar
            sx={{
              minHeight: '40px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            {isMobile ? (
              <Grid container direction="column" width="100%">
                <Grid item container sx={{ borderBottom: '1px solid #ccc' }}>
                  <Grid item>
                    <Button onClick={redirectTo}>
                      <Typography variant="h8">CareConnect</Typography>
                      <HomeWorkTwoToneIcon />
                    </Button>
                  </Grid>
                  <Grid sx={{ flexGrow: 1 }}></Grid>
                  <Grid item>
                    <UserMenu isLoggedIn={true} user={user} onLogout={Logout} />
                  </Grid>
                </Grid>
                <Grid item>
                  <PatientNavigation />
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid>
                  <Button onClick={redirectTo}>
                    <Typography variant="h8">CareConnect</Typography>
                    <HomeWorkTwoToneIcon />
                  </Button>
                </Grid>
                <Grid sx={{ flexGrow: 1 }}>
                  <PatientNavigation />
                </Grid>
                <Grid>
                  <UserMenu isLoggedIn={true} user={user} onLogout={Logout} />
                </Grid>
              </>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </Slide>
  );
}
