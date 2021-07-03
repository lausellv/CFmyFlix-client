import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movieData} = this.props;
    console.log(movieData);

    return (
      <Card border="light" className="mt-3">
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>
            <span className="value">{movieData.Title}</span>
          </Card.Title>
          <Card.Subtitle>
            <span>Year: {movieData.Release_Year}</span>
          </Card.Subtitle>
          <Card.Text>
            <span className="value">{movieData.Description}</span>
          </Card.Text>

          <Card.Subtitle>
            <Link to={`/directors/${movieData.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </Card.Subtitle>

          <Card.Subtitle>
            <Link to={`/genres/${movieData.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </Card.Subtitle>

          <Card.Subtitle>
            <Col>
                <Button block variant="success" onClick={() => this.handleAdd(movieData)}>
                  Add to favorites
                </Button>
            </Col>
            <Col>
                <Button block variant="danger" onClick={() => this.handleRemove(movieData)}>
                  Remove from favorites
                </Button>
            </Col>
          </Card.Subtitle>
          <Link to="/movies">
            <Button
              variant="secondary"
              size="sm"  
            >
              Back
          </Button>
          </Link>
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
