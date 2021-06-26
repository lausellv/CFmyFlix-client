import React, { useState } from "react";
import render  from "react-dom";
import  propTypes  from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);

  

    
    const isValid = formValidation();

    
    if (isValid) {

      axios
        .post("https://cf-my-movie-app.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email
          // birthdate: birthdate
        })
        .then(response => {
          const data = response.data;
          console.log(data);
        })
        .catch(e => {
          console.log("error in user registration", e);
        });
      console.log(username, password, email, birthdate);
      props.onRegister(username);
    }
  }

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordMissing = "Password is required";
      isValid = false;
    }

    if (password.trim().length < 6) {
      passwordError.passwordMissing = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailError.notEmail = "Enter a valid email";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  const onBackClick = () =>{
    props.onRegister()
  }
  

    return (
      <div className="registration-view">
        <Form className="form-registration">
          <h1>
            <span className="font-weight-bold">myFlixApp</span>
          </h1>
          <h2 className="text-center"> Sign up</h2>
          <Form.Group>
            <label>
              Username:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
          </Form.Group>
          <label>
            Create Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <label>
              Email:
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
          </label>
          <span>
            <Button variant="light" type="submit" onClick={handleSubmit}>
              SUBMIT
            </Button>
            <Button variant="light"
              onClick={() => {
                onBackClick(null);
              }}
            >
              BACK
            </Button>
          </span>
        </Form>
      </div>
    );
}

// RegistrationView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired
//   }),
//   onRegister: PropTypes.func.isRequired
// };
