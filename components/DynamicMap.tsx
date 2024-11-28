import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

const markers: { name: string; coordinates: LatLngExpression }[] = [
  { name: "University of Nottingham", coordinates: [52.9388, -1.1968] },
  { name: "University of Exeter", coordinates: [50.7365, -3.5339] },
  { name: "University of Sheffield", coordinates: [53.3811, -1.4882] },
  { name: "University of Lincoln", coordinates: [53.2285, -0.5501] },
  { name: "Royal Holloway, University of London", coordinates: [51.4255, -0.5671] },
  { name: "Nottingham Trent University", coordinates: [52.9581, -1.1542] },
]

const DynamicMap = () => {
  return (
    <MapContainer center={[52.5, -1.5]} zoom={6} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.coordinates}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default DynamicMap

