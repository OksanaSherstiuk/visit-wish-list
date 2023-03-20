export const ADD_VISIT = 'ADD_VISIT'
export const DELETE_VISIT = 'DELETE_VISIT'
export const EDIT_VISIT = 'EDIT_VISIT'
export const VISITED = 'VISITED'

export const initialState = {
  visits: [],
}

export const initializer = () => {
  return JSON.parse(localStorage.getItem('visits')) || initialState
}

export const addVisit = (payload) => ({
  type: ADD_VISIT,
  payload,
})

export const deleteVisit = (payload) => ({
  type: DELETE_VISIT,
  payload,
})

export const markVisited = (payload) => ({ type: VISITED, payload })

export const editVisit = (payload) => ({ type: EDIT_VISIT, payload })

export const visitReducer = (state = initialState, action) => {
  if (action.type === ADD_VISIT) {
    return {
      ...state,
      visits: [...state.visits, action.payload],
    }
  }
  if (action.type === DELETE_VISIT) {
    return {
      ...state,
      visits: state.visits.filter((visit) => visit.id !== action.payload),
    }
  }
  if (action.type === VISITED) {
    const indexVisit = state.visits.findIndex(
      (item) => item.id === action.payload
    )
    const newVisits = [...state.visits]
    newVisits[indexVisit].visited = true
    return {
      ...state,
      visits: newVisits,
    }
  }
  if (action.type === EDIT_VISIT) {
    return {
      ...state,
      visits: state.visits.map((visit) => {
        if (visit.id === action.payload.id) {
          return {
            ...visit,

            details: action.payload.details,
          }
        } else {
          return visit
        }
      }),
    }
  }
}
//
// export const visitReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_VISIT:
//       return {
//         ...state,
//         visits: [...state.visits, action.payload],
//       }
//     case DELETE_VISIT:
//       return {
//         ...state,
//         visits: state.visits.filter((visit) => visit.id !== action.payload),
//       }
//     case EDIT_VISIT:
//       return {
//         ...state,
//         visits: state.visits.map((visit) => {
//           if (visit.id === action.payload.id) {
//             return {
//               ...visit,
//               title: action.payload.title,
//               coordinates: action.payload.coordinates,
//               details: action.payload.details,
//             }
//           } else {
//             return visit
//           }
//         }),
//       }
//     case VISITED:
//       return {
//         ...state,
//         visits: state.visits.map((visit) => {
//           if (visit.id === action.payload) {
//             return {
//               ...visit,
//               visited: !visit.visited,
//             }
//           } else {
//             return visit
//           }
//         }),
//       }
//     default:
//       return state
//   }
// }
// }
