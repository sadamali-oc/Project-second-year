import React from "react";
import Sidebar from "../../Sidebar"; // Importing the Sidebar component
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import UsersT from "./UsersTable"; // Importing the UsersTable component

const drawerWidth = 240; // Define the width of the drawer/sidebar

export default function Organization() {
  return (
    <div>
      {/* Top app bar */}
      <AppBar
        position="fixed" // Keep position fixed for the app bar
        sx={{
          width: `calc(100% - ${drawerWidth}px)`, // Adjusting width to accommodate the sidebar
          ml: `${drawerWidth}px`, // Pushing content to the right to make space for the sidebar
          background: "#063970", // Setting the background color of the app bar
        }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Users
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
        >
          <Sidebar />
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >

          
          <Toolbar />
          {/* Rendering the UsersTable component */}
        
          <UsersT />
        </Box>
      </Box>
    </div>
  );
}
