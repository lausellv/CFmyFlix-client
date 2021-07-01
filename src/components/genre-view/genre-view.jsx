import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genresData } = this.props;

    return (
      <div className="genres-view">
        <Card border="dark" className="mb-3" className="mt-4">
          <Card.Body>
            <Card.Title>
              <span className="text-primary"></span> {genresData.Name}
            </Card.Title>
            <Card.Text>
              <span className="text-primary"></span>
              {genresData.Description}
            </Card.Text>
            <Link to={`/`}>
              <Button variant="outline-info">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
