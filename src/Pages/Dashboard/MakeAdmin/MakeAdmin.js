import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { jwtToken } = useAuth();
  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      {success && <Alert severity="success">Made Admin successfully!</Alert>}
      <h2>Make an Admin!</h2>
      <form onSubmit={handleAdminSubmit}>
        <TextField
          type="email"
          onBlur={handleOnBlur}
          id="standard-basic"
          label="Email"
          variant="standard"
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
    </div>
  );
};

export default MakeAdmin;
