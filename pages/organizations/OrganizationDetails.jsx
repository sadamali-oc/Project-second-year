import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Paper,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const drawerWidth = 240;

export default function CompanyDetails() {
  // State to hold organization details
  const [orgDetails, setOrgDetails] = useState(null);
  const [buttonLabel1, setButtonLabel1] = useState("Enable");
  const [buttonLabel2, setButtonLabel2] = useState("Enable");

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleButtonClick1 = () => {
    const newLabel = buttonLabel1 === "Enable" ? "Disable" : "Enable";
    setButtonLabel1(newLabel);
    showSnackbar(newLabel === "Enable" ? "Project 1 enabled" : "Project 1 disabled", newLabel === "Enable" ? "success" : "error");
  };

  const handleButtonClick2 = () => {
    const newLabel = buttonLabel2 === "Enable" ? "Disable" : "Enable";
    setButtonLabel2(newLabel);
    showSnackbar(newLabel === "Enable" ? "Project 2 enabled" : "Project 2 disabled", newLabel === "Enable" ? "success" : "error");
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Fetch organization details on component mount
  useEffect(() => {
    fetch("http://localhost:3003/organization/6")
      .then((response) => response.json())
      .then((data) => setOrgDetails(data))
      .catch((error) =>
        console.error("Error fetching organization details:", error)
      );
  }, []);

  // If organization details are not loaded yet, return a loading indicator
  if (!orgDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* App bar for the page */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          background: "#063970",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Company Details
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Main container for the content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginTop: "64px", // Offset for the app bar
        }}
      >
        <Container>
          {/* Paper container for the form */}
          <Paper sx={{ p: 2, mt: 4, background: "#f5f5f5" }}>
            <Card sx={{ borderColor: "#063970" }}>
              <CardHeader
                title={`Organization Details of ${orgDetails.orgName}`}
                sx={{
                  background: "#1976d2",
                  textAlign: "center",
                  color: "#fff",
                }}
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  {[
                    { label: "Organization Name", value: orgDetails.orgName },
                    { label: "Address Line 1", value: orgDetails.orgAddressL1 },
                    { label: "Address Line 2", value: orgDetails.orgAddressL2 },
                    { label: "Address Line 3", value: orgDetails.orgAddressL3 },
                    { label: "Email", value: orgDetails.orgEmail },
                    { label: "Users Count", value: "34" },
                  ].map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {field.label}:
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={field.value}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{
                          background: "#fff",
                          "& .MuiInputBase-root": {
                            height: "35px",
                            padding: "0 8px",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
                {/* Project Header */}
                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    mb: 2,
                    textAlign: "center",
                    color: "#063970",
                  }}
                >
                  Project Details
                </Typography>
                <Grid container spacing={3}>
                  {[
                    {
                      label: "Project 1",
                      name: orgDetails.orgName,
                      buttonLabel: buttonLabel1,
                      handleButtonClick: handleButtonClick1,
                    },
                    {
                      label: "Project 2",
                      name: orgDetails.orgName,
                      buttonLabel: buttonLabel2,
                      handleButtonClick: handleButtonClick2,
                    },
                  ].map((project, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          p: 1,
                          border: "1px solid #063970",
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            color:
                              project.buttonLabel === "Enable" ? "inherit" : "red",
                          }}
                        >
                          {project.label}: {project.name}
                        </Typography>
                        <Button
                          variant="contained"
                          color={
                            project.buttonLabel === "Enable" ? "success" : "error"
                          }
                          onClick={project.handleButtonClick}
                        >
                          {project.buttonLabel}
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
