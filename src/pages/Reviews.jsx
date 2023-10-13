import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Reviews.css';
import ReviewAPI from '../components/ReviewApi'
import ParksAPI from '../components/ParksApi'
import CreateReviewForm from '../components/ReviewForm'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReviewList from '../components/ReviewDisplay';

export default function Reviews() {
  const [reviewList, setReviewList] = useState([])
  const [parkList, setParkList] = useState([])
  const [show, setShow] = useState(false);
  const [selectedParkId, setSelectedParkId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [parkTitle, setParkTitle] = useState('');

  const handleClose = () => {
    setShow(false);
    handleShowModal(selectedParkId)
  }

  const handleCloseNoSubmit = () => {
    setShow(false);
  }

  const handleShow = (parkId) => {
    setSelectedParkId(parkId);
    setParkTitle(parkList.find((park) => park.id === parkId).Title)
    setShow(true);
  };

  const handleShowModal = (parkId) => {
    setSelectedParkId(parkId);
    setParkTitle(parkList.find((park) => park.id === parkId).Title)
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

  const updateReview = async (updatedReview) => {
    const response = await fetch(ReviewAPI + updatedReview.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview)
    })
    setReviewList(reviewList.map(review => review.id === updatedReview.id ? { ...review, ...updatedReview } : review))
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