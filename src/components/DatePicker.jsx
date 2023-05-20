import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const DatePicker = (props) => {
    const { label, value, onChange, minDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={label}
          value={value}
          minDate={minDate}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          sx={{
            ".MuiInputBase-input": {
              padding: "8.5px 16px",
            },
          }}
          renderInput={(params) => <TextField {...params} 
          multiline={false}
          fullWidth
          id="outlined-size-normal"
          size="small"
          />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
export default DatePicker;