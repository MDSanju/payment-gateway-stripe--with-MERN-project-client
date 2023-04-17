import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Service = (props) => {
  const { name, description, img } = props.service;
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ minWidth: 275, border: 0, boxShadow: 0, marginTop: 12 }}>
        <CardMedia
          component="img"
          style={{ width: "auto", height: "80px", margin: "0 auto" }}
          image={img}
          alt="green iguana"
        />
        <br />
        <CardContent>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
            {name}
          </Typography>
          <br />
          <Typography
            sx={{ textAlign: "center" }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Service;
