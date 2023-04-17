import React, { useState } from "react";
import { Alert, Button, Input, TextField } from "@mui/material";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please choose a image file!");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);

    fetch("http://localhost:5000/doctors", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Confirm to Add Doctor!");
          setSuccess("Doctor added successfully!");
        }
      })
      .catch((error) => {
        //
      });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Add A Doctor</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            sx={{ width: "300px", marginTop: "15px" }}
            label="Name"
            required
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
          <br />
          <TextField
            type="email"
            sx={{ width: "300px", marginTop: "30px" }}
            label="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />
          <br />
          <Input
            accept="image/*"
            type="file"
            sx={{ width: "300px", marginTop: "30px" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "300px", marginTop: "30px" }}
          >
            Add Doctor
          </Button>
        </form>
        <br />
        <br />
        {success && <Alert severity="success">{success}</Alert>}
      </div>
    </div>
  );
};

export default AddDoctor;
