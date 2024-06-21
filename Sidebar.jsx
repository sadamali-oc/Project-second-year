import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LogoutIcon from "@mui/icons-material/Logout";

// Define the width of the drawer
const drawerWidth = 240;

// Sidebar component containing navigation links
export default function Sidebar() {
  const navigate = useNavigate();

  // Navigation functions for each link
  const navigateToDashboard = () => {
    navigate("/");
  };

  const navigateToUsers = () => {
    navigate("/users");
  };

  const navigateToOrganization = () => {
    navigate("/organization");
  };

  const navigateToMyprofile = () => {
    navigate("/profile");
  };

  const navigateToLogout = () => {
    navigate("/logout");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Apply baseline styles */}
      <CssBaseline />
      {/* App bar for top navigation */}
      <AppBar
        position="fixed"
        sx={{
          // Calculate width excluding drawer
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`, // Push content to the right of drawer
          background: "#063970", // Set background color
        }}
      ></AppBar>
      {/* Drawer for sidebar navigation */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#063970", // Set background color
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        {/* List of navigation items */}
        <List sx={{ color: "#fff" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToDashboard}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Organization Details" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToMyprofile}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="MyProfile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToOrganization}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <CorporateFareIcon />
              </ListItemIcon>
              <ListItemText primary="Organization" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToUsers}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToLogout}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* Main content area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>{/* Your main content here */}</Typography>
      </Box>
    </Box>
  );
}
