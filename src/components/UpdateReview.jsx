import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CreateReviewForm from './ReviewForm';

//component to update a review.
// show, - prop to bring in showing the offcanvas element
// placement, - where to display offcanvas
// handleCloseUpdateReview, - how to close the updateReview if not submitted.
// reviewToEdit, - which review to update
// reviews, - list of reviews
// updateReview, - function to update review
// parkTitle - title of the park

export default function UpdateReview({
  show,
  placement,
  handleCloseUpdateReview,
  reviewToEdit,
  reviews,
  updateReview,
  parkTitle }) {



  return (
    <>

      <Offcanvas show={show} onHide={handleCloseUpdateReview} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update This Review for {parkTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CreateReviewForm reviewToEdit={reviewToEdit} reviews={reviews} updateReview={updateReview} handleClose={handleCloseUpdateReview} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );


}