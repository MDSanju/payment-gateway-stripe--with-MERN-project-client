import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navigation = () => {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctors Portal
          </Typography>
          <NavLink to="/home" style={{ textDecoration: "none" }}>
            <Button color="inherit" style={{ color: "white" }}>
              Home
            </Button>
          </NavLink>
          <NavLink to="/appointment" style={{ textDecoration: "none" }}>
            <Button color="inherit" style={{ color: "white" }}>
              Appointment
            </Button>
          </NavLink>
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <Button color="inherit" style={{ color: "white" }}>
              Dashboard
            </Button>
          </NavLink>
          {user?.email ? (
            <Button onClick={logout} color="inherit" style={{ color: "white" }}>
              Logout
            </Button>
          ) : (
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button color="inherit" style={{ color: "white" }}>
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
