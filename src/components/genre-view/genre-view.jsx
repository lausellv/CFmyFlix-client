import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./genre-view.scss";
export class GenreView extends React.Component {
  render() {
    const { genreData } = this.props;

    return (
      <div className="genre-view">
        <Card border="dark" className="mb-3" className="mt-4">
          <Card.Body>
            <Card.Title>
              <span className="text-primary"></span> {genreData.Name}
            </Card.Title>
            <Card.Text>
              <span className="text-primary"></span>
              {genreData.Description}
            </Card.Text>
            <Link to="/movies">
              <Button variant="outline-info" size="m">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  genreData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};
