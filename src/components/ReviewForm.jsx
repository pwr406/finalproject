import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

//displays a form for creating or updating a review.
//createReview, - function to create a new review
// selectedParkId, - ID of the selected park.
// handleClose, - function to close the form.
// reviewToEdit, - review to edit.
// updateReview, - function to update a review.
// reviews - list of reviews.

export default function CreateReviewForm({
  createReview,
  selectedParkId,
  handleClose,
  reviewToEdit,
  updateReview,
  reviews }) {

  //state for form fields and for loading indicator. 
  const [nameState, setNameState] = useState("")
  const [ratingState, setRatingState] = useState("")
  const [reviewState, setReviewState] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  //effect to load the data when you are editing a review - brings in 
  //values to the form.
  useEffect(() => {
    function loadData() {
      if (reviewToEdit) {
        setNameState(reviewToEdit.name);
        setRatingState(reviewToEdit.rating);
        setReviewState(reviewToEdit.review);
      }
      setIsLoading(false);
    }
    loadData();
  }, [reviewToEdit]);

  //variable to determine if the form is creating a new review or editing one
  const isEditMode = reviewToEdit !== undefined;

  //function to handle when form is submitted.
  const handleSubmit = async (event) => {
    event.preventDefault();

    //used if/else statment to handle if it is an edit or an new review
    if (isEditMode) {

      const reviewIdToUpdate = reviewToEdit.id
      const reviewToUpdate = reviews.find(review => review.id === reviewIdToUpdate)
      const updatedReview = {
        ...reviewToUpdate,
        parkId: reviewToUpdate.parkId,
        //if the name, rating, review doesn't change, then it uses the previous value.
        name: nameState !== '' ? nameState : reviewToUpdate.name,
        rating: ratingState !== '' ? ratingState : reviewToUpdate.rating,
        review: reviewState !== '' ? reviewState : reviewToUpdate.review,
      };
      //finds the index of the review to replace it with updatedReview
      const reviewIndex = reviews.findIndex(review => review.id === reviewIdToUpdate)

      const updatedReviewList = [...reviews];
      updatedReviewList[reviewIndex] = updatedReview;

      //waiting for updateReview function to run, passing updated reivew there.
      await updateReview(updatedReview);

    } else {

      //what runs if the review isn't an edit, creating a new review

      const reviewData = {
        parkId: selectedParkId,
        name: nameState,
        rating: ratingState,
        review: reviewState,
      };

      await createReview(reviewData);
    }
    setNameState('')
    setRatingState('')
    setReviewState('')

    handleClose();
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  //form used.
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="User's Full Name" value={nameState}
            onChange={(event) => setNameState(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Rating">
          <Form.Label>Rating</Form.Label>
          <Form.Select value={ratingState} onChange={(event => setRatingState(event.target.value))}
          >
            {/* <option defaultValue>Rate this park</option> */}
            <option value="🌟">🌟</option>
            <option value="🌟🌟">🌟🌟</option>
            <option value="🌟🌟🌟">🌟🌟🌟</option>
            <option value="🌟🌟🌟🌟">🌟🌟🌟🌟</option>
            <option value="🌟🌟🌟🌟🌟">🌟🌟🌟🌟🌟</option>
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formReview">
          <Form.Label>Review</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Review" value={reviewState}
            onChange={(event) => setReviewState(event.target.value)} />
        </Form.Group>


        <div className="text-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
      </Form>
    </>

  )

}