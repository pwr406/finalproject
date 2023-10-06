import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Reviews.css';

export default function Reviews() {
    const [reviewList, setReviewList] = useState([])
    const [parkList, setParkList] = useState([])
    
    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch("http://localhost:3000/reviews")
            const data = await response.json()
            setReviewList(data)
        } 
        fetchReviews()  
    },[])

    useEffect(() => {
        const fetchParks = async () => {
            const response = await fetch("http://localhost:3000/parks")
            const data = await response.json()
            setParkList(data)
        } 
        fetchParks()  
    },[])


   
        return (
            <Row xs={1} md={3} className="g-4">
            {parkList.map((park) => (
              <Col key={park.id}>
                <Card className="parkCard" bg="dark" text="light">
                  <Card.Img variant="top" src={park.Photo} className="parkCardPhoto" />
                  <Card.Body className="parkCardBody">
                    <Card.Title>{park.Title}</Card.Title>
                    <Card.Text>{park.Description}</Card.Text>
                    <div className="text-center mt-3">
                    <Button variant="primary" className="me-5">Read Reviews</Button>
                    <Button variant="info">Leave Review</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        );
      }