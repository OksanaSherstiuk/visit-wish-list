import React, { useState } from 'react'
import { useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { LocationContext } from '../context/LocationContext'
import DraggableMarker from '../DraggableMarker/DraggableMarker'
import './mapsearch.css'
function ChangeMapView({ coords }) {
  const map = useMap()
  map.setView(coords, map.getZoom())

  return null
}

export default function MapSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [mapCenter, setMapCenter] = useState([51.505, -0.09])
  // const [coordinates, setCoordinates] = useState(null) // new state for coordinates
  const { location, setLocation } = useContext(LocationContext)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handlePositionChanged = (latLng) => {
    console.log(latLng)
    // setCoordinates({ lat: latLng.lat, lon: latLng.lng }) // update coordinates state
    setLocation({ lat: latLng.lat, lon: latLng.lng }) // update coordinates state
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&polygon=1&addressdetails=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat)
          const lon = parseFloat(data[0].lon)
          setMapCenter([lat, lon])
          console.log([lat, lon])
          setSearchResults(data)
          // setCoordinates({ lat, lon }) // update coordinates state
          setLocation({ lat, lon }) // update coordinates state
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>{' '}
      </div>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {searchResults.map((result) => (
          <Marker
            key={result.place_id}
            position={[parseFloat(result.lat), parseFloat(result.lon)]}
          >
            <Popup>{result.display_name}</Popup>
          </Marker>
        ))}
        <DraggableMarker onPositionChanged={handlePositionChanged} />
        <ChangeMapView coords={mapCenter} />
      </MapContainer>

      {/* {coordinates && ( // render coordinates if they are not null
        <div>
          Coordinates: Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
        </div> */}
      {location && ( // render coordinates if they are not null
        <div>
          Coordinates: Latitude: {location.lat}, Longitude: {location.lon}
        </div>
      )}
    </div>
  )
}

// import React, { useState } from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// export default function MapSearch() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [searchResults, setSearchResults] = useState([])
//   const [mapCenter, setMapCenter] = useState([51.505, -0.09])

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value)
//   }

//   const handleSearchSubmit = (event) => {
//     event.preventDefault()
//     fetch(
//       `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&polygon=1&addressdetails=1`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.length > 0) {
//           const lat = parseFloat(data[0].lat)
//           const lon = parseFloat(data[0].lon)
//           setMapCenter([lat, lon])
//           setSearchResults(data)
//         }
//       })
//       .catch((error) => console.log(error))
//   }

//   return (
//     <div>
//       <form onSubmit={handleSearchSubmit}>
//         <input type="text" value={searchTerm} onChange={handleSearchChange} />
//         <button type="submit">Search</button>
//       </form>
//       <MapContainer
//         center={mapCenter}
//         zoom={13}
//         style={{ height: '500px', width: '100%' }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {searchResults.map((result) => (
//           <Marker
//             key={result.place_id}
//             position={[parseFloat(result.lat), parseFloat(result.lon)]}
//           >
//             <Popup>{result.display_name}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   )
// }
