import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AppointmentModal = ({
  openBooking,
  handleBookingClose,
  appointment,
  date,
  setBookingSuccess,
}) => {
  const { name, time, price } = appointment;
  const { user } = useAuth();

  const initialAppointmentInfo = {
    displayName: user.displayName,
    email: user.email,
  };
  const [appointmentInfo, setAppointmentInfo] = useState(
    initialAppointmentInfo
  );

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...appointmentInfo };
    newInfo[field] = value;
    setAppointmentInfo(newInfo);
  };

  const handleGetAppointment = (e) => {
    // collect data
    const appointment = {
      ...appointmentInfo,
      time,
      price,
      serviceName: name,
      date: date.toLocaleDateString(),
    };

    // send to server
    fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setBookingSuccess(true);
          handleBookingClose();
        }
      });

    e.preventDefault();
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={openBooking}
      onClose={handleBookingClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openBooking}>
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            sx={{ textAlign: "center", color: "#0fcfe9", marginBottom: "30px" }}
            variant="h6"
            component="h2"
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleGetAppointment}>
              <div>
                <TextField
                  label="Time"
                  id="outlined-size-small"
                  defaultValue={time}
                  size="small"
                  disabled
                  sx={{ width: "300px" }}
                />
                <br />
                <br />
                <TextField
                  label="Your Name"
                  id="outlined-size-normal"
                  name="displayName"
                  onBlur={handleOnBlur}
                  defaultValue={user.displayName}
                  size="small"
                  sx={{ width: "300px" }}
                />
                <br />
                <br />
                <TextField
                  label="Phone Number"
                  id="outlined-size-normal"
                  name="phone"
                  onBlur={handleOnBlur}
                  size="small"
                  sx={{ width: "300px" }}
                />
                <br />
                <br />
                <TextField
                  label="Email"
                  id="outlined-size-normal"
                  name="email"
                  onBlur={handleOnBlur}
                  defaultValue={user.email}
                  size="small"
                  sx={{ width: "300px" }}
                />
                <br />
                <br />
                <TextField
                  disabled
                  defaultValue={date.toDateString()}
                  id="outlined-size-normal"
                  size="small"
                  sx={{ width: "300px" }}
                />
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#0fcfe9", marginBottom: "15px" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AppointmentModal;
