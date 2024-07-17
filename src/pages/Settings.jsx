import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import Layout from "../components/Layout";

export default function Settings() {
  const [language, setLanguage] = React.useState("");
  const [notification, setNotification] = React.useState("");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleNotificationChange = (event) => {
    setNotification(event.target.value);
  };

  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ p: 5 }}>
          <Typography
            color="#201d61"
            variant="h4"
            fontWeight={600}
            gutterBottom
          >
            Settings
          </Typography>

          <Divider sx={{ marginBottom: 2 }} />

          <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Spanish"}>Spanish</MenuItem>
                <MenuItem value={"French"}>French</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="notification-select-label">
                Notification
              </InputLabel>
              <Select
                labelId="notification-select-label"
                id="notification-select"
                value={notification}
                label="Notification"
                onChange={handleNotificationChange}
              >
                <MenuItem value={"Enabled"}>Enabled</MenuItem>
                <MenuItem value={"Disabled"}>Disabled</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />

            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}
