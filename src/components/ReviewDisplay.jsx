import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Badge from 'react-bootstrap/Badge';
import UpdateReview from './UpdateReview';
import CreateReviewForm from './ReviewForm';

export default function ReviewList({ showModal, setShowModal, selectedParkId, reviews, deleteReview, updateReview, handleClose, handleShowModal, createReview, parkTitle }) {
  const [updateReviewShow, setUpdateReviewShow] = useState(false);
  const [reviewId, setReviewId] = useState('')
  const [reviewToEdit, setReviewToEdit] = useState(null);



  const handleCloseModal = () => setShowModal(false);

  const handleShowUpdateReview = (reviewId) => {
    const editReview = reviews.find((review) => review.id === reviewId)
    setUpdateReviewShow(true);
    setReviewId(reviewId)
    handleCloseModal();
    setReviewToEdit(editReview)
  }

  const handleCloseUpdateReview = () => {
    setUpdateReviewShow(false);
    handleShowModal(selectedParkId)
  }



  return (
    <>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{parkTitle} Reviews</Modal.Title>
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
                      <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleShowUpdateReview(review.id)}>Update</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => deleteReview(review.id)}>Delete</Button>
                    </ListGroup.Item>

                  </ListGroup>

                ))}
            </ul>
          ) : (
            <>
              <p>No reviews available for this park. Do you want to be the first?</p>
              <CreateReviewForm createReview={createReview} handleClose={handleClose} selectedParkId={selectedParkId} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <UpdateReview
        placement={'end'}
        show={updateReviewShow}
        handleShowUpdateReview={handleShowUpdateReview}
        handleCloseUpdateReview={handleCloseUpdateReview}
        reviewToEdit={reviewToEdit}
        reviews={reviews}
        updateReview={updateReview}
        handleClose={handleClose}
        parkTitle={parkTitle} />
    </>
  )
}