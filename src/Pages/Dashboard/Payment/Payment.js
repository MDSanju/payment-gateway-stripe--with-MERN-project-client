import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";
import HashLoader from "react-spinners/HashLoader";

const stripePromise = loadStripe(
  "pk_test_51JwYL4Jq0pXUuMFRnVDhRcsQg2L0wLBUwV1MZpNao2PN80jBzhjiOC4vVs5qOwjh3n3CTF1HLq3hoTGvS72xm0n400HwvtlcR0"
);

const Payment = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/appointments/${appointmentId}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data));
  }, [appointmentId]);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        Hi {appointment.displayName}, Please Pay for "
        <span style={{ color: "#0fcfe9" }}>{appointment.serviceName}</span>
        ". Thanks!
      </h2>
      <h3>Appointment Fee: ${appointment.price}</h3>
      {appointment?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm appointment={appointment}></CheckoutForm>
        </Elements>
      )}
      {!appointment.price && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <HashLoader color={"#0fcfe9"} size={64} />
        </div>
      )}
    </div>
  );
};

export default Payment;

/* 

1. install stripe and stripe-react
2. set publishable key
3. elements making
4. checkout form
5. create payment method
6. server side: create payment intent api
7. client side: load client secret
8. confirm card payment
9. handle user error

*/
