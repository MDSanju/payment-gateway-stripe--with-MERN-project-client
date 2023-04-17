import React from "react";
import { Grid, Typography } from "@mui/material";

const Doctor = ({ doctor }) => {
  const { image, name } = doctor;
  return (
    <Grid item xs={10} sm={6} md={4}>
      <img
        style={{ width: "100%", height: "280px" }}
        src={`data:image/png;base64,${image}`}
        alt=""
      />
      <Typography variant="h4">{name}</Typography>
    </Grid>
  );
};

export default Doctor;
