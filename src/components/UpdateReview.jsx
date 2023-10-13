import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CreateReviewForm from './ReviewForm';

export default function UpdateReview({ show, placement, handleCloseUpdateReview, reviewToEdit, reviews, updateReview, parkTitle }) {



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