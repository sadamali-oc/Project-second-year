import React from "react";
import Sidebar from "../../Sidebar"; // Importing the sidebar component
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import ProfileformT from "./ProfileUpdateForm"; // Importing the profile update form component
// import { styled } from "@mui/material/styles";

const drawerWidth = 240; // Define the width of the drawer/sidebar

// const Items = styled(Paper)(({ theme }) => ({
//   margin:theme.spacing(5),
//   padding:theme.spacing(3)
// }));

export default function Organization() {

  

  return (
    <div>
      {/* Top app bar */}
      <AppBar
        position="static"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`, // Adjusting width to accommodate the sidebar
          ml: `${drawerWidth}px`, // Pushing content to the right to make space for the sidebar
          background: "#063970", // Setting the background color of the app bar
        }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap component={"div"}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Box
         sx={{ display: "grid", gridTemplateColumns: `${drawerWidth}px auto` }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box component="main" sx={{ bgcolor: "background.default", p: 4, marginTop: 0, paddingTop: 0 }}>
          <Toolbar />
          {/* Rendering the profile update form */}
          <Paper>
            <ProfileformT />
          </Paper>
         
          
        </Box>
      </Box>
    </div>
  );
}
