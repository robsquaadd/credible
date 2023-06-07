import React, { useState, useEffect } from "react";
import gold1 from "../pageImages/gold1.png";
import gold2 from "../pageImages/gold2.png";
import gold3 from "../pageImages/gold3.png";
import gold4 from "../pageImages/gold4.png";
// import { Container } from "semantic-ui-react";
import { CHECKOUT, LOGIN_USER } from "../utils/mutations";
import AuthService from "../utils/auth";
import { useMutation } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { idbPromise } from "../utils/helpers";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Store() {
  const [checkout, { data }] = useMutation(CHECKOUT);
  const [formState, setFormState] = useState({ credits: "", price: "" });
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCreditSubmit = async (a, b) => {
    console.log(a, b);
    try {
      const { data } = await checkout({
        variables: {
          credits: a,
          price: b,
        },
      });
      await idbPromise("points", "put", {
        credits: a,
        price: b,
      });
      console.log(data);
      if (data) {
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <p></p>;
}

export default Store;
