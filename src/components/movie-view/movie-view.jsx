import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.scss";

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
            <span>Year: {movieData.Release_Year}</span>
          </Card.Subtitle>
          <Card.Text>
            <span className="value">{movieData.Description}</span>
          </Card.Text>

         
         
          <Card.Subtitle><Link to={`/directors/${movieData.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          </Card.Subtitle> 

        
          <Card.Subtitle>
            
            <Link to={`/genres/${movieData.Genre.Name}`}>
                 <Button variant="link">Genre</Button>
               </Link>
          </Card.Subtitle>

          <Card.Subtitle><Col>
          <Link to={`/movies/${movieData._id}`}>
            <Button block variant="success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
          </Link></Col>
          <Col> <Link to={`/movies/${movieData._id}`}>
            <Button block variant="danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
          </Link></Col>

          </Card.Subtitle>
          <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
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
