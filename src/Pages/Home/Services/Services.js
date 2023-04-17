import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Service from "../Service/Service";
import fluoride from "../../../../src/images/fluoride.png";
import cavity from "../../../../src/images/cavity.png";
import whitening from "../../../../src/images/whitening.png";
import Typography from "@mui/material/Typography";

const services = [
  {
    name: "Fluoride Treatment",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    img: fluoride,
  },
  {
    name: "Cavity Filling",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    img: cavity,
  },
  {
    name: "Teeth Whitening",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    img: whitening,
  },
];

const Services = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Typography
          sx={{
            mt: 7,
            mb: 2,
            color: "#0fcfe9",
            textAlign: "center",
            fontWeight: "900",
          }}
          variant="h6"
          component="div"
        >
          OUR SERVICES
        </Typography>
        <Typography
          sx={{ fontWeight: "600", textAlign: "center", color: "#2c2c54" }}
          variant="h3"
          component="div"
        >
          Services We Provide!
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {services.map((service) => (
            <Service key={service.name} service={service}></Service>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
