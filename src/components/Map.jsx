import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Map.css'
import Button from 'react-bootstrap/Button';

mapboxgl.accessToken = 'pk.eyJ1Ijoic211cmZzdG9tcGVyIiwiYSI6ImNsbjR4dHE1ODAzYmsyeG53anhpeW43OHcifQ.fMzvf9HQTTsZOdEd1zxSUQ';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-113.98);
  const [lat, setLat] = useState(46.86);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (!map.current) {
      // Initialize the map when it's not already initialized
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/smurfstomper/clncpl6bt00ap01ps6n470sky',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      map.current.on('click', (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['missoula-parks']
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];

        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<h3>${feature.properties.Title}</h3><p>${feature.properties.Description}</p>
            <img src='${feature.properties.Photo}' class='popup_image'>
            <button class='btn btn-outline-success mt-2'>Success</button>`
          )
          .addTo(map.current);
      });
    }
  }, [lng, lat, zoom]);

  return (
    <Container>
      <Row>
        <div ref={mapContainer} className="map-container" />
      </Row>
    </Container>
  );
}