import React from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import Divider from "@mui/material/Divider";

export default function ProfileMenu() {
  const userId = 18;
  const [user, setUser] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userId) {
      window.location.replace("https://plazer-6aada.web.app/");
    }

    axios
      .get(
        `https://plazer-backend-production.up.railway.app/plazer-user/${userId}`
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
    navigate("/MyProfile");
  };

  // const handleLogout = () => {
  //   handleMenuClose();
  //   // Add your logout logic here
  // };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    toast.success("Logged out successfully");
    window.location.replace("https://plazer-6aada.web.app/");
    handleMenuClose();
    // Add your logout logic here
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <Avatar src={user.image} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewProfile}>
          <AccountCircleIcon sx={{ mr: 2 }} />
          View Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/Settings");
          }}
        >
          <SettingsIcon sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/TermsAndCond");
          }}
        >
          <DescriptionIcon sx={{ mr: 2 }} />
          Terms & Conditions
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "red" }} onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
