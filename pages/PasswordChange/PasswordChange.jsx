import React, { useState } from "react";
import { Button, Typography, Grid, Paper, Box, IconButton, InputLabel, InputAdornment, FormControl, OutlinedInput, Snackbar, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordChange() {
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

  const handleClickShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    // Handle password change logic here
    console.log({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    // Show success Snackbar
    setSnackbarMessage("Password changed successfully");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box 
        sx={{ 
          border: '2px solid #1976d2', 
          borderRadius: 2, 
          p: 2, 
          width: '400px'
        }}
      >
        <Paper elevation={3} style={{ padding: 20 }}>
          <Box sx={{ background: '#1976d2', color: "#fff", p: 1, mb: 1 }}>  
            <Typography variant="h5" component="h2" gutterBottom align="center">
              Change Password
            </Typography>
          </Box>
        
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleChangePassword}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="current-password">Current Password</InputLabel>
                  <OutlinedInput
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle current password visibility"
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
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
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="confirm-new-password">Confirm New Password</InputLabel>
                  <OutlinedInput
                    id="confirm-new-password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm new password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm New Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
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
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PasswordChange;
