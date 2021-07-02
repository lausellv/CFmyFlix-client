import React from "react";
import { Card, Button } from "react-bootstrap";
import './genre-view.scss';
export class GenreView extends React.Component {
  render() {
    const { genreData, onBackClick } = this.props;

    return (
      <div className="genres-view">
        <Card border="dark" className="mb-3" className="mt-4">
          <Card.Body>
            <Card.Title>
              <span className="text-primary"></span> {genreData.Name}
            </Card.Title>
            <Card.Text>
              <span className="text-primary"></span>
              {genreData.Description}
            </Card.Text>
            <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
