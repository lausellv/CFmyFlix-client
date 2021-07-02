import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Row, Col, Button, Container, Navbar } from "react-bootstrap";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
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
      this.getUsers(accessToken);
    }
  }

  /*Method on which upon login in, the state is updated to such user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ user: authData.user.Username });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({ user: null });
  }

  onRegister(register) {
    this.setState({ register: register });
  }

  getMovies(token) {
    axios
      .get("https://cf-my-movie-app.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // assigning the result to the state
        this.setState({ movies: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token) {
    axios
      .get("https://cf-my-movie-app.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { user, movies, history } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Container>
            <Navbar bg="dark" variant="dark" fixed="top">
              <Navbar.Brand>Welcome to MyFlix!</Navbar.Brand>
              <ul>
                <Link to={`/`}>
                  <Button variant="link" className="navbar-link text-light">
                    Movies
                  </Button>
                </Link>
                <Link to={`/users/${user}`}>
                  <Button variant="link" className="navbar-link text-light">
                    Profile
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button
                    variant="link"
                    className="navbar-link text-light"
                    onClick={() => this.onLoggedOut()}
                  >
                    Logout
                  </Button>
                </Link>
              </ul>
            </Navbar>
          </Container>
          <Route
            exact
            path="/"
            render={() => {
              if (!user) return;

              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>;
              
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(movie => (
                <Col md={3} key={movie._id}>
                  <MovieCard movieData={movie} />
                </Col>
              ));
            }}
          />

<Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route
            path="/movies"
            render={() => {
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(movie => (
                <Col md={3} key={movie._id}>
                  <MovieCard movieData={movie} />
                </Col>
              ));
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movieData={movies.find(movie => movie._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

     

          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    directorData={
                      movies.find(movie => movie.Director.Name === match.params.directorId).Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
<Route path="movies/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genresData={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
      
        </Row>
      </Router>
    );
  }
}
