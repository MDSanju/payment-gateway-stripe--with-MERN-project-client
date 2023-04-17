import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Appointments = ({ date }) => {
  const { user, jwtToken } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/appointments?email=${
      user.email
    }&date=${date.toLocaleDateString()}`;
    fetch(url, {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, [date, user.email, jwtToken]);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Appointments: {appointments.length}
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Appointments table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.displayName}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.serviceName}</TableCell>
                <TableCell align="right">
                  {row.payment ? (
                    "Paid"
                  ) : (
                    <Link
                      to={`/dashboard/payment/${row._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Pay</Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Appointments;
