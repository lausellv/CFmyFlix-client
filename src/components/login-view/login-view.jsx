import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import { FormGroup, Label, Input } from "reactstrap"; // not needed

import "./login-view.scss";
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [usernameError, setUsernameError] = useState({});
  // const [passwordError, setPasswordError] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = formValidation();
    console.log(username, password);
    /* requesting authentication */
    /*calling props.onLoggedIn(username)*/
    // props.onLoggedIn(username);

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
          alert("wrong username or password");
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
      alert(usernameError.usernameShort);
      // setUsernameError(usernameError);
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordError.passwordRequired = "Password is required";
      alert(passwordError.passwordRequired);
      // setPasswordError(passwordError);
      isValid = false;
    }

    if (password.trim().length < 6) {
      passwordError.passwordMissing = "Password must be at least 6 characters";
      alert(passwordError.passwordMissing);
      isValid = false;
    }

    
    
    return isValid;
  };

  return (
    <Form className="login-form">
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" required onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <span>
        <Button
          className="super-button"
          variant="outline-info"
          type="submit"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </span>
      <Link to="/register">
        <Button className="super-button" variant="outline-info" type="secondary">
          REGISTER
        </Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);