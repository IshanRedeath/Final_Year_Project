import React, { useState } from 'react';
import services from '../../../../../data/servicesData.json';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Divider, styled } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

//Visits types select grids view
function SelectVisitType() {
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {services.map((service) => {
          return (
            <Grid item key={service.serviceId} size={{ xs: 6, md: 6, lg: 4 }}>
              <Grow in={true} timeout={1000}>
                <Tooltip title={service.description} placement="bottom">
                  <Card sx={{ borderRadius: 5, maxHeight: 170 }}>
                    <CardActionArea>
                      <CardMedia component={'img'} image={service.imagePath} alt={service.name} height={130} />
                      <CardContent
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 1,
                        }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {service.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Tooltip>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

const doctors = [
  { label: 'Dr. John Doe', id: 1 },
  { label: 'Dr. Jane Smith', id: 2 },
  { label: 'Dr. Emily Davis', id: 3 },
  { label: 'Dr. Michael Brown', id: 4 },
];

const specialties = [
  { label: 'Cardiology', id: 1 },
  { label: 'Dermatology', id: 2 },
  { label: 'Neurology', id: 3 },
  { label: 'Pediatrics', id: 4 },
];
// Search form starts
function SearchDoctor({ closeFunction }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Doctor:', selectedDoctor);
    console.log('Selected Specialty:', selectedSpecialty);
    console.log('Selected Date:', selectedDate);
  };
  return (
    <Grid container spacing={2}>
      <Grid item size="grow">
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%',
            padding: 2,
            margin: 'auto',
            borderRight: '1px solid #ccc',
          }}
        >
          {/* Autocomplete for Searching Doctor */}
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => option.label}
            value={selectedDoctor}
            onChange={(event, newValue) => setSelectedDoctor(newValue)}
            renderInput={(params) => <TextField {...params} label="Search Doctor" variant="outlined" />}
          />

          {/* Autocomplete for Specialties */}
          <Autocomplete
            options={specialties}
            //getOptionLabel={(option) => option.label}
            value={selectedSpecialty}
            onChange={(event, newValue) => setSelectedSpecialty(newValue)}
            renderInput={(params) => <TextField {...params} label="Search Specialty" variant="outlined" />}
          />

          {/* Date Picker */}
          <TextField
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" onClick={closeFunction}>
            Search
          </Button>
        </Box>
        <SelectVisitType />
      </Grid>
    </Grid>
  );
}
const drawerWidth = 300;
export default function AvailabilityCheckLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <Grid container spacing={2}>
      {/* Serach Heading component start */}
      <Grid
        item
        size={{ xs: 12 }}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10, // Ensure it stays above other content if needed
          backgroundColor: 'white', // Prevent content overlap
          borderBottom: '1px solid #ddd', // Optional styling
        }}
      >
        <CssBaseline />

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Select Visit Type Or search a doctor
          </Typography>
        </Toolbar>
      </Grid>
      {/* End */}

      {/* Mobile search form view start */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { md: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'relative',
          },
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ maxWidth: 45, mt: 1 }}>
          <CloseRoundedIcon />
        </IconButton>
        <SearchDoctor closeFunction={handleDrawerClose} />
      </Drawer>
      {/* Mobile view Ends */}

      {/* Desktop search form view Start */}
      <Grid
        item
        size={{ lg: 3 }}
        sx={{
          display: { xs: 'none', lg: 'block' },
          height: '80vh',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: 5,
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 2,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        <SearchDoctor />
      </Grid>
      {/* Ends */}

      {/* Main Section Starts */}
      <Grid
        item
        size={{ lg: 9 }}
        sx={{
          overflowX: { xs: 'none', lg: 'auto' },
          height: { xs: 'auto', lg: '100vh' },
        }}
      >
        <SelectVisitType /> <SelectVisitType /> <SelectVisitType /> <SelectVisitType /> <SelectVisitType />
      </Grid>
      {/* Section Ends */}
    </Grid>
  );
}
