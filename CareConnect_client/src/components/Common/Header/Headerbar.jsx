import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import IconButton from "@mui/material/IconButton";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
export default function Headerbar() {
  const user = { name: "Ishan", role: "patient" };

  const navigate = useNavigate();
  const Logout = () => {
    console.log("user Loggoed out");
    //Replace logout logic
    navigate("/login");
  };

  const redirectTo = () => {
    if (user) {
      navigate(`/${user.role}-dashboard`);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Box>
        <CssBaseline />

        <AppBar
          component="nav"
          color="inherit"
          sx={{
            top: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
            backdropFilter: "blur(10px)", // Blur effect
            boxShadow:
              "0px 4px 20px rgba(0, 0, 0, 0.2), 0px 6px 25px rgba(0, 0, 0, 0.15)", // Remove shadow if you want a cleaner look
          }}
        >
          <Toolbar>
            <Grid>
              <Button onClick={redirectTo}>
                <Typography variant="h6">CareConnect</Typography>
                <HomeWorkTwoToneIcon />
              </Button>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}></Grid>
            <Grid>
              <UserMenu isLoggedIn={true} user={user} onLogout={Logout} />
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
