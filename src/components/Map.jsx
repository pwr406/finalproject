import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Map.css'
import { useNavigate } from 'react-router-dom';

// Mapbox token for API
mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_BOX_KEY;

export default function Map() {
  // various states to control the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-113.98);
  const [lat, setLat] = useState(46.86);
  const [zoom, setZoom] = useState(12);
  const [bearing, setBearing] = useState(null);
  const [pitch, setPitch] = useState(null);

  // Setting variable to be able to use React-Router Navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!map.current) {
      // Initialize the map when it's not already initialized

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/smurfstomper/clncpl6bt00ap01ps6n470sky', //style I created using Mapbox developer - adds the location descriptions
        center: [80.763179, 46.548769], //inital starting view to map the annimation work.
        zoom: 0,
        bearing: 17.60,
        pitch: 32.50,


      })
        ;

      //function to control state for when the map is moved.
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      //starts the animation on the the map loading.
      map.current.on('load', () => {

        const delay = 7000;

        //zooms to the inital states I set to show Missoula.
        setTimeout(() => {
          const targetView = {
            center: [lng, lat],
            zoom: zoom,
            essential: true,
            bearing: bearing,
            pitch: pitch,
          };

          //has the map fly to that targetview that was created above.
          map.current.flyTo(targetView);
        })
      })
      //sets click event to bring up the popups for the features I created.
      map.current.on('click', (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['missoula-parks']
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];
        // created function for button click to go to the review "page"
        const handleButtonClick = () => {
          navigate('/reviews');
        };
        //brings up the popup - used feature information to populate it.
        const popupContent = `<h3>${feature.properties.Title}</h3><p>${feature.properties.Description}</p>
        <img src='${feature.properties.Photo}' class='popup_image'>
        <div class="text-center">
        <button class='btn btn-outline-success mt-2' id="buttonId">See the Reviews!</button>
        </div> `


        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(popupContent)
          .addTo(map.current);
          //adds event listener to the button by grabbing the element using ID.
        const buttonElement = document.getElementById('buttonId');
        buttonElement.addEventListener('click', handleButtonClick)
      });
    }
  }, [lng, lat, zoom]);


  return (
    <Container className="mapOuter">
      <Row className="mapRow">
        <div ref={mapContainer} className="map-container" />
      </Row>
    </Container>
  );
}