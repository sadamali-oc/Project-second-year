// import React from "react";
// import Sidebar from "../Sidebar"; // Importing the Sidebar component
// import Box from "@mui/material/Box";
// import { Typography, Toolbar, Table} from "@mui/material"; // Importing necessary MUI components

// export default function Logout() {

 
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar /> {/* Sidebar component */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
//       >
//         <Toolbar />
//         <Typography variant="h3" paragraph>
//           Logout
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Logout from the plazer app
//         </Typography>
//         <Table>
//           <tr>
//             <td>
//             </td>
//           </tr>
//           <tr>
//             <td>
//             </td>
//           </tr>
//           <tr>
//             <td>
            
//             </td>
//           </tr>
//         </Table>
//       </Box>
//     </Box>
//   );
// }



// //////////////////////////
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Avatar from "@mui/joy/Avatar";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// // Avatar component for displaying user's image
// function BasicAvatars() {
//   return (
//     <Box sx={{ display: "flex", gap: 2 }}>
//       <Avatar alt="" src="" />
//     </Box>
//   );
// }

// // Date picker component
// function ResponsiveDatePickers() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DatePicker"]}>
//         <DemoItem>
//           <DatePicker defaultValue={dayjs("2024-12-12")} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
// // Create a custom color palette for buttons

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "rgb(0, 121, 107)", // green color for UPDATE button
//     },
//     error: {
//       main: "rgb(255, 99, 71)", // redcolor for CANCEL button
//     },
//   },
// });

// // Button component for UPDATE and CANCEL actions
// function UpdateCancel() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Stack direction="row" spacing={2}>
//         <Button variant="contained" color="primary"
        
//         onClick={updatData}
//         >
//           UPDATE
//         </Button>
//         <Button variant="outlined" color="error">
//           CANCEL
//         </Button>
//       </Stack>
//     </ThemeProvider>
//   );
// }

// // Styled Paper component for styling
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// export default function FormPropsTextFields() {
//   const [userDetails, setUserDetails] = useState(null);

//   // Fetch user details from API

//   useEffect(() => {
//     fetch("http://localhost:3003/users/16", {
//    // method: "POST",
//     })
//       .then((response) => response.json())
//       .then((data) => setUserDetails(data))
//       .catch((error) => console.error("Error fetching user details:", error));
//   }, []);

//   // If user details are not yet loaded, return an empty div
//   if (!userDetails) {
//     return <div></div>;
//   }

//   return (
//     <form>
//       <Box
//         component="form"
//         sx={{
//           "& .MuiTextField-root": {
//             m: 1,
//             width: "50ch",
//             marginTop: 0,
//             paddingTop: 1,
//           },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             "& > :not(style)": { m: 1 },
//           }}
//         >
//           <Box sx={{ width: "100%" }}>
//             <Grid
//               container
//               rowSpacing={1}
//               columnSpacing={{ xs: 1, sm: 4, md: 3 }}
//             >
//               <Grid item xs={80}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <BasicAvatars sx={{ fontSize: 40 }} />
//                 </Box>
//                 <Stack spacing={1}></Stack>
//                 <Item>
//                   <TextField
//                     required
//                     helperText="Please enter your name"
//                     id="demo-helper-text-aligned"
//                     label="FirstName"
//                     value={userDetails.first_name}
//                     onChange={(e)=>setUserDetails(e.target.value)}
//                   />
//                   <TextField
//                     helperText=" "
//                     id="name"
//                     label="LastName"
//                     value={userDetails.last_name}
//                   />
//                   <TextField
//                     required
//                     helperText="Please enter the address"
//                     id="address"
//                     label="Address"
//                     value={userDetails.address}
//                   />
//                   <TextField
//                     helperText=" "
//                     id="company name"
//                     label="Organization Name"
//                     value={userDetails.last_name}
//                     disabled
//                   />
//                   <TextField
//                     required
//                     helperText="Please enter the personal mail address"
//                     id="demo-helper-text-aligned-no-helper"
//                     label="Email"
//                     value={userDetails.email}
//                   />
//                   <TextField
//                     required
//                     helperText="Please enter the personal organization address"
//                     id="demo-helper-text-aligned-no-helper"
//                     label="Email"
//                     value={userDetails.email}
//                   />
//                   <TextField
//                     helperText=" "
//                     id="demo-helper-text-aligned-no-helper"
//                     label="GitHub Profile link"
//                     value={userDetails.gitlink}
//                   />
//                   <TextField
//                     helperText=" "
//                     id="demo-helper-text-aligned-no-helper"
//                     label="Skills"
//                     value={userDetails.skills}
//                   />
//                   <TextField
//                     id="outlined-password-input"
//                     label="Password"
//                     type="password"
//                     autoComplete="current-password"
//                     value={userDetails.password}
//                   />
//                   <TextField
//                     id="outlined-password-input"
//                     label="Password"
//                     type="password"
//                     autoComplete="current-password"
//                   />
//                   <TextField
//                     id="outlined-number"
//                     label="Mobile Phone"
//                     type="number"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     value={userDetails.mobileno}
//                   />
//                   <TextField
//                     id="outlined-number"
//                     label="Work phone"
//                     type="number"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     value={userDetails.workno}
//                   />
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       paddingRight: 10,
//                     }}
//                   >
//                     <ResponsiveDatePickers />
//                   </Box>

//                   {/* Other TextField components for user details */}
//                 </Item>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <UpdateCancel />
//       </Box>
//     </form>
//   );
// }

