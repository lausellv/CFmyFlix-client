import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movieData, onBackClick } = this.props;
    console.log(movieData);
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-year">
          <span className="label">Year Released: </span>
          <span className="value">{movieData.Release_Year}</span>
        </div>
        <div className="movie-description">
          <div className="label">Description: </div>
          <div className="value">{movieData.Description}</div>
        </div>

        <div className="movie-director">
          <div className="label">{`Director: ${movieData.Director.Name}`}</div>
          <div className="value">{`Bio: ${movieData.Director.Bio} Birth: ${movieData.Director.Birth}`}</div>
        </div>
        <div className="movie-genre">
          <div className="label">{`Genre: ${movieData.Genre.Name}`}</div>
          <div className="value">{`Description: ${movieData.Genre.Description}`}</div>
        </div>

        <Button
         variant="outline-secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            BACK
          </Button>
          
      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func
};
