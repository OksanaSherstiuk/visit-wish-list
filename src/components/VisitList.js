import React from 'react'
import LocationCard from './LocationCard'
import { useContext } from 'react'
import { VisitContext } from './context/VisitContext'
import { deleteVisit, markVisited, editVisit } from './context/VisitReducer'

export default function VisitList() {
  const { state, dispatch } = useContext(VisitContext)

  const deleteVisitItem = (item) => {
    dispatch(deleteVisit(item.id))
  }
  const changeToVisited = (item) => {
    dispatch(markVisited(item.id))
  }
  const editVisitItem = (item) => {
    dispatch(editVisit(item))
  }

  return (
    <div>
      <h1> VisitList</h1>
      <div className="location-container">
        {state.visits.map((item) => (
          <LocationCard
            item={item}
            key={item.id}
            onDeleteClicked={deleteVisitItem}
            onVisitedClicked={changeToVisited}
            onEditClicked={editVisitItem}
          />
        ))}
      </div>
    </div>
  )
}
