import React from "react";
import Sidebar from "../Sidebar"; // Importing the Sidebar component
import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";
// import Toolbar from "@mui/material/Toolbar";
import CompanyDetails from "./organizations/OrganizationDetails"; // Importing the CompanyDetails component

export default function Dashboard() {
  return (
    <div>
      {/* Sidebar and CompanyDetails components */}
      <Box sx={{ display: "flex" }}>
        <Sidebar /> {/* Sidebar component */}
        {/* Uncomment below to add additional content */}
        {/* <h1>Dashboard</h1>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>Plazer main dashboard</Typography>
        </Box> */}
        <CompanyDetails /> {/* CompanyDetails component */}
      </Box>
    </div>
  );
}
