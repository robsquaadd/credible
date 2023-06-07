//testing semantic ui modal

import React, { useState } from "react";
import LoginImage from "../images/LoginImage.jpeg";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import AuthService from "../utils/auth";

function LoginModal(props) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log("handleformsubmit clicked");
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      AuthService.login(data.login.token);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <p></p>
  );
}

export default LoginModal;
