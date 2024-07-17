import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import ProfileformT from "./ProfileUpdateForm"; // Importing the profile update form component
import Layout from "../../components/Layout"; // Importing the layout component

const drawerWidth = 150; // Define the width of the drawer/sidebar

export default function UpdateProfile() {
  return (

    <Layout>
      <Box sx={{ display: "flex" }}>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >

          
        </Box>

        {/* Main content area */}
       
          <Toolbar />
          {/* Rendering the profile update form */}
          <Paper
            sx={{
              padding: 3,
              display: "flex",
             
             
              width: "100%", // Adjust width as needed
              maxWidth: "100%", // Adjust max-width as needed
              border: "4px solid #1976d2",
              marginLeft: "auto", 
            }}
          >
            <ProfileformT />
          </Paper>
        </Box>
   
    </Layout>
  );
}
