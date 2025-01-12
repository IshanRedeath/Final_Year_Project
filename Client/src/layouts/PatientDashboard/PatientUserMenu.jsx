import React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

import Grid from '@mui/material/Grid2';

import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
//import { Link, NavLink } from "react-router-dom";

const UserMenu = ({ isLoggedIn, user, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return isLoggedIn ? (
    <div>
      <Grid
        container
        direction="row" // Ensure horizontal alignment
        alignItems="center" // Vertically center items
        justifyContent="space-between" // Spread items evenly
        spacing={2}
      >
        <Grid item>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge
                badgeContent={4}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: 9,
                    height: 14,
                    minWidth: 13,
                  },
                }}
              >
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>{' '}
        </Grid>
        <Grid item>
          <Tooltip title="Profile">
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt={user.name} src={user.profilePic} sx={{ width: 25, height: 25 }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={onLogout}>
            <LogoutIcon fontSize="small" />
            &nbsp; Logout
          </MenuItem>
          <MenuItem>Hello</MenuItem>
        </Menu>{' '}
      </Grid>
    </div>
  ) : (
    <Button color="inherit">Login</Button>
  );
};

export default UserMenu;
