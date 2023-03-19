import { createContext, useState } from 'react'

export const LocationContext = createContext({})

export default function LocationProvider({ children }) {
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}
