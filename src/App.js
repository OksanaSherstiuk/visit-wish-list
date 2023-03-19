import React from 'react'
// import Map from './components/Map/Map'
import './App.css'
import VisitForm from './components/VisitForm'
import VisitList from './components/VisitList'
import VisitProvider from './components/context/VisitContext'
import MapSearch from './components/MapSearch/MapSearch'
import LocationProvider from './components/context/LocationContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
// import DraggableMarker from './components/DraggableMarker/DraggableMarker';

function App() {
  return (
    <LocationProvider>
      <VisitProvider>
        <div>
          <Header />
          <div id="map">
            <MapSearch />
          </div>
          <VisitForm />
          <VisitList />
          <Footer />
        </div>
      </VisitProvider>
    </LocationProvider>
  )
}

export default App
