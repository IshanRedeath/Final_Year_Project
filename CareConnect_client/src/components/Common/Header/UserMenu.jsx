import React from "react";
import {
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, NavLink } from "react-router-dom";

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
      <Tooltip title="Notifications">
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>{" "}
      <Grid sx={{ display: { xs: "none", md: "inline-flex" }, mx: 3 }}>
        <Button onClick={onLogout}>
          Logout <LogoutIcon fontSize="medium" sx={{ pt: 0.5 }} />
        </Button>
      </Grid>
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar alt={user.name} src={user.profilePic} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={onLogout}
          sx={{ display: { sm: "block", md: "none" } }}
        >
          <LogoutIcon fontSize="small" />
          &nbsp; Logout
        </MenuItem>
        <MenuItem>Hello</MenuItem>
      </Menu>
    </div>
  ) : (
    <Button color="inherit">Login</Button>
  );
};

export default UserMenu;
