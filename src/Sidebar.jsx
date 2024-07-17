
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// // import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { useNavigate, useLocation } from "react-router-dom";
// import GroupIcon from "@mui/icons-material/Group";
// import CorporateFareIcon from "@mui/icons-material/CorporateFare";
// import LogoutIcon from "@mui/icons-material/Logout";
// import plazer_logo from "./assets/plazer_logo.png";
// import plazer_name from "./assets/plazer_name.png";
// import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import DescriptionIcon from "@mui/icons-material/Description";
// import SettingsIcon from "@mui/icons-material/Settings";

// // Define the width of the drawer
// const drawerWidth = 280;

// // Sidebar component containing navigation links
// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Apply baseline styles */}
//       <CssBaseline />

      

//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: "rgb(22, 64, 122)",
//             //#023781 , #0077b6, #1167b1
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             src={plazer_logo}
//             alt="Plazer Logo"
//             style={{
//               width: "43px",
//               height: "43px",
//               marginLeft: "29px",
//               marginRight: "auto",
//               display: "block",
//               marginTop: "-45px",
//             }}
//           />

//           <img
//             src={plazer_name}
//             alt="Plazer Name"
//             style={{
//               width: "150px",
//               height: "46px",
//               marginLeft: "-15px",
//               marginRight: "auto",
//               display: "block",
//               marginTop: "-45px",
//             }}
//           />
//         </div>
//         {/* 
//         <Divider /> */}
//         {/* List of navigation items */}

//         <List
//           style={{
//             marginTop: "40px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             height: "100%",
//             overflow: "hidden",
//           }}
//         >
//           <div>
//             <ListItemButton
//               disableRipple
//               style={{
//                 paddingLeft: "25px",
//                 backgroundColor:
//                   location.pathname === "/Dasboard" ? "#A8FFF3" : "transparent",
//               }}
//               onClick={() => navigate("/Dashboard")} //navigate to overview page
//             >
//               <ListItemIcon style={{ color: "white" }}>
//                 <SpaceDashboardIcon style={{ fontSize: "30" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Dashboard"
//                 primaryTypographyProps={{
//                   style: {
//                     color: "white",
//                     fontSize: "18px",
//                   },
//                 }}
//               />
//             </ListItemButton>
//             <ListItemButton
//               disableRipple
//               style={{
//                 paddingLeft: "25px",
//                 backgroundColor:
//                   location.pathname === "/MyProfile"
//                     ? "#A8FFF3"
//                     : "transparent",
//               }}
//               onClick={() => navigate("/profile")} //navigate to my profile page
//             >
//               <ListItemIcon style={{ color: "white" }}>
//                 <PersonIcon style={{ fontSize: "30" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="My Profile"
//                 primaryTypographyProps={{
//                   style: {
//                     color: "white",
//                     fontSize: "18px",
//                   },
//                 }}
//               />
//             </ListItemButton>

//             <ListItemButton
//               disableRipple
//               style={{
//                 paddingLeft: "25px",
//                 backgroundColor:
//                   location.pathname === "/Organization"
//                     ? "#A8FFF3"
//                     : "transparent",
//               }}
//               onClick={() => navigate("/Organization")}
//             >
//               <ListItemIcon style={{ color: "white" }}>
//                 <CorporateFareIcon style={{ fontSize: "30" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Organization"
//                 primaryTypographyProps={{
//                   style: {
//                     color: "white",
//                     fontSize: "18px",
//                   },
//                 }}
//               />
//             </ListItemButton>

//             <ListItemButton
//               disableRipple
//               style={{
//                 paddingLeft: "25px",
//                 backgroundColor:
//                   location.pathname === "/Users" ? "#A8FFF3" : "transparent",
//               }}
//               onClick={() => navigate("/Users")}
//             >
//               <ListItemIcon style={{ color: "white" }}>
//                 <GroupIcon style={{ fontSize: "30" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Users"
//                 primaryTypographyProps={{
//                   style: {
//                     color: "white",
//                     fontSize: "18px",
//                   },
//                 }}
//               />
//             </ListItemButton>

//             <ListItemButton
//               disableRipple
//               style={{
//                 paddingLeft: "25px",
//                 backgroundColor:
//                   location.pathname === "/TermsConditions"
//                     ? "#A8FFF3"
//                     : "transparent",
//               }}
//               onClick={() => navigate("/TermsConditions")} //navigate to terms and conditions page
//             >
//               <ListItemIcon style={{ color: "white" }}>
//                 <DescriptionIcon style={{ fontSize: "30" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Terms and Conditions"
//                 primaryTypographyProps={{
//                   style: {
//                     color: "white",
//                     fontSize: "18px",
//                   },
//                 }}
//               />
//             </ListItemButton>
//             <ListItemButton
//               disableRipple
//               style={{
//                 paddingLeft: "25px",
//                 backgroundColor:
//                   location.pathname === "/Settings" ? "#A8FFF3" : "transparent",
//               }}
//               onClick={() => navigate("/Settings")} //navigate to settings page
//             >
//               <ListItemIcon style={{ color: "white" }}>
//                 <SettingsIcon style={{ fontSize: "30" }} />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Settings"
//                 primaryTypographyProps={{
//                   style: {
//                     color: "white",
//                     fontSize: "18px",
//                   },
//                 }}
//               />
//             </ListItemButton>
//           </div>
//           <ListItemButton
//             disableRipple
//             style={{
//               paddingLeft: "25px",
//               backgroundColor:
//                 location.pathname === "/Logout" ? "#A8FFF3" : "transparent",
//               position: "absolute",
//               bottom: "30px",
//               width: "inherit",
//             }}
//             onClick={() => navigate("/Logout")} //navigate to logout page
//           >
//             <ListItemIcon style={{ color: "white" }}>
//               <LogoutIcon style={{ fontSize: "30" }} />
//             </ListItemIcon>
//             <ListItemText
//               primary="Logout"
//               primaryTypographyProps={{
//                 style: {
//                   color: "white",
//                   fontSize: "18px",
//                 },
//               }}
//             />
//           </ListItemButton>
//         </List>
//       </Drawer>

//       {/* Main content area */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
//       >
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// }
