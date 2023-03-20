import React, { useContext, useEffect, useState } from 'react'
import { VisitContext } from './context/VisitContext'
import { addVisit } from './context/VisitReducer'
import { LocationContext } from './context/LocationContext'
import styles from './VisitForm.module.css'

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

    // clear the input fields after submit the form and set the location to the default one (London)
    setLatitude('')
    setLongitude('')

    setCurrentVisit('')
    setDetails('')
    // e.target.reset()
  }

  return (
    <>
      <form className={styles.locationForm} onSubmit={addVisitItem}>
        <h2>I want to visit:</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          defaultValue={''}
          value={currentVisit || ''}
          onChange={(e) => setCurrentVisit(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Paste Latitude"
          value={latitude || ''}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Paste Longitude"
          value={longitude || ''}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <textarea
          className={styles.inputTextarea}
          type="text"
          placeholder="Details..."
          defaultValue={''}
          value={details || ''}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button className={styles.submitBtn} type="submit">
          Add Location
        </button>
      </form>
    </>
  )
}
