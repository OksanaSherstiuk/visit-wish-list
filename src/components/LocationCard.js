import Map from './Map/Map'
import { useState } from 'react'
import styles from './LocationCard.module.css'
//I need to add here connection to the coordinates state so the Map component can get them as a prop for the {position} variable and could show the static location

export default function LocationCard({
  item,
  onDeleteClicked,
  onVisitedClicked,
  onEditClicked,
}) {
  const [details, setDetails] = useState(item.details)
  // i need to add a function that handles the edit button click and dispatches the editVisit action. I want to create a temporary text area form???n maybe???  with old data where you can edit old text
  const [edit, setEdit] = useState(false)
  const cancelHandler = () => {
    setEdit(false)
  }
  return (
    <div className={item.visited ? styles.cardItemVisited : styles.cardItem}>
      {/* {item.visited ? className{styles.cardItemVisited} : className={styles.cardItem}} */}
      <div className={styles.cardMap}>
        <Map item={item} />
      </div>
      <div className={styles.cardInfoPart}>
        <div className={styles.locationInfo}>
          <p>
            <span className={styles.cardTitles}> Title: </span>
            <span className={styles.visitTitle}> {item.title}</span>
          </p>
          <p>
            <span className={styles.cardTitles}>Coordinates:</span>
          </p>
          <p>
            <span className={styles.cardTitlesLatLon}>Latitude:</span>{' '}
            {item.latitude}
          </p>
          <p>
            <span className={styles.cardTitlesLatLon}>Longitude:</span>{' '}
            {item.longitude}
          </p>
          <p>
            <span className={styles.cardTitles}>Date of creation:</span>{' '}
            {new Date(item.dateOfCreation).toLocaleString()}
          </p>
          <p>
            <span className={styles.cardTitles}> Details:</span>{' '}
            {edit ? (
              <textarea
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            ) : (
              item.details
            )}
          </p>
          <p>
            <span className={styles.cardTitles}>Visited:</span>{' '}
            {item.visited ? (
              <span className={styles.visited}>Hell Yeah!</span>
            ) : (
              <span>Not yet</span>
            )}
          </p>
        </div>
        {edit ? (
          <div className={styles.btnContainer}>
            <button
              onClick={() => {
                onEditClicked({ id: item.id, details: details })
                setEdit(false)
              }}
            >
              Save
            </button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        ) : (
          <div className={styles.btnContainer}>
            {' '}
            <button onClick={() => onVisitedClicked(item)}>Visited</button>
            <button onClick={() => onDeleteClicked(item)}>Delete</button>
            <button onClick={() => setEdit(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  )
}
