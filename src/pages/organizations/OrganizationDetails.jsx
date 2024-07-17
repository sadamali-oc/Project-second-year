import React, { useState, useEffect } from "react";
import {
  Typography,
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
  Switch,
  FormControlLabel,
  Zoom,
} from "@mui/material";
import { useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";
import GitIcon from "@mui/icons-material/GitHub";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";


export default function OrganizationDetails() {
  const { orgId } = useParams();
  // const apiUrl = process.env.BASE_URL;

  // State to hold organization details and apps
  const [orgDetails, setOrgDetails] = useState(null);
  const [orgApps, setOrgApps] = useState([]);
  const [userCount, setUserCount] = useState(0); // State for user count
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showProjects, setShowProjects] = useState(false); // State to control project visibility

  // Background colors array for project cards
  const backgroundColors = [
    "#f5f5f5",
    "#e0f7fa",
    "#fce4ec",
    "#f0f4c3",
    "#b2dfdb",
  ];

  useEffect(() => {
    // Function to fetch organization details
    const fetchOrganizationDetails = async () => {
      try {
        const response = await fetch(
          `https://plazer-backend-production.up.railway.app/orgAdmin/${orgId}/organization-details`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch organization details");
        }
        const data = await response.json();
        setOrgDetails(data);
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    };

    // Function to fetch organization apps
    const fetchOrganizationApps = async () => {
      try {
        const response = await fetch(
          `https://plazer-backend-production.up.railway.app/mini-app/all-apps/${orgId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch organization apps");
        }
        const data = await response.json();
        setOrgApps(data);
      } catch (error) {
        console.error("Error fetching organization apps:", error);
      }
    };

    // Function to fetch user count
    const fetchUserCount = async () => {
      try {
        const response = await fetch(
          `https://plazer-backend-production.up.railway.app/orgAdmin/total-users/${orgId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user count");
        }
        const data = await response.json();
        console.log("Fetched user count:", data); // Debugging log
        setUserCount(data.totalUsers);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchOrganizationDetails();
    fetchOrganizationApps();
    fetchUserCount();
  }, [orgId]);

  // Function to handle enabling or disabling an app
  const handleEnableDisableApp = (appId, currentStatus) => {
    // Toggle the status locally first
    const updatedApps = orgApps.map((app) =>
      app.appId === appId ? { ...app, active: !currentStatus } : app
    );
    setOrgApps(updatedApps);

    // Update the backend API with the new status
    fetch(`https://plazer-backend-production.up.railway.app/mini-app/${orgId}/${appId}/updateStatus`, {
      method: "PUT",
      body: JSON.stringify({ active: !currentStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update project status");
        }
        return response.json();
      })
      .then((data) => {
        // Optionally, update state again based on API response if needed
        // For example, if backend modifies data and returns updated status
        // setOrgApps(data.updatedApps);

        // Show success message in snackbar
        showSnackbar(
          !currentStatus
            ? "Project Enabled successfully"
            : "Project Disabled successfully",
          !currentStatus ? "success" : "error"
        );
      })
      .catch((error) => {
        console.error("Error enabling/disabling app:", error);
        // Rollback local state update on error if needed
        setOrgApps(orgApps); // Or revert to previous state handling

        // Show error message in snackbar
        showSnackbar("Failed to update project status", "error");
      });

    // Console logging for debugging
    console.log(`App ID: ${appId}`);
    console.log(`Current Status: ${currentStatus}`);
  };

  // Function to show snackbar with a message and severity
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Function to handle snackbar close event
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // If organization details are not loaded yet, return a loading indicator
  if (!orgDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
      >
        <Container maxWidth="md">
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
                <Grid container spacing={2}>
                  {[
                    { label: "Organization Name", value: orgDetails.orgName,icon: <BusinessIcon  sx={{ mr: 1 }} /> },
                    { label: "Address Line 1", value: orgDetails.orgAddressL1 },
                    { label: "Address Line 2", value: orgDetails.orgAddressL2 },
                    { label: "Address Line 3", value: orgDetails.orgAddressL3 },
                    { label: "Email", value: orgDetails.orgEmail,icon: <EmailIcon /> },
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
                        InputProps={{ readOnly: true }}
                        sx={{
                          background: "#fff",
                          "& .MuiInputBase-root": {
                            height: "35px",
                            padding: "0 8px",
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Users Count:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        background: "#fff",
                        height: "35px",
                        padding: "0 8px",
                        borderRadius: 1,
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                      }}
                    >
                      <PeopleIcon sx={{ mr: 1 }} />
                      <Typography>{userCount}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography
                  variant="h5"
                  sx={{
                    mt: 4,
                    mb: 2,
                    textAlign: "center",
                    color: "#063970",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1px", // Adding padding for better spacing
                  }}
                >
                  <AppsIcon sx={{ mr: 1 }} /> Projects of {orgDetails.orgName}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={showProjects}
                      onChange={() => setShowProjects(!showProjects)}
                      name="showProjects"
                      color="primary"
                    />
                  }
                  label="Show Projects"
                  sx={{ mt: 2, mb: 2, textAlign: "center", display: "block" }}
                />
                <Grid container spacing={2}>
                  {orgApps.map((app, index) => (
                    <Grid item xs={12} sm={6} key={app.appId}>
                      <Zoom in={showProjects}>
                        <Card
                          sx={{
                            borderColor: "#1976d2",
                            borderWidth: 2,
                            borderRadius: 2,
                            background:
                              backgroundColors[index % backgroundColors.length],
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: "bold",
                                color: "#1976d2",
                                mb: 1,
                              }}
                            >
                              {app.projectTitle}
                            </Typography>
                            <Divider />
                            <Typography
                              variant="body2"
                              sx={{ mt: 1, fontWeight: "bold" }}
                            >
                              Status: {app.projectStatus}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ mt: 1, fontWeight: "bold" }}
                            >
                              Category: {app.projectCategory}
                            </Typography>

                            <Typography variant="body2" sx={{ mt: 1 }}>
                              Description: {app.projectDescription}
                            </Typography>

                            <Grid item xs={6}>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  window.open(app.repoLink, "_blank");
                                }}
                                startIcon={<GitIcon />}
                                size="small"
                                sx={{ textTransform: "none", mt: 1 }}
                              >
                                Project Link
                              </Button>
                            </Grid>

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 2,
                              }}
                            >
                              <Button
                                variant="contained"
                                color={app.active ? "error" : "success"}
                                onClick={() =>
                                  handleEnableDisableApp(app.appId, app.active)
                                }
                              >
                                {app.active ? "Disable" : "Enable"}
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Container>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}

        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
