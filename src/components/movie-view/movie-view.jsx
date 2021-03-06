import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import axios from "axios";


import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  handleRemove = movie => {
    const token = localStorage.getItem("token");
    const url =
      "https://cf-my-movie-app.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        alert(movie.Title + " has been removed from your Favorites.");
      });
  };

  handleAdd = movie => {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user");
    const url = "https://cf-my-movie-app.herokuapp.com/users/" + user + "/movies/" + movie._id;

    axios
      .post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        alert(movie.Title + "has been added to favorites!");
      });
  };

  render() {
    const { movieData } = this.props;

    return (
      <Card border="light" className="mt-3">
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>
            <span className="value">{movieData.Title}</span>
          </Card.Title>
          <Card border="light" className="mt-3">
            <Card.Subtitle>
              <span>Year: {movieData.Release_Year}</span>
            </Card.Subtitle>
            <Card.Text>
              <span className="value">{movieData.Description}</span>
            </Card.Text>

            <Card.Subtitle>
              <Link to={`/directors/${movieData.Director.Name}`}>
                <Button style={{ marginLeft: 15 }} variant="outline-info">
                  Director
                </Button>
              </Link>

              <Link to={`/genres/${movieData.Genre.Name}`}>
                <Button style={{ margin: 10 }} variant="outline-info">
                  Genre
                </Button>
              </Link>
            </Card.Subtitle>

            <Card.Subtitle>
              <Col>
                <Button block variant="outline-success" onClick={() => this.handleAdd(movieData)}>
                  Add to favorites
                </Button>

                <Button block variant="outline-danger" onClick={() => this.handleRemove(movieData)}>
                  Remove from favorites
                </Button>
              </Col>
            </Card.Subtitle>
            <Link to="/movies">
              <Button variant="outline-info" style={{ margin: 15 }} size="m">
                Back
              </Button>
            </Link>
          </Card>
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
