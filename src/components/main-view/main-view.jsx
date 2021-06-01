import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  
  }
  // j
// simply to see how to add an eventlistener once the component is mounted
//   keypressCallback(event){
//     console.log(event.key);
//   }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state; // same as const movies = this.state.movies & const selecteMovie = this.state.selectedMovie (ES6 object destructuring)
    // if (selectedMovie) return <MovieView movie={selectedMovie} />;
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



