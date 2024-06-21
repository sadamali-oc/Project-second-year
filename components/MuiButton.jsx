import React, { useState } from "react";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 121, 107)",
    },
  },
});

export const MuiButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setIsEnabled((prevEnabled) => !prevEnabled);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Stack spacing={2} direction={"row"}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color={isEnabled ? "error" : "primary"}
            size="small"
            disableElevation
            onClick={handleClick}
          >
            {isEnabled ? "Disable" : "Enable"}
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={isEnabled ? "error" : "success"}
              sx={{ width: '100%' }}
            >
              {isEnabled ? "Plazer Admin Disabled the Item" : "Plazer Admin Enabled the Item"}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </Stack>
    </div>
  );
};
