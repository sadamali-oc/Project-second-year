import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ResponsiveDatePickers({ date, setDate, helperText }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            helperText={helperText} // Helper text for the DatePicker
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default ResponsiveDatePickers;
