import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Badge from 'react-bootstrap/Badge';

export default function ReviewList({showModal, setShowModal, selectedParkId, reviews }) {

    const handleCloseModal = () => setShowModal(false);
    

    return (
        <>
     
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reviews.filter((review) => review.parkId === selectedParkId).length > 0 ? (
                <ul>
                    {reviews.filter((review) => review.parkId === selectedParkId)
                    .map((review) => (
                        <ListGroup key={review.id} className="mb-2">
                          <ListGroup.Item as="li" className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Reviewer: {review.name}</div>
                                {review.review} 
                            </div>
                            <Badge bg='primary' pill>
                            {review.rating}
                            </Badge>
                            </ListGroup.Item>  
                            <ListGroup.Item className="d-flex justify-content-center bg-dark">
                                <Button variant="outline-warning" size="sm" className="me-2">Update</Button>
                                <Button variant="outline-danger" size="sm">Delete</Button>
                            </ListGroup.Item>
                           
                        </ListGroup>
                        
                    ))}
                </ul>
            ) : (
                <p>No reviews available for this park.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}