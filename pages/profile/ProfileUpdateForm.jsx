import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import FirebaseImageUpload from "./FirebaseImageUpload/FirebaseImageUpload";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ResponsiveDatePickers from "../../components/ResponsiveDataPickers";
import UpdateCancel from "../../components/UpdateCancel";
import { Email as EmailIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputAdornment from "@mui/material/InputAdornment";

const FormContainer = styled("div")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
    margin: theme.spacing(1),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  background: "#FAFAFA",
  border: "#063970 20px solid",
  marginTop: 0,
  paddingTop: 5,
}));

export default function ProfileUpdateForm() {
  const [userDetails, setUserDetails] = useState({
    userFName: "",
    userLName: "",
    DOB: dayjs().format("YYYY-MM-DD"),
    Email: "",
    AddressL1: "",
    AddressL2: "",
    AddressL3: "",
    mobileno: "",
    organizations: "",
    gitlink: "",
    userPassword: "",
    skills: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3003/plazer-user/64")
      .then((res) => setUserDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
    if (name === "Email") {
      validateEmail(value);
    }
  };

  const updateUser = (event) => {
    event.preventDefault();
    axios
      .patch("http://localhost:3003/plazer-user/64", userDetails)
      .then((res) => console.log(res.data))
      .catch((error) => console.error("Error updating user details:", error));
  };

  // email validation
  const [error, setError] = useState("");
  const [email, setEmail] = useState(userDetails.Email);

  const validateEmail = (email) => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Invalid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };

  const [DOB, setDOB] = useState(dayjs(userDetails.DOB).format("YYYY-MM-DD"));
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setDOB(formattedDate);
    setUserDetails({ ...userDetails, DOB: formattedDate });
  };

  useEffect(() => {
    setDOB(dayjs(userDetails.DOB).format("YYYY-MM-DD"));
  }, [userDetails.DOB]);

  const navigate = useNavigate();

  const navigateToChangePassword = () => {
    navigate("/change-password");
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              height: "40px",
              fontSize: "12px",
              // Set the desired height here
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <form onSubmit={updateUser}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <FirebaseImageUpload value={userDetails.image} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  helperText="Please enter your first name"
                  id="userFName"
                  name="userFName"
                  label="First Name"
                  variant="outlined"
                  value={userDetails.userFName}
                  onChange={handleInputChange}
                  error={!userDetails.userFName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText="Please enter your last name"
                  id="userLName"
                  name="userLName"
                  label="Last Name"
                  variant="outlined"
                  value={userDetails.userLName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  helperText="Please enter your address"
                  id="AddressL1"
                  name="AddressL1"
                  label="Address 1"
                  variant="outlined"
                  value={userDetails.AddressL1}
                  onChange={handleInputChange}
                  error={!userDetails.AddressL1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  helperText="Please enter your address"
                  id="AddressL2"
                  name="AddressL2"
                  label="Address 2"
                  variant="outlined"
                  value={userDetails.AddressL2}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  helperText="Please enter your address"
                  id="AddressL3"
                  name="AddressL3"
                  label="Address 3"
                  variant="outlined"
                  value={userDetails.AddressL3}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ResponsiveDatePickers value={DOB} setDate={handleDateChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!error}
                  helperText={error}
                  id="Email"
                  name="Email"
                  label="Email"
                  variant="outlined"
                  value={email || userDetails.Email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="mobileno"
                  name="mobileno"
                  label="Mobile Phone"
                  type="number"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": { borderColor: "#063970" },
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={userDetails.mobileno}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  helperText="Please enter your organization"
                  id="organizations"
                  name="organizations"
                  label="Organization Name"
                  variant="outlined"
                  value={userDetails.organizations}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText="Please enter your GitHub profile link"
                  id="gitlink"
                  name="gitlink"
                  label="GitHub Profile Link"
                  variant="outlined"
                  value={userDetails.gitlink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box onClick={navigateToChangePassword}>
                  <TextField
                    id="userPassword"
                    name="userPassword"
                    label="Click here to change the password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={userDetails.userPassword}
                    onChange={handleInputChange}
                    disabled
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText="Please enter your skills"
                  id="skills"
                  name="skills"
                  label="Skills"
                  variant="outlined"
                  value={userDetails.skills}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <UpdateCancel />
              </Grid>
            </Grid>
          </Item>
        </form>
      </FormContainer>
    </ThemeProvider>
  );
}
