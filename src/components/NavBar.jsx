import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>

          <Nav className="m-auto d-flex align-items-center">
            <Nav.Link as={NavLink} to="/">Map</Nav.Link>
            <Nav.Link as={NavLink} to="/reviews">Reviews</Nav.Link>
            <Navbar.Brand className='ms-2'><h3 className="display-6">Missoula Parks</h3></Navbar.Brand>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar; 