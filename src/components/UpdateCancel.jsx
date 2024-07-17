import { Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

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

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  console.log(open);



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={3} marginLeft={1} marginTop={0}>
        <Button
          variant="contained"
          color="success"
          type="submit"
          size="large"
          onClick={onSubmit} // Call the onSubmit function when clicked
          sx={{
            "&:focus": {
              outline: "2px solid white", // White outline for the "UPDATE" button
            },
          }}
        >
          UPDATE
        </Button>
        
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
          onClick={handleClose} // Close the dialog when clicked
        >
          CANCEL
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default UpdateCancel;
