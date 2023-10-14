import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ContactForm from '../components/ContactForm'
import '../App.css'

//basic contact page, bringing in contact form component.
export default function Contact() {
    return (
        <Container fluid className="contact-container">
 
        <Row> 
            <Col>    
          <ContactForm />
          </Col> 
          </Row>
        
       
      </Container>
    )
  
}