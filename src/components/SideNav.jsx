import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useLocation } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import plazer_logo from "../assets/images/plazer_logo.png";
// import plazer_name from "../assets/images/plazer_name.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 280;

export default function SideNav({ mobileOpen, handleDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", display: "flex" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imageuploaddb-d99cf.appspot.com/o/plazer_img%2Fplazer_logo.png?alt=media&token=897b2574-06c6-4db0-a20e-949f1cb54c9e"
            alt="Plazer Logo"
            style={{
              width: "43px",
              height: "43px",
              marginLeft: "29px",
              marginRight: "auto",
              display: "block",
              marginTop: "-45px",
            }}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/imageuploaddb-d99cf.appspot.com/o/plazer_img%2Fplazer_name.png?alt=media&token=1820b564-db98-4b46-bbe6-7df660702db5"
            alt="Plazer Name"
            style={{
              width: "150px",
              height: "46px",
              marginLeft: "-15px",
              marginRight: "auto",
              display: "block",
              marginTop: "-45px",
            }}
          />
        </Box>
      </div>
      <List
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100% - 80px)", // Adjusting for the margin and padding
          overflow: "hidden",
        }}
      >
        <div>
          <ListItemButton
            disableRipple
            style={{
              paddingLeft: "25px",
              color: location.pathname === "/Dashboard" ? "#061b40" : "white",
            }}
            onClick={() => navigate("/Dashboard")}
          >
            <ListItemIcon style={{ color: "white" }}>
              <SpaceDashboardIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton>

          <ListItemButton
            disableRipple
            style={{
              paddingLeft: "25px",
              backgroundColor:
                location.pathname === "/MyProfile" ? "#061b40" : "transparent",
            }}
            onClick={() => navigate("/MyProfile")}
          >
            <ListItemIcon style={{ color: "white" }}>
              <PersonIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="My Profile"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton>

          <ListItemButton
            disableRipple
            style={{
              paddingLeft: "25px",
              backgroundColor:
                location.pathname === "/Organization"
                  ? "#061b40"
                  : "transparent",
            }}
            onClick={() => navigate("/Organization")}
          >
            <ListItemIcon style={{ color: "white" }}>
              <CorporateFareIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="Organization"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton>

          <ListItemButton
            disableRipple
            style={{
              paddingLeft: "25px",
              backgroundColor:
                location.pathname === "/Users" ? "#061b40" : "transparent",
            }}
            onClick={() => navigate("/Users")}
          >
            <ListItemIcon style={{ color: "white" }}>
              <GroupIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="Users"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton>

          <ListItemButton
            disableRipple
            style={{
              paddingLeft: "25px",
              backgroundColor:
                location.pathname === "/TermsAndCond"
                  ? "#061b40"
                  : "transparent",
            }}
            onClick={() => navigate("/TermsAndCond")} //navigate to terms and conditions page
          >
            <ListItemIcon style={{ color: "white" }}>
              <DescriptionIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="Terms and Conditions"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton>
        </div>

        <div>
          <ListItemButton
            disableRipple
            style={{
              paddingLeft: "25px",
              paddingBottom:"20px",
              backgroundColor:
                location.pathname === "/Settings" ? "#061b40" : "transparent",
            }}
            onClick={() => navigate("/Settings")} //navigate to settings page
          >
            <ListItemIcon style={{ color: "white" }}>
              <SettingsIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton>

          {/* <ListItemButton
            disableRipple
            style={{ paddingLeft: "25px" }}
            onClick={() => navigate("/Logout")} //navigate to logout page
          >
            <ListItemIcon style={{ color: "white" }}>
              <LogoutIcon style={{ fontSize: "30" }} />
            </ListItemIcon>
            <ListItemText
              primary="Log out"
              primaryTypographyProps={{
                style: {
                  color: "white",
                  fontSize: "18px",
                },
              }}
            />
          </ListItemButton> */}
        </div>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1F2F46",
            color: "#FFFFFF",
            marginTop: theme.spacing(8), // Adjust this value based on the AppBar height
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
