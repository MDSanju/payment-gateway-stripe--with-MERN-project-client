import React from "react";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import chair from "../../../images/chair.png";
import Calendar from "../../Shared/Calendar/Calendar";

const AppointmentHeader = ({ date, setDate }) => {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid
        container
        spacing={14}
        columns={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12} md={5}>
          <Typography
            sx={{
              fontWeight: "900",
              color: "#2c2c54",
              marginBottom: 3,
            }}
            variant="h3"
            component="div"
          >
            Appointment
          </Typography>
          <Calendar date={date} setDate={setDate}></Calendar>
        </Grid>
        <Grid item xs={12} md={7}>
          <img src={chair} style={{ width: "100%" }} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentHeader;
