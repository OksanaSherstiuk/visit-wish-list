import React from 'react'
import styles from './Header.module.css'
import { GiPlanetConquest } from 'react-icons/gi'

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <GiPlanetConquest className={styles.icon} />
      </div>
      <h1>Visit Wish List</h1>
    </div>
  )
}
