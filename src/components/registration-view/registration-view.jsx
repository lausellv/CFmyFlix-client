import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let setisValid = formValidation();
    console.log(username, password, email, birthdate);

    if (setisValid) {
      axios
        .post("https://cf-my-movie-app.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthdate: birthdate
        })
        .then(response => {
          const data = response.data;
          props.setUser(data.Username);
          console.log(data);
          window.open("/", "_self");

          alert("Registration successful");
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            alert("The value you entered is not valid.");
          }

          console.log("error in user registration", e);
        });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    const birthdateError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    } else if (password.trim().length === 0) {
      passwordError.passwordMissing = "Password is required";
      isValid = false;
    } else if (password.trim().length < 6) {
      passwordError.passwordMissing = "Password must be at least 6 characters";
      isValid = false;
    } else if (!email.includes(".") && !email.includes("@")) {
      emailError.notEmail = "Enter a valid email";
      isValid = false;
    } else if (birthdate === "") {
      birthdateError.noBirthdate = "Please enter a birthdate";
      isValid = false;
    }

    return isValid;
  };

  return (
    <Form className="registration-form" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid username
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="enter password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthdate:</Form.Label>
        <input
          type="date"
          placeholder="00-00-0000"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          required
        />
      </Form.Group>
      <span>
        <Button type="submit" variant="outline-info">
          Submit
        </Button>{" "}
        <Link to="/login">
          <Button variant="outline-info" size="m">
            Back to login
          </Button>
        </Link>
      </span>
    </Form>
  );
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

RegistrationView.propTypes = { onChange: PropTypes.func, onClick: PropTypes.func };

export default connect(mapStateToProps, { setUser })(RegistrationView);
