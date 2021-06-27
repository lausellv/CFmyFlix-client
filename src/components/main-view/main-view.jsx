import React from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import "./main-view.scss";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios
      .get("https://cf-my-movie-app.herokuapp.com/movies")
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*Upon clicking on a movie, the state is updated to it */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /*Method on which upon login in, the state is updated to such user */
  onLoggedIn(user) {
    this.setState({ user: user });
  }

  onRegister(register) {
    this.setState({ register: register });
  }

  onBackClick = () => {
    this.setState({
      selectedMovie: null
    });
  }

  toggleRegister = e => {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    });
  };

  render() {
    const { movies, selectedMovie, register } = this.state; // same as const movies = this.state.movies & const selecteMovie = this.state.selectedMovie (ES6 object destructuring)
    if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} onBackClick={this.onBackClick} />;
    if (!this.state.user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />;

    if (movies.length === 0)  return <div className="main-view" />;
    return (
      <Row className="main-view justify-content-md-center">
      
        {selectedMovie
          ? (<Col md={8}><MovieView movieData={selectedMovie} onBackClick={this.onBackClick} /> </Col>)
  
          :  movies.map(movie => ( <Col md={3}>
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} /></Col>
          ))} 
          
      </Row>
    ); 
    
  }
}
