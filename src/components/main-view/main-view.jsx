import React from "react";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
  // j
  // simply to see how to add an eventlistener once the component is mounted
  //   keypressCallback(event){
  //     console.log(event.key);
  //   }

  /*Upon clicking on a movie, the state is updated to it */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /*Upon login in, the state is updated to such user */
  onLoggedIn(user) {
    this.setState({ user: user });
  }

  onRegister(register) {
    this.setState({ register: register });
  }

  render() {
    const { movies, selectedMovie, user } = this.state; // same as const movies = this.state.movies & const selecteMovie = this.state.selectedMovie (ES6 object destructuring)

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) {
      return <div className="main-view" />;
    } else {
      return (
        <div className="main-view">
          {selectedMovie ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ) : (
            movies.map(movie => (
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={movie => {
                  this.setSelectedMovie(movie);
                }}
              />
            ))
          )}
        </div>
      );
    }
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
    // an example of how to use evntlistener after the main-view component has been mounted
    // document.addEventListener('keypress', this.keypressCallback)
  }

  // componentWillUnmount(){
  //   document.removeEventListener('keypress', this.keypressCallback)
  // }
}
