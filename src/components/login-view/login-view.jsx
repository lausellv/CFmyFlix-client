import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";

import "./login-view.scss";
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = formValidation();
    console.log(username, password);
    /* requesting authentication */
    /*calling props.onLoggedIn(username)*/
    props.onLoggedIn(username);

    if (isValid) {
      axios
        .post("https://cf-my-movie-app.herokuapp.com/login", {
          Username: username,
          Password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log("no such user");
        });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordRequired = "Password is required";
      isValid = false;
    }

    if (password.trim().length < 6) {
      passwordError.passwordMissing = "Password must be at least 6 characters";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="primary" type="secondary" onClick={props.toggleRegister}>
        Register
      </Button>
    </Form>
  );
}

export function Button({ label }) {
  return <button className="login-button">{label}</button>;
}
// LoginView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired
//   }),
//   onLoggedIn: PropTypes.func.isRequired,
//   onRegister: PropTypes.func
// };
