import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export default function About () {
    return (
        <Container fluid>
      <Row>
        <Col><Image src="../assets/missoula.jpg" fluid /></Col>
      </Row>
    </Container>
    )
}