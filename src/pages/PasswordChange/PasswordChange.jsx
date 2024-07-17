import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useParams } from "react-router-dom";

function PasswordChange() {
  const { userId } = useParams();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClickShowPassword = (type) => () => {
    switch (type) {
      case "current":
        setShowCurrentPassword((prev) => !prev);
        break;
      case "new":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirm":
        setShowConfirmNewPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!userId) {
      setError("User ID is missing");
      return;
    }

    // Check for empty fields
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill out all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword === currentPassword) {
      setError("Your new password cannot be the same as the current password");
      return;
    }

    // Minimum constraint
    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    // Maximum constraint
    if (newPassword.length > 10) {
      setError("Password should be at most 10 characters");
      return;
    }

    // Validate password strength (optional)
    if (!isStrongPassword(newPassword)) {
      setError(
        "Password should contain at least 6 characters including numbers, lowercase, and uppercase letters"
      );
      return;
    }

    try {
      const response = await axios.patch(
        `https://plazer-backend-production.up.railway.app/plazer-user/${userId}/password`,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        }
      );
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Clear input fields after successful change
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  // Function to check password strength
  const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return strongRegex.test(password);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    // Reset password visibility states when closing Snackbar
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          border: "2px solid #1976d2",
          borderRadius: 2,
          p: 2,
          width: "400px",
        }}
      >
        <Paper elevation={3} style={{ padding: 20 }}>
          <Box sx={{ background: "#1976d2", color: "#fff", p: 1, mb: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              Change Password
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Please enter your current password and choose a new password that
              meets the following criteria:
            </Typography>
            <ul>
              <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
                <li>Between 6 and 10 characters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one uppercase letter</li>
                <li>Contains at least one lowercase letter</li>
              </Typography>
            </ul>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleChangePassword}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="current-password">
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle current password visibility"
                          onClick={handleClickShowPassword("current")}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showCurrentPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Current Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle new password visibility"
                          onClick={handleClickShowPassword("new")}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="confirm-new-password">
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirm-new-password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm new password visibility"
                          onClick={handleClickShowPassword("confirm")}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmNewPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm New Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PasswordChange;
