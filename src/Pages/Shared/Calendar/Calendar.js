import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Box } from "@mui/system";
import "./Calendar.css";

const item = {
  boxShadow: "0px 0px 5px 0 #0000002c",
  transition: ".3s ease box-shadow",
  cursor: "pointer",
};

const Calendar = ({ date, setDate }) => {
  return (
    <Box style={item}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Calendar;
