import Map from './Map/Map'
import { useState } from 'react'
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
    <div className="card-item">
      <div className="card-map">
        <Map item={item} />
      </div>
      <div>
        <p>
          <b> Title:{item.title}</b>
        </p>
        <p>Coordinates:</p>
        <p>
          Latitude: {item.latitude} Longitude{item.longitude}
        </p>
        <p>Date of creation:{new Date(item.dateOfCreation).toLocaleString()}</p>
        <p>
          Details:
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
        <p>Visited:{item.visited ? 'Visited' : 'Not yet'}</p>
        {edit ? (
          <>
            <button
              onClick={() => {
                onEditClicked({ id: item.id, details: details })
                setEdit(false)
              }}
            >
              Save
            </button>
            <button onClick={cancelHandler}>Cancel</button>
          </>
        ) : (
          <>
            {' '}
            <button onClick={() => onVisitedClicked(item)}>Visited</button>
            <button onClick={() => onDeleteClicked(item)}>Delete</button>
            <button onClick={() => setEdit(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  )
}
