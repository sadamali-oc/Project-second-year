import { Dialog, DialogActions, DialogTitle,Grow } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 121, 107)",
    },
    error: {
      main: "rgb(255, 99, 71)",
    },
  },
});

function UpdateCancel({ onSubmit }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={3} marginLeft={1} marginTop={0} >
        <Button
          variant="contained"
          color="success"
          type="submit"
          size="large"
          onClick={handleOpen}
          sx={{
            "&:focus": {
              outline: "2px solid white", // White outline for the "UPDATE" button
            },
          }}
        >
          UPDATE
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            <Grow in={true}>
            <Alert severity="success" 
           
            sx={{ marginBottom: "0px" 
              
            }}>Profile data updated successfully</Alert>
            </Grow>
         
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#c00000", // Background color for the "Close" button
                "&:hover": {
                  backgroundColor: "#a00000", // Darker red on hover
                },
              }}
              size="small"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          variant="contained"
          size="large"
          sx={{
            "&:focus": {
              outline: "2px solid white", // White outline for the "CANCEL" button
            },
            borderColor: "white", // White outline color
            borderWidth: "2px", // Outline width
            backgroundColor: "#c00000", // Background color for the "CANCEL" button
            "&:hover": {
              backgroundColor: "#a00000", // Darker red on hover
            },
          }}
        >
          CANCEL
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default UpdateCancel;
