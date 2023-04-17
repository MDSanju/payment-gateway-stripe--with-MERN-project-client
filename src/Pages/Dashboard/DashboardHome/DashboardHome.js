import * as React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Calendar from "../../Shared/Calendar/Calendar";
import Appointments from "../Appointments/Appointments";

const DashboardHome = () => {
  const [date, setDate] = React.useState(new Date());
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={4}>
          <Calendar date={date} setDate={setDate}></Calendar>
        </Grid>
        <Grid item xs={12} md={8}>
          <Appointments date={date}></Appointments>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
