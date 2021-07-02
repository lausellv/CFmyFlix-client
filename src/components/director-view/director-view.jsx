import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component{
    render(){
        const {directorData, onBackClick } = this.props;

        return(
            <div className="director-view">
               
            <Card border="dark" className="mb-3" className="mt-4">
             <Card.Body>
             <Card.Title><span className='text-primary'></span> {directorData.Director.Name}</Card.Title>
            <Card.Text><span className='text-primary'></span>{directorData.Director.Bio}</Card.Text>
            <Card.Text><span className='text-primary'></span>{directorData.Director.Birth}</Card.Text>
            <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
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
    onBackClick: PropTypes.func.isRequired
  };