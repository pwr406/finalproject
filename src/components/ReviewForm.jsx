import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function CreateReviewForm({ createReview, selectedParkId, handleClose, reviewToEdit, updateReview, reviewList, reviews }) {
  const [nameState, setNameState] = useState("")
  const [ratingState, setRatingState] = useState("")
  const [reviewState, setReviewState] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (reviewToEdit) {
        setNameState(reviewToEdit.name);
        setRatingState(reviewToEdit.rating);
        setReviewState(reviewToEdit.review);
      }
      setIsLoading(false);
    }
    loadData();
  }, [reviewToEdit]);

  const isEditMode = reviewToEdit !== undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEditMode) {
      const reviewIdToUpdate = reviewToEdit.id
      const reviewToUpdate = reviews.find(review => review.id === reviewIdToUpdate)
      const updatedReview = {
        ...reviewToUpdate,
        parkId: reviewToUpdate.parkId,
        name: nameState !== '' ? nameState : reviewToUpdate.name,
        rating: ratingState !== '' ? ratingState : reviewToUpdate.rating,
        review: reviewState !== '' ? reviewState : reviewToUpdate.review,
      };

      const reviewIndex = reviews.findIndex(review => review.id === reviewIdToUpdate)

      const updatedReviewList = [...reviews];
      updatedReviewList[reviewIndex] = updatedReview;

      await updateReview(updatedReview);

    } else {


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