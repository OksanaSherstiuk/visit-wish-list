import React, { useContext, useEffect, useState } from 'react'
import { VisitContext } from './context/VisitContext'
import { addVisit } from './context/VisitReducer'
import { LocationContext } from './context/LocationContext'

export default function VisitForm() {
  //get dispatch from context
  const { dispatch } = useContext(VisitContext)
  const { location } = useContext(LocationContext)

  //keep track on what typed inside the input
  const [currentVisit, setCurrentVisit] = useState('')
  const [details, setDetails] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    setLatitude(location.lat)
    setLongitude(location.lon)
  }, [location])

  const addVisitItem = (e) => {
    e.preventDefault()
    //declare new visit item
    const newVisitItem = {
      title: currentVisit,
      latitude: latitude,
      longitude: longitude,
      dateOfCreation: Date.now(),
      details: details,
      visited: false,
      id: Date.now().valueOf(),
    }
    //dispatch the new visit item to the reducer
    dispatch(addVisit(newVisitItem))
    // setCurrentVisit('')
  }

  return (
    <>
      <form className="location-form" onSubmit={addVisitItem}>
        <input
          type="text"
          placeholder="Title"
          defaultValue={''}
          onChange={(e) => setCurrentVisit(e.target.value)}
        />
        <input
          type="text"
          placeholder="Paste Latitude"
          value={latitude || ''}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Paste Longitude"
          value={longitude || ''}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="details"
          defaultValue={''}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit">Add Location</button>
      </form>
    </>
  )
}
