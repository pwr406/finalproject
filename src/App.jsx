import './App.css'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import Map from './components/Map'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact';
import About from './pages/About';

function App() {


  return (
    <>
      
        <NavBar />
      
      
      <Container fluid>
        <Row className='map'>
        <Routes>
        <Route path="/" element={<Map />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About />}/>
        </Routes>
        </Row>
      </Container>
      
    </>
   
  )
}

export default App
