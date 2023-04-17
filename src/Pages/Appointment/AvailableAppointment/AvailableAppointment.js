import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AvailableAppointment = ({ appointment, date, setBookingSuccess }) => {
  const { name, time, price, space } = appointment;
  const [openBooking, setBookingOpen] = React.useState(false);
  const handleBookingOpen = () => setBookingOpen(true);
  const handleBookingClose = () => setBookingOpen(false);
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Item style={{ padding: "30px 50px" }}>
          <Typography
            sx={{ color: "#0fcfe9", fontWeight: "700", margin: 2 }}
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            sx={{ color: "#2c2c54", fontWeight: "600", margin: 2 }}
            variant="h6"
            component="div"
          >
            {time}
          </Typography>
          <Typography
            sx={{ color: "#2c2c54", margin: 2 }}
            variant="h5"
            component="div"
          >
            Price: {price}
          </Typography>
          <Typography
            sx={{ color: "gray", margin: 2 }}
            variant="p"
            component="div"
          >
            {space} SPACES AVAILABLE
          </Typography>
          <Button
            onClick={handleBookingOpen}
            sx={{ mt: 1, backgroundColor: "#0fcfe9" }}
            variant="contained"
          >
            BOOK APPOINTMENT
          </Button>
        </Item>
      </Grid>
      <AppointmentModal
        appointment={appointment}
        openBooking={openBooking}
        handleBookingClose={handleBookingClose}
        date={date}
        setBookingSuccess={setBookingSuccess}
      ></AppointmentModal>
    </>
  );
};

export default AvailableAppointment;
