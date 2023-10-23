import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Reviews.css';
import reviewAPI from '../components/reviewApi'
import parksAPI from '../components/parksApi'
import CreateReviewForm from '../components/ReviewForm'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReviewList from '../components/ReviewDisplay';

export default function Reviews() {
  //state to control a lot of things - these get passed all over the app.
  const [reviewList, setReviewList] = useState([])
  const [parkList, setParkList] = useState([])
  const [show, setShow] = useState(false);
  const [selectedParkId, setSelectedParkId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [parkTitle, setParkTitle] = useState('');

  //function to handle the close of review forms
  const handleClose = () => {
    setShow(false);
    handleShowModal(selectedParkId)
  }

  //function to handle the close of the form if submit isn't pressed.
  const handleCloseNoSubmit = () => {
    setShow(false);
  }

  //function to handle showing review form
  const handleShow = (parkId) => {
    setSelectedParkId(parkId);
    setParkTitle(parkList.find((park) => park.id === parkId).Title)
    setShow(true);
  };
  //function to handle showing modal that shows reviews
  const handleShowModal = (parkId) => {
    setSelectedParkId(parkId);
    setParkTitle(parkList.find((park) => park.id === parkId).Title)
    setShowModal(true);
  }
  //fetching the reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(reviewAPI)
      const data = await response.json()
      setReviewList(data)
    }
    fetchReviews()
  }, [])

  //fectching the parks from API
  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch(parksAPI)
      const data = await response.json()
      setParkList(data)
    }
    fetchParks()
  }, [])

  //function to delete reviews from API 
  const deleteReview = async (idToDelete) => {
    const response = await fetch(reviewAPI + idToDelete, {
      method: "DELETE"
    })
    setReviewList(reviewList.filter(review => review.id !== idToDelete))
  }

  //function to create reviews on API
  const createReview = async (reviewData) => {
    const response = await fetch(reviewAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
    const newReview = await response.json();
    setReviewList([...reviewList, newReview])
  }

  //Function to update reviews on API
  const updateReview = async (updatedReview) => {
    const response = await fetch(reviewAPI + updatedReview.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview)
    })
    setReviewList(reviewList.map(review => review.id === updatedReview.id ? { ...review, ...updatedReview } : review))
  }


  return (
    <>
      <Row xs={1} md={3} className="g-4 ms-0">
        {parkList.map((park) => (
          <Col key={park.id}>
            <Card className="parkCard" bg="dark" text="light">
              <Card.Img variant="top" src={park.Photo} className="parkCardPhoto" />
              <Card.Body className="parkCardBody">
                <Card.Title>{park.Title}</Card.Title>
                <Card.Text>{park.Description}</Card.Text>
                <div className="text-center mt-3">
                  <Button variant="primary" className="me-5" onClick={() => handleShowModal(park.id)}>Read Reviews</Button>
                  <Button variant="info" onClick={() => handleShow(park.id)}>Leave Review</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Offcanvas show={show} onHide={handleCloseNoSubmit}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Leave a review for {parkTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CreateReviewForm createReview={createReview} selectedParkId={selectedParkId} handleClose={handleClose} reviewList={reviewList} updateReview={updateReview} />
        </Offcanvas.Body>
      </Offcanvas>
      <ReviewList showModal={showModal} setShowModal={setShowModal} selectedParkId={selectedParkId} reviews={reviewList} deleteReview={deleteReview} updateReview={updateReview} handleClose={handleClose} handleShowModal={handleShowModal} createReview={createReview} parkList={parkList} parkTitle={parkTitle}
      />
    </>
  );
}