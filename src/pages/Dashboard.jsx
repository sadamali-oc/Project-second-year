import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../components/Layout";
import axios from "axios";
import ProjectIcon from "@mui/icons-material/Assignment";
// import UserIcon from '@mui/icons-material/People';
import OrganizationIcon from "@mui/icons-material/Business";
import CountUp from "react-countup";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(null);
  // const [userCount, setUserCount] = useState(null);
  const [organizationCount, setOrganizationCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the counts from the API
    const fetchCounts = async () => {
      try {
        const projectsResponse = await axios.get(
          `https://plazer-backend-production.up.railway.app/mini-app/count`
        );
        console.log("Projects Response:", projectsResponse);
        // const usersResponse = await axios.get(`http://localhost:4000/orgAdmin/organization-count`);
        // console.log('Users Response:', usersResponse);
        const organizationsResponse = await axios.get(
          `https://plazer-backend-production.up.railway.app/orgAdmin/organization-count`
        );
        console.log("Organizations Response:", organizationsResponse);

        setProjectCount(projectsResponse.data.count);
        // setUserCount(usersResponse.data.count);
        setOrganizationCount(organizationsResponse.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            ml: 5, // Adjust this value to shift the content to the right
          }}
        >
          <Toolbar />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "top",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ProjectIcon
                    sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Project Count
                  </Typography>
                  <Typography variant="body1">
                    <CountUp
                      end={projectCount}
                      duration={2}
                      separator=","
                      easingFn={(t, b, c, d) => c * (t /= d) * t + b} // easeOutQuad function
                    />
                  </Typography>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <UserIcon sx={{ fontSize: 50, mb: 1, color: 'primary.main' }} />
                  <Typography variant="h6" gutterBottom>
                    User Count
                  </Typography>
                  <Typography variant="body1">
                    <CountUp end={userCount} duration={2} />
                  </Typography>
                </Paper>
              </Grid> */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <OrganizationIcon
                    sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Organization Count
                  </Typography>
                  <Typography variant="body1">
                    <CountUp
                      end={organizationCount}
                      duration={2}
                      separator=","
                      easingFn={(t, b, c, d) => c * (t /= d) * t + b} // easeOutQuad function
                    />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Layout>
  );
}
