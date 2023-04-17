import React, { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import login_bg from "../../../images/login.png";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { user, signInUser, isLoading, authError, signInWithGoogle } =
    useAuth();
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const redirectUriNavigate = useNavigate();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleLoginSubmit = (e) => {
    signInUser(
      loginData.email,
      loginData.password,
      location,
      redirectUriNavigate
    );
    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, redirectUriNavigate);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={5}
          columns={12}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                color: "gray",
                fontWeight: "600",
                mb: 2,
              }}
            >
              Login:
            </Typography>
            <div style={{ marginBottom: "50px" }}>
              {user?.email && (
                <Alert severity="success">User logged in successfully!</Alert>
              )}
            </div>
            <div style={{ marginBottom: "50px" }}>
              {authError && <Alert severity="error">{authError}</Alert>}
            </div>
            {!isLoading && (
              <form onSubmit={handleLoginSubmit}>
                <Box>
                  <TextField
                    type="email"
                    id="standard-basic"
                    label="Your Email"
                    name="email"
                    onChange={handleOnChange}
                    variant="standard"
                    style={{ width: "80%" }}
                  />
                  <br />
                  <br />
                  <br />
                  <TextField
                    type="password"
                    id="standard-basic"
                    label="Password"
                    name="password"
                    onChange={handleOnChange}
                    variant="standard"
                    style={{ width: "80%" }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#09f3ff", width: "80%" }}
                  >
                    Sign in
                  </Button>
                  <br />
                  <br />
                  <Button
                    onClick={handleRegister}
                    variant="text"
                    style={{ width: "80%" }}
                  >
                    Are You New User? Please Register
                  </Button>
                </Box>
              </form>
            )}
            <div
              style={{
                width: "80%",
                marginTop: "40px",
                marginLeft: "28.5%",
              }}
            >
              ---------or---------
            </div>
            <Button
              style={{ width: "80%", marginTop: "40px" }}
              onClick={handleGoogleSignIn}
              variant="contained"
            >
              Google Sign In
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {isLoading && <CircularProgress />}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src={login_bg} alt="" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
