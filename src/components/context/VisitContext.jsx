import { createContext, useReducer } from 'react'
import { initialState, visitReducer } from './VisitReducer'

export const VisitContext = createContext({})

export default function VisitProvider({ children }) {
  const [state, dispatch] = useReducer(visitReducer, initialState)
  return (
    <VisitContext.Provider value={{ state, dispatch }}>
      {children}
    </VisitContext.Provider>
  )
}
