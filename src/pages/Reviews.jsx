import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Reviews.css';
import ReviewAPI from '../components/ReviewApi'
import ParksAPI from '../components/ParksApi'
import CreateReviewForm from '../components/CreateReviewForm'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReviewList from '../components/ReviewList';

export default function Reviews() {
  const [reviewList, setReviewList] = useState([])
  const [parkList, setParkList] = useState([])
  const [show, setShow] = useState(false);
  const [selectedParkId, setSelectedParkId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (parkId) => {
    setSelectedParkId(parkId);
    setShow(true);
  };

  const handleShowModal = (parkId) => {
    setSelectedParkId(parkId);
    setShowModal(true);
  }

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(ReviewAPI)
      const data = await response.json()
      setReviewList(data)
    }
    fetchReviews()
  }, [])

  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch(ParksAPI)
      const data = await response.json()
      setParkList(data)
    }
    fetchParks()
  }, [])

  const deleteReview = async (idToDelete) => {
    const response = await fetch(ReviewAPI + idToDelete, {
      method: "DELETE"
    })
    setReviewList(reviewList.filter(review => review.id !== idToDelete))
  }

  const createReview = async (reviewData) => {
    const response = await fetch(ReviewAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
    const newReview = await response.json();
    setReviewList([...reviewList, newReview])
  }


  return (
    <>
      <Row xs={1} md={3} className="g-4">
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
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Leave a review</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CreateReviewForm createReview={createReview} selectedParkId={selectedParkId} handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
      <ReviewList showModal={showModal} setShowModal={setShowModal} selectedParkId={selectedParkId} reviews={reviewList} />
    </>
  );
}