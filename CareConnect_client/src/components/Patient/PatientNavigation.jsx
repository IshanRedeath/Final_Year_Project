import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import ScienceTwoToneIcon from "@mui/icons-material/ScienceTwoTone";
import HealingTwoToneIcon from "@mui/icons-material/HealingTwoTone";
import { useLocation, useNavigate } from "react-router-dom";
import { Toolbar } from "@mui/material";

const iconProps = { fontSize: { xs: 35, md: 45 } };

const navItems = [
  {
    name: "Visits",
    icon: <PendingActionsTwoToneIcon sx={{ ...iconProps }} />,
    value: "visits",
  },
  {
    name: "Messages",
    icon: <MailTwoToneIcon sx={{ ...iconProps }} />,
    value: "messages",
  },
  {
    name: "Test Results",
    icon: <ScienceTwoToneIcon sx={{ ...iconProps }} />,
    value: "test-results",
  },
  {
    name: "Medication",
    icon: <HealingTwoToneIcon sx={{ ...iconProps }} />,
    value: "medication",
  },
];

//Mobile layout
const MobileNavigation = () => {
  const [value, setValue] = React.useState("");
  const location = useLocation(); //returns current URL

  const navigate = useNavigate();
  useEffect(() => {
    const pathName = location.pathname.split("/")[2];

    const validPaths = ["messages", "visits", "medication", "test-results"];

    if (validPaths.includes(pathName)) {
      setValue(pathName);
    }
  }, [location]); // Check weather pathname is within the four Navigation Items if so the active value set to that path onMount

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  }; //On user navigation change the the page will route to that relavant route

  return (
    <Box
      sx={{
        py: "20px", // vertical padding
        width: "100%",
        position: "fixed",
        bottom: 0, // Set to 0 to align with the screen's bottom edge
        left: 0,
        // Ensures it appears on top of other elements
        boxShadow: 3,
      }}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        {navItems.map((item, index) => (
          <BottomNavigationAction
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

//Desktop layout
const DesktopNavigation = () => {
  const [value, setValue] = React.useState("");
  const location = useLocation(); //returns current URL

  const navigate = useNavigate();
  useEffect(() => {
    const pathName = location.pathname.split("/").at(-1); //change This as app routers are defined as(.split('/').[2])

    // const validPaths = ["messages", "visits", "medication", "test-results"];
    // if (validPaths.includes(pathName)) {
    //   setValue(pathName);
    // } else {
    //   setValue("");
    // }
    setValue(pathName);
  }, [location]); // Check weather pathname is within the four Navigation Items if so the active value set to that path onMount

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/patient-dashboard/${newValue}`);
  }; //On user navigation change the the page will route to that relavant route

  return (
    <Box sx={{ mt: { xs: "56px", sm: "64px" }, mb: 13 }}>
      <CssBaseline />
      <AppBar
        component="nav"
        color="inherit"
        sx={{ py: "10px", top: 60 }}
        position="fixed"
      >
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.name}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </AppBar>
    </Box>
  );
};

export default function PatientNavigation() {
  const isMobile = useMediaQuery("only screen and (max-width : 550px)");

  return <>{isMobile ? <MobileNavigation /> : <DesktopNavigation />}</>;
}

// const DesktopNavigation = () => {
//     return (
//       <Box>
//         <CssBaseline />

//         <AppBar component="nav" color="inherit">
//           <Toolbar>
//             {navItems.map((item, index) => (
//               <Button
//                 key={index}
//                 component={NavLink}
//                 to={`/${item.value}`}
//                 sx={{
//                   mr: 2,
//                   textDecoration: "none",
//                   color: "grey",
//                   "&.active": {
//                     backgroundColor: (theme) => theme.palette.action.selected,
//                     color: "blue",
//                   },
//                 }}
//               >
//                 {item.name}
//                 <IconButton sx={{ color: "inherit" }}>{item.icon}</IconButton>
//               </Button>
//             ))}
//           </Toolbar>
//         </AppBar>
//       </Box>
//     );
//   };
