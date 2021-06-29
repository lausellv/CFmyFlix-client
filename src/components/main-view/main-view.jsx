import React from "react";
import axios from "axios";

import {Row, Col, Button} from "react-bootstrap";


import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  /*Upon clicking on a movie, the state is updated to it */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /*Method on which upon login in, the state is updated to such user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ user: authData.user.Username });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user:null})
  }

  getMovies(token) {
    axios
      .get("https://cf-my-movie-app.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // assign result to the state
        this.setState({ movies: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegister(register) {
    this.setState({ register: register });
  }

  onBackClick = () => {
    this.setState({
      selectedMovie: null
    });
  };

  toggleRegister = e => {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    });
  };

  render() {
    const { movies, selectedMovie, register } = this.state; // same as const movies = this.state.movies & const selecteMovie = this.state.selectedMovie (ES6 object destructuring)
    if (register)
      return (
        <RegistrationView
          onRegister={register => this.onRegister(register)}
          toggleRegister={this.toggleRegister}
          onBackClick={this.onBackClick}
        />
      );
    if (!this.state.user)
      return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          toggleRegister={this.toggleRegister}
        />
      );

    if (movies.length === 0) return <div className="main-view" />;
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView  movieData={selectedMovie} onBackClick={this.onBackClick} />{" "}
          </Col>
        ) : (
          movies.map(movie => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={newSelectedMovie => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
        <Button variant="primary" className='primary-btn' onClick={()=> this.onLoggedOut()}><span className='text-color'>Logout</span></Button>
      </Row>
    );
  }
}
