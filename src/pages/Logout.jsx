// import React from "react";
// import { Box, Toolbar } from "@mui/material";
// import toast from "react-hot-toast";


// export default function Logout() {
//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("userId");
//     toast.success("Logged out successfully");
//     window.location.replace("https://plazer-6aada.web.app/");
//     handleMenuClose();
//     // Add your logout logic here
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);


//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };


//   return (
//     <Box sx={{ display: "flex" }}>
     
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
//       >
//         <Toolbar />

//         {/* <Button variant="contained" color="primary" onClick={handleLogout}>
//           Logout
//         </Button> */}
//       </Box>
//     </Box>
//   );
// }
