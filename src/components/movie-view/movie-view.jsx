import React from "react";
import PropTypes from "prop-types";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movieData, onBackClick } = this.props;
    console.log(movieData)
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        
         <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movieData.Director.Name}</span>
          <span className="value">{" Bio: "}{movieData.Director.Bio}  {" Birth: "} {Math.round(movieData.Director.Birth)}</span>
       
        </div>
        <div className="movie-genre">
          <div className="label">{`Genre: ${movieData.Genre.Name}`}</div>
          {/* TODO */}
          <div className="value">{"Description: "} {movieData.Genre.Description }</div>
          
        </div>
        

       
        <button
          className="super-button"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
      </div>
    );
  }
}

//  MovieView.propTypes = {
//   movieData: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.number.isRequired
//     })
//   }).isRequired,
//   onClick: PropTypes.func
//  };
