import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component{
    render(){
        const {directorData} = this.props;

        return(
            <div className="director-view">
               
            <Card border="dark" className="mb-3" className="mt-4">
             <Card.Body>
             <Card.Title><span className='text-primary'></span> {directorData.Name}</Card.Title>
            <Card.Text><span className='text-primary'></span>{directorData.Bio}</Card.Text>
            <Card.Text><span className='text-primary'></span>{directorData.Birth}</Card.Text>
            <Link to="/movies">
            <Button
              variant="outline-info"
              size="m"  
            >
              Back
          </Button>
          </Link>
             </Card.Body>
             </Card>
    

            </div>
        )
    }
}

DirectorView.propTypes = {
   
        directorData: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
          }).isRequired,
  };