import React, { useEffect, useState } from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import BeatLoader from "react-spinners/BeatLoader";

const CheckoutForm = ({ appointment }) => {
  const { price, displayName, _id } = appointment;
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  //   error msg show on UI
  const [uiError, setUiError] = useState("");
  //
  const [success, setSuccess] = useState("");
  //   payment method
  const [clientSecret, setClientSecret] = useState("");
  //   reload
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(
      CardNumberElement,
      CardExpiryElement,
      CardCvcElement
    );
    if (card === null) {
      return;
    }

    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setUiError(error.message);
      setSuccess("");
    } else {
      setUiError("");
      console.log(paymentMethod);
    }

    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: displayName,
            email: user.email,
          },
        },
      });

    if (intentError) {
      setUiError(intentError.message);
      setSuccess("");
    } else {
      setUiError("");
      setSuccess("Your payment processed successfully!");
      console.log(paymentIntent);
      setProcessing(false);
      // save to database
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
      };
      const url = `http://localhost:5000/appointments/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const inputStyle = {
    iconColor: "#c4f0ff",
    color: "#424770",
    fontWeight: "500",
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      color: "#fce883",
    },
    "::placeholder": {
      color: "#aab7c4",
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        /> */}
        <CardNumberElement
          options={{
            style: {
              base: inputStyle,
            },
          }}
        />
        <br />
        <CardExpiryElement
          options={{
            style: {
              base: inputStyle,
            },
          }}
        />
        <br />
        <CardCvcElement
          options={{
            style: {
              base: inputStyle,
            },
          }}
        />
        <br />
        {processing ? (
          <div>
            <BeatLoader color={"#0fcfe9"} size={12} />
          </div>
        ) : (
          <button
            type="submit"
            disabled={!stripe || success}
            style={{ cursor: "pointer" }}
          >
            Pay ${price}
          </button>
        )}
      </form>
      {uiError && <p style={{ color: "red" }}>{uiError}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CheckoutForm;
