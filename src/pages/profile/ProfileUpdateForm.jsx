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
// import { RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
  // border: "#1976d2 1px solid",
  marginTop: 0,
  paddingTop: 5,
}));

export default function ProfileUpdateForm() {
  const userId = 18; // Define your ID here

  const [userDetails, setUserDetails] = useState({
    userFName: "",
    userLName: "",
    Email: "",
    AddressL1: "",
    AddressL2: "",
    AddressL3: "",
    skills: "",
    DoB: "",
    gender: "",
    userPassword: "",
    role: "",
    phone: "",
    active: true,
    image: "",
    gitlink: "",
  });

  const [orgDetails, setOrgDetails] = useState([]);
  const [, setSelectedOrgId] = useState("");
  const [selectedOrgDetails, setSelectedOrgDetails] = useState({
    orgName: "",
    location: "",
    orgAddressL1: "",
    orgAddressL2: "",
    orgAddressL3: "",
    orgEmail: "",
    WebsiteLink: "",
    orgDescription: "",
    active: true,
  });

  useEffect(() => {
    axios
      .get(
        `https://plazer-backend-production.up.railway.app/plazer-user/${userId}`
      )
      .then((res) => {
        console.log("User Details:", res.data);
        setUserDetails(res.data);
      })
      .catch((err) => console.log("Error fetching user details:", err));

    axios
      .get(
        `https://plazer-backend-production.up.railway.app/orgAdmin/user/${userId}`
      )
      .then((res) => {
        console.log("Org Details:", res.data);
        setOrgDetails(res.data);
        if (res.data.length > 0) {
          setSelectedOrgId(res.data[0].id);
          setSelectedOrgDetails(res.data[0]);
        }
      })
      .catch((err) => console.log("Error fetching org details:", err));
  }, [userId]);

  const handleOrgDetailsChange = (event) => {
    const newOrgNames = event.target.value
      .split("\n")
      .map((orgName) => ({ orgName }));
    setOrgDetails(newOrgNames);
  };

  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState(userDetails.Email);
  const [phoneError, setPhoneError] = useState("");
  const [userFNameError, setUserFNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false); // State for showing update success message
  const [openAlert, setOpenAlert] = useState(false); // State for controlling Snackbar alert

  const validateDoB = (date) => {
    if (!date.isValid()) {
      setDobError("Please select a valid date.");
      console.log("DoB Error:", "Please select a valid date.");

      return false;
    } else if (date.isAfter(dayjs())) {
      setDobError("Date of Birth cannot be in the future.");
      console.log("DoB Error:", "Date of Birth cannot be in the future.");

      return false;
    } else {
      setDobError("");
      return true;
    }
  };

  const validateUserFName = (userFName) => {
    const userFNameRegex = /^[a-zA-Z\s]+$/;
    if (!userFName) {
      setUserFNameError("Invalid user name. User name is required.");
      console.log(
        "UserFName Error:",
        "Invalid user name. User name is required."
      );

      return false;
    } else if (!userFNameRegex.test(userFName)) {
      setUserFNameError(
        "Invalid user name. Only letters and spaces are allowed."
      );
      console.log(
        "UserFName Error:",
        "Invalid user name. Only letters and spaces are allowed."
      );

      return false;
    } else {
      setUserFNameError("");
      return true;
    }
  };

  const validateEmail = (emailError) => {
    if (!emailError) {
      setEmailError("Email is required");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailError)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number. Must be 10 digits.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEmailError(value);
    setUserDetails({ ...userDetails, Email: value });
    validateEmail(value);
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setUserDetails({ ...userDetails, phone: value });
    validatePhone(value);
  };

  // Handler for Date of Birth change
  const handleDoBChange = (date) => {
    setUserDetails({
      ...userDetails,
      DoB: date.format("YYYY-MM-DD"), // Assuming DoB is stored as YYYY-MM-DD in userDetails
    });
    validateDoB(date); // Validate the entered date
  };

  // const handleDateChange = (date) => {
  //   setUserDetails({ ...userDetails, DoB: date.toISOString() }); // Ensure the DoB is in ISO 8601 format
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("org")) {
      setSelectedOrgDetails({ ...selectedOrgDetails, [name]: value });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
      if (name === "Email") {
        validateEmail(value);
      } else if (name === "userFName") {
        validateUserFName(value);
      }
    }
  };

  // const updateUser = (event) => {
  //   event.preventDefault();
  //   const formattedUserDetails = {
  //     ...userDetails,
  //     DoB: dayjs(userDetails.DoB).toISOString(), // Ensure the DoB is in ISO 8601 format
  //   };

  //   axios
  //     .put(
  //       `http://localhost:4000/plazer-user/update/${userId}`,
  //       formattedUserDetails
  //     )
  //     .then((response) => {
  //       console.log("User details updated successfully:", response.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error updating user details:", err);
  //       alert(
  //         `Failed to update user details: ${
  //           err.response?.data?.message || err.message
  //         }`
  //       );
  //     });
  // };

  const updateUser = (event) => {
    event.preventDefault();

    // Validate form inputs
    const isValidDoB = validateDoB(dayjs(userDetails.DoB));
    const isValidUserFName = validateUserFName(userDetails.userFName);
    const isValidEmail = validateEmail(userDetails.Email);
    const isValidPhone = validatePhone(userDetails.phone);

    if (isValidDoB && isValidUserFName && isValidEmail && isValidPhone) {
      // Format user details for update
      const formattedUserDetails = {
        ...userDetails,
        DoB: dayjs(userDetails.DoB).toISOString(), // Convert DoB to ISO string
      };

      // Send PUT request to update user details
      axios
        .put(
          `https://plazer-backend-production.up.railway.app/plazer-user/update/${userId}`,
          formattedUserDetails
        )
        .then((response) => {
          // alert("User details updated successfully:", response.data);

          console.log("User details updated successfully:", response.data);

          setUpdateSuccess(true);
          setError("");
          setOpenAlert(true);
          // Optionally, show a success message or perform additional actions
        })
        .catch((err) => {
          // alert(
          //   "Please fix the validationiu errors before submitting the form."
          // );

          console.error("Error updating user details:", err);

          setUpdateSuccess(true);
          setError("Failed to update user details."); // Set error message here
          setOpenAlert(true);
        });
    } else {
      // Handle form validation errors (optional alert for debugging)
      // alert("Please fix the validation errors before submitting the form.");
      console.warn(
        "Please fix the validation errors before submitting the form."
      );
      setUpdateSuccess(false);
      // setError("Fail909ed to update user details."); // Set error message here
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleCancel = () => {
    // Reset form or navigate away
    // Example: navigate to another page or reset form fields
  };

  const navigate = useNavigate();

  const navigateToChangePassword = () => {
    navigate(`${userDetails.userId}/password`);
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              height: "40px",
              fontSize: "12px",
            },
          },
        },
      },
    },
  });

  return (
    <paper>
      <ThemeProvider theme={theme}>
        <FormContainer>
          {error && <p>{error}</p>}
          <Box sx={{ display: "flex" }}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                p: 1,
                marginTop: "1px",
              }}
            >
              <form onSubmit={updateUser}>
                <Item>
                  <Grid container spacing={2}>
                    <Grid item xs={12} display="flex" justifyContent="justify">
                      <FirebaseImageUpload
                        userId={userId}
                        value={userDetails.image}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        helperText={
                          userFNameError || "Please enter your first name"
                        }
                        id="userFName"
                        name="userFName"
                        label="First Name"
                        variant="outlined"
                        value={userDetails.userFName}
                        onChange={handleInputChange}
                        error={!!userFNameError}
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
                      <ResponsiveDatePickers
                        date={dayjs(userDetails.DoB)} // Pass the Date of Birth as a dayjs object
                        setDate={handleDoBChange} // Handler for setting Date of Birth
                      />
                      {dobError && (
                        <span
                          style={{
                            color: "red",
                            fontSize: "0.75rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          {dobError}
                        </span>
                      )}

                      {/* Other fields */}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        error={!!emailError}
                        helperText={emailError}
                        id="Email"
                        name="Email"
                        label="Email"
                        variant="outlined"
                        value={userDetails.Email}
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
                        required
                        // helperText="Please enter your phone number"
                        id="phone"
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        value={userDetails.phone}
                        onChange={handlePhoneChange}
                        error={!!phoneError}
                        helperText={phoneError}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={orgDetails.length || 1}
                        helperText="List of Organizations"
                        id="organization-names"
                        name="organization-names"
                        label="Organization Names"
                        variant="outlined"
                        value={orgDetails.map((org) => org.orgName).join("\n")}
                        onChange={handleOrgDetailsChange}
                        disabled
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
                        helperText="Please enter your skills (e.g., programming languages, tools, etc.)"
                        id="skills"
                        name="skills"
                        label="Skills"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={userDetails.skills}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          style: {
                            minHeight: "6rem", // Adjust min height as needed for a larger input area
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <UpdateCancel
                        // handleSubmit={updateUser}
                        onSubmit={handleCancel}
                      />
                    </Grid>
                  </Grid>
                </Item>
              </form>
            </Box>
          </Box>
        </FormContainer>
      </ThemeProvider>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity={updateSuccess ? "success" : "error"}
          sx={{
            width: "100%",
            backgroundColor: updateSuccess ? "#4caf50" : "#a00000",
          }}
        >
          {updateSuccess
            ? "User details updated successfully!"
            : "Failed to update user details."}
        </MuiAlert>
      </Snackbar>
    </paper>
  );
}
