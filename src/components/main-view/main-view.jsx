import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { connect } from "react-redux";

import MoviesList from "../movies-list/movies-list";
import { setMovies, setUser } from "../../actions/actions";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import "./main-view.scss";
class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      // this.props.setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
      this.getUsers(accessToken);
    }
    onre;
  }

  /*Method on which upon login in, the state is updated to such user */
  onLoggedIn(authData) {
    
    this.props.setUser(authData);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  onLoggedOut() {
    localStorage.clear();
    this.props.setUser(null);
  }

  getMovies(token) {
    axios
      .get("https://cf-my-movie-app.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // assigning the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token) {
    const currentUsername = localStorage.getItem("user");
  
    axios
      .get("https://cf-my-movie-app.herokuapp.com/users/" + currentUsername, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.props.setUser(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { movies, user, Username } = this.props;
    // if (!movies.length > 0) return <div>Loading...</div>;
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Container style={{ marginTop: 70 }}>
            <Navbar style={{ paddingTop: 20 }} bg="dark" variant="info" fixed="top">
              <Navbar.Brand>Welcome to MyFlix!</Navbar.Brand>
              <ul>
                <Link variant="info" to={`/`}>
                  <Button variant="outline-info" className="navbar-link text-light">
                    Movies
                  </Button>
                </Link>
                <Link to={`/users/${Username}`}>
                  <Button variant="outline-info" className="navbar-link text-light">
                    Profile
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button
                    variant="outline-info"
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
              if (!user)
                return (
                  <Row>
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/login"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }}
          />

          <Route
            path="/users/:username"
            render={() => {
              return (
                <Col>
                  <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
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
            exact
            path="/movies"
            render={() => {
              return movies.map(movie => (
                <Col md={3} key={movie._id}>
                  <MovieCard movieData={movie} />
                </Col>
              ));
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
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
                      movies.find(movie => movie.Director.Name === match.params.name).Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genreData={movies.find(movie => movie.Genre.Name === match.params.name).Genre}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
