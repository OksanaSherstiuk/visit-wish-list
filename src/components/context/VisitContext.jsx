import { createContext, useEffect, useReducer } from 'react'
import { initialState, visitReducer, initializer } from './VisitReducer'

export const VisitContext = createContext({})

export default function VisitProvider({ children }) {
  const [state, dispatch] = useReducer(visitReducer, initializer())

  useEffect(() => {
    localStorage.setItem('visits', JSON.stringify(state))
  }, [state])

  return (
    <VisitContext.Provider value={{ state, dispatch }}>
      {children}
    </VisitContext.Provider>
  )
}
