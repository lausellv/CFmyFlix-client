import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import "./movie-view.scss"

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movieData, onBackClick } = this.props;
    console.log(movieData);
    return (
      <Card border="light" className="mt-3">
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>
            <span className="value">{movieData.Title}</span>
          </Card.Title>
          <Card.Subtitle>
            <span>YEAR: {movieData.Release_Year}</span>
          </Card.Subtitle>
          <Card.Text>
            <span className="value">{movieData.Description}</span>
          </Card.Text>

          <Card.Subtitle>
            <span>DIRECTOR: {movieData.Director.Name}</span>
          </Card.Subtitle>

           <Card.Text><span className="value">{`Bio: ${movieData.Director.Bio} Birth: ${movieData.Director.Birth}`}</span></Card.Text>
           <Card.Subtitle>
            <span>GENRE: {movieData.Genre.Name}</span>
          </Card.Subtitle>
          <Card.Text><span className="value">{movieData.Genre.Description}</span></Card.Text>


          <Button className="super-button" variant="outline-info" onClick={onBackClick}>
            BACK
          </Button>
        </Card.Body>
      </Card>
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
