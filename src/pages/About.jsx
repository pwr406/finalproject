import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../App.css'

export default function About () {
    return (
        <Container fluid>
      <Row className="imageRow">
        <Col><Image src="../assets/missoula.jpg" fluid className="backgroundImage" /></Col>
      </Row>
     
    </Container>
    )
}