import React from "react";
import ProfileMenu from "./ProfileMenu";
import SideNav from "./SideNav";
// import plazer_logo from "../assets/images/plazer_logo.png";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Layout({ children }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#1F2F46" }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageuploaddb-d99cf.appspot.com/o/plazer_img%2Fplazer_logo.png?alt=media&token=897b2574-06c6-4db0-a20e-949f1cb54c9e"
              alt="Plazer Logo"
              style={{
                width: "40px",
                height: "40px",
                marginRight: "16px",
              }}
            />
            <Typography variant="h5" fontWeight={600} noWrap component="div">
              Plazer Admin Portal
            </Typography>
          </Box>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Box sx={{ width: 280 }}>
          <SideNav
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
