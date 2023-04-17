import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import doctor from "../../../images/doctor.png";
import appointment_bg from "../../../images/appointment-bg.png";
import { Button, Typography } from "@mui/material";

const appointmentBg = {
  background: `url(${appointment_bg})`,
  backgroundPosition: "center",
  marginTop: 195,
  backgroundColor: "rgba(45, 58, 74, 0.8)",
  backgroundBlendMode: "darken, luminosity",
  opacity: 0.98,
};

const AppointmentBanner = () => {
  return (
    <Box style={appointmentBg} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} md={5}>
          <img
            src={doctor}
            style={{ width: "630px", marginTop: "-170px" }}
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography
            sx={{
              fontWeight: "900",
              color: "#0fcfe9",
            }}
            variant="h6"
            component="div"
          >
            APPOINTMENT
          </Typography>
          <Typography
            sx={{ mt: 3, fontWeight: "600", color: "#fff" }}
            variant="h2"
            component="div"
          >
            Make an appointment Today
          </Typography>
          <Typography
            sx={{ mt: 3, fontSize: "18px", color: "#fff" }}
            variant="p"
            component="div"
          >
            It is a long established fact that a reader will be distractedly the
            readable content of a page when looking at its.
          </Typography>
          <Button
            sx={{ backgroundColor: "#0fcfe9", marginTop: 5 }}
            variant="contained"
          >
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentBanner;
