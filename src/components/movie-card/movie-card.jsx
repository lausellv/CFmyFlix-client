import React from "react";
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div
        className="movie-card"
        onClick={() => {
          onMovieClick(movieData);
        }}
      >
        {movieData.Title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
