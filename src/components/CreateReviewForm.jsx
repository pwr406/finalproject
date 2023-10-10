import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function CreateReviewForm ({createReview, selectedParkId, handleClose}){
    const [nameState, setNameState] = useState("")
    const [ratingState, setRatingState] = useState("")
    const [reviewState, setReviewState] = useState("")

    const handleSubmit = async (event) => {
      event.preventDefault()
      const reviewData = {
        parkId: selectedParkId,
        name: nameState,
        rating: ratingState,
        review: reviewState,
      };

      await createReview(reviewData);

      setNameState('')
      setRatingState('')
      setReviewState('')

      handleClose();
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
          <Form.Control as= "textarea" rows={3} placeholder="Review" value={reviewState}
            onChange={(event) => setReviewState(event.target.value)} />
        </Form.Group>
  
  
        <div className="text-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
      </Form>
      </>
      
    )

}