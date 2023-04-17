import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { user, registerUser, isLoading, authError } = useAuth();
  const [regData, setRegData] = useState({});
  const navigate = useNavigate();
  const redirectUriNavigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...regData };
    newLoginData[field] = value;
    setRegData(newLoginData);
  };

  const handleRegSubmit = (e) => {
    if (regData.password !== regData.password2) {
      alert("Please try again with the correct password!");
      return;
    } else {
      alert("Are you sure that You want to create a new account?");
    }

    registerUser(
      regData.email,
      regData.password,
      regData.name,
      redirectUriNavigate
    );

    e.preventDefault();
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
    >
      <Box>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {user?.email && (
            <Alert severity="success">New user created successfully!</Alert>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {authError && <Alert severity="error">{authError}</Alert>}
        </div>
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "gray",
            fontWeight: "500",
            mt: 5,
            mb: 5,
          }}
        >
          Please Register
        </Typography>
        {!isLoading && (
          <form onSubmit={handleRegSubmit}>
            <TextField
              type="text"
              id="standard-basic"
              label="Your Full Name (English)"
              name="name"
              onBlur={handleOnBlur}
              variant="standard"
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <br />
            <TextField
              type="email"
              id="standard-basic"
              label="Your Email"
              name="email"
              onBlur={handleOnBlur}
              variant="standard"
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <br />
            <TextField
              type="password"
              id="standard-basic"
              label="Password"
              name="password"
              onBlur={handleOnBlur}
              variant="standard"
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <br />

            <TextField
              type="password"
              id="standard-basic"
              label="Re-type Password"
              name="password2"
              onBlur={handleOnBlur}
              variant="standard"
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#4e15c4", width: "100%" }}
            >
              Register
            </Button>
            <br />
            <br />
            <Button
              onClick={handleLogin}
              variant="text"
              style={{ width: "100%" }}
            >
              Are You Already Registerd? Please Login
            </Button>
          </form>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isLoading && <CircularProgress />}
        </div>
      </Box>
    </Container>
  );
};

export default Register;
