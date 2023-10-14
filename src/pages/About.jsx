import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../App.css'

//pretty basic about page with some CSS styling.
export default function About () {
    return (
        <Container fluid className="about-container">
      <Row>      
        <Col xs={2} className="column-box-image ps-2 pt-2 pe-2 rounded">
          <Image src="../assets/walk.jpg" rounded />
          <p className="text-center">One step at a time.</p>
        </Col>
        <Col className="column-box">
          <p>Thank you for visiting my site. This was created for my final project
            for the Montana Code School Front-End Developer Course. I still have a long
            way to go, but I am happy with how this turned out. I was inspired by my wonderful
            daugther and her love of Missoula's great parks. Like most projects, I had more in 
            mind, but time quickly got away from me. I had never worked with Mapbox before and
            a lot of time was spent reading through that documentation and learning how to work with
            MapBox GL JS within a React Application. I was hoping to allow users to mark 
            parks on the map and create their own description, but had to settle on providing reviews
            on a list of parks I created instead. 
          </p>
          <p>
            I learned so much throughout this project, but I am fully aware I have a long way to go.
            CSS seems to be an area I need to focus on more. Initially I found general CSS to be easy,
            but the more I've gotten into, the more I realize I need to learn more about how to correctly
            use it. This project leaves a lot to be desired when it comes to design and responsiveness. 
          </p>
          <p>
            The majority of my time was spent on the Map page and the Reviews page. I think there are some 
            neat little elements to the Review Page that I'm very proud of accomplishing. When you click "Read Reivews"
            the name of the Park is progmatically displayed. If there are no reviews for the park, you are given the option
            to be the first to leave one. The name of the park you are reviewing is brought in when "Leave A Review" is pressed,
            and I set up two different functions to handle when the form is closed; one for if a review is left, and one if the Offcanvas
            elment is closed without submitting anything. 
          </p>
          <p> 
            Thank you for taking a look! I would love to hear any and all feedback. I began my journey into Front-End Development 18 weeks ago
            and feel like I have come a long way, but I know I have a long road ahead of me. One of the things that excites me so much about this
            path is how you are never done learning. There is always new technology, new ways of doing things, new projects. I'm excited to see where
            this takes me. 
          </p>

        </Col>
        </Row>
      
     
    </Container>
    )
}