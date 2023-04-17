import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Alert, Container } from "@mui/material";
import AvailableAppointment from "../AvailableAppointment/AvailableAppointment";

const appointments = [
  {
    id: 1,
    name: "Teeth Orthodontics",
    price: 30,
    time: "08:00 AM - 09:00 PM",
    space: 10,
  },
  {
    id: 2,
    name: "Cosmetic Dentistry",
    price: 38,
    time: "08:00 AM - 09:00 PM",
    space: 6,
  },
  {
    id: 3,
    name: "Teeth Cleaning",
    price: 20,
    time: "08:00 AM - 09:00 PM",
    space: 7,
  },
  {
    id: 4,
    name: "Cavity Protection",
    price: 26,
    time: "08:00 AM - 09:00 PM",
    space: 12,
  },
  {
    id: 5,
    name: "Teeth Orthodontics",
    price: 19,
    time: "08:00 AM - 09:00 PM",
    space: 11,
  },
  {
    id: 6,
    name: "Teeth Orthodontics",
    price: 40,
    time: "08:00 AM - 09:00 PM",
    space: 5,
  },
];

const AvailableAppointments = ({ date }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        marginBottom: "96px",
        color: "#0fcfe9",
      }}
    >
      <Container>
        <h1 style={{ marginBottom: "60px" }}>
          Available Appointments on {date.toDateString()}
        </h1>
        <div style={{ marginBottom: "50px" }}>
          {bookingSuccess && (
            <Alert severity="success">Appointmented Successfully!</Alert>
          )}
        </div>
      </Container>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} columns={12}>
            {appointments.map((appointment) => (
              <AvailableAppointment
                key={appointment.id}
                appointment={appointment}
                date={date}
                setBookingSuccess={setBookingSuccess}
              ></AvailableAppointment>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default AvailableAppointments;
