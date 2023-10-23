import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import UpdateReview from './UpdateReview';
import CreateReviewForm from './ReviewForm';

//bringing in a lot of props on this one - name was Reviewlist but had issues with the file name - may need to change at some point.
// showModal, - prop brought in to show Modal which displays reviews.
// setShowModal,- function to set Modal's visability (state).
// selectedParkId, - ID for the the selected state.
// reviews, - list of the reviews.
// deleteReview, - function to delete a review.
// updateReview, - function to update a review.
// handleClose, - function to close the modal.
// handleShowModal, - function to open the modal.
// createReview, - function to create a new review.
// parkTitle - title of the selected park.
export default function ReviewList({
  showModal, 
  setShowModal,
  selectedParkId,
  reviews,
  deleteReview,
  updateReview,
  handleClose,
  handleShowModal,
  createReview,
  parkTitle
}) {

  // State to manage the update review modal
  const [updateReviewShow, setUpdateReviewShow] = useState(false);
  const [reviewId, setReviewId] = useState('')



  // function to close the modal 
  const handleCloseModal = () => setShowModal(false);

  // function to open the update review modal and set the review to edit.
  const handleShowUpdateReview = (reviewId) => {
    setUpdateReviewShow(true);
    setReviewId(reviewId)
    handleCloseModal();
  
  }

  //function to close the update review modal.
  const handleCloseUpdateReview = () => {
    setUpdateReviewShow(false);
    //shows the reviews for the selected park after it is closed.
    handleShowModal(selectedParkId)
  }



  return (
    <>
    
      <Modal show={showModal} onHide={handleCloseModal}> {/* passes props to Modal */}
        <Modal.Header closeButton>
          <Modal.Title>{parkTitle} Reviews</Modal.Title> {/*uses ParkTitle prop to display park name*/}
        </Modal.Header>
        <Modal.Body>
          {/* filters through the reviews to find the review with the same parkID as the selected Park  */}
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
                      {/* buttons to handle updating and deleting the review. passes the ID of the review */}
                      <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleShowUpdateReview(review.id)}>Update</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => deleteReview(review.id)}>Delete</Button>
                    </ListGroup.Item>

                  </ListGroup>

                ))}
            </ul>
            // If no reviews are found (ternary operator from earlier)
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
            {/* Off canvas component - passes a lot of props. */}
      <UpdateReview
        placement={'end'}
        show={updateReviewShow}
        handleShowUpdateReview={handleShowUpdateReview}
        handleCloseUpdateReview={handleCloseUpdateReview}
        reviewToEdit={reviews.find(r => r.id === reviewId)}
        reviews={reviews}
        updateReview={updateReview}
        handleClose={handleClose}
        parkTitle={parkTitle} />
    </>
  )
}