import React, { useState } from "react";
import { validateEmail } from "../utils/helpers";
import Login from "../components/Login";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import credibleWord from "../images/signupCredible1.png";
import AuthService from "../utils/auth";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);
  function handleInputChange(e) {
    console.log("handle change activated");
    if (e.target.name === "signup-email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setFormErrorMessage("please enter a valid email address!");
      } else {
        setFormErrorMessage("");
        setFormState(...formState, { [e.target.name]: e.target.value });
      }
    } else {
      if (!e.target.value.length) {
        setFormErrorMessage(`${e.target.name} is required!`);
      } else {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      }
    }
  }

  // submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("handleformsubmit signup clicked");
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main id="sign-up-background">
      <div id="signup-container">
        <form id="signup-form" onSubmit={handleFormSubmit}>
          <label htmlFor="signup-username" name="signup-email">
            Username:{" "}
          </label>
          <input
            type="text"
            id="signup-email"
            name="signup-email"
            placeholder="Type your username here."
            onBlur={handleInputChange}
          />
          <br></br>
          <br></br>
          <label htmlFor="signup-password" name="signup-password">
            Password:{" "}
          </label>
          <input
            type="password"
            id="signup-password"
            placeholder="Type your password here."
          />
          <br></br>
          <button type="submit" id="signup-button">
            Sign-Up
          </button>
        </form>
        <Login id="log-in-button" />
        {/* note: login functionality is in the login component  */}
      </div>
    </main>
  );
}

export default Signup;
