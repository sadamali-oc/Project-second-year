// Import necessary components from Material-UI
import React from "react";
import Sidebar from "../../Sidebar"; 
import Box from "@mui/material/Box"; 
import { Typography } from "@mui/material"; 
import Toolbar from "@mui/material/Toolbar"; 
import AppBar from "@mui/material/AppBar"; 
import OrganizationT from "./OrganizationsTable"; 

const drawerWidth = 240; // Define the width of the sidebar

export default function Organization() {
  return (
    <div>
      {/* AppBar for the page */}
      <AppBar
        position="static"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`, // Adjust width to accommodate the sidebar
          ml: `${drawerWidth}px`, // Push content to the right to avoid overlap with the sidebar
          background: "#063970", // Change the background color of the app bar
        }}
      >
        {/* Toolbar within the app bar */}
        <Toolbar>
          {/* Typography component for the title */}
          <Typography variant="h5" noWrap component={"div"}>
            Organizations
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Box component for layout */}
      <Box sx={{ display: "grid", gridTemplateColumns: `${drawerWidth}px auto` }}>
        {/* Sidebar component */}
        <Sidebar />

        {/* Main content area */}
        <Box component="main" sx={{ bgcolor: "background.default", p: 3, pt: 1 }}>
          <Toolbar /> 
          <Typography paragraph>
            <OrganizationT />
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
