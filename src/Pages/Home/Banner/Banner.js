import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import chair from "../../../images/chair.png";
import chair_bg from "../../../images/bg.png";
import { Button, Typography } from "@mui/material";

const bannerBg = {
  background: `url(${chair_bg})`,
  backgroundPosition: "center",
  opacity: 0.98,
};

const verticalCenter = {
  display: "flex",
  alignItems: "center",
  height: 540,
};

const Banner = () => {
  return (
    <Box style={bannerBg} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "85%",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} md={5} style={verticalCenter}>
          <Box>
            <Typography
              sx={{ fontWeight: "600", color: "#2c2c54" }}
              variant="h3"
              component="div"
            >
              Your New Smile Starts Here
            </Typography>
            <Typography
              sx={{ fontSize: "18px", mt: 4, color: "gray" }}
              variant="p"
              component="div"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              quam nam sapiente et odit incidunt accusamus libero, suscipit quo
              voluptatibus minus.
            </Typography>
            <Button
              sx={{ backgroundColor: "#0fcfe9", mt: 6 }}
              variant="contained"
            >
              GET APPOINTMENT
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} style={verticalCenter}>
          <img src={chair} style={{ width: "100%" }} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;
