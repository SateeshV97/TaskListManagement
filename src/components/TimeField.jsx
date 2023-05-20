import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimeField as TimeFieldValue } from "@mui/x-date-pickers/TimeField";
const TimeField = (props) => {
  const { label, value, onChange, minDate, maxDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimeFieldValue
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        style={{ minWidth: "50%" }}
        sx={{
          ".MuiInputBase-input": {
            padding: "8.5px 16px",
          },
        }}
        minTime={minDate}
        maxTime={maxDate}
      />
    </LocalizationProvider>
  );
};
export default TimeField;
