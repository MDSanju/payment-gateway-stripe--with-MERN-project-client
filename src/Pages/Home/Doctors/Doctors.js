import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Doctor from "../Doctor/Doctor";
import ScaleLoader from "react-spinners/ScaleLoader";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div>
      {doctors.length ? (
        <div>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "24px",
              fontWeight: "bold",
              color: "#2c2c54",
            }}
            variant="h3"
          >
            Our Doctors {doctors.length}!
          </Typography>
          <Container>
            <Grid container spacing={2} justifyContent="center">
              {doctors.map((doctor) => (
                <Doctor key={doctor._id} doctor={doctor}></Doctor>
              ))}
            </Grid>
          </Container>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "75px",
            marginBottom: "50px",
          }}
        >
          <ScaleLoader color={"#0fcfe9"} size={64} />
        </div>
      )}
    </div>
  );
};

export default Doctors;
