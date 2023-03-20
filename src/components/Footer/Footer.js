import React from 'react'
import styles from './Footer.module.css'
import { BsInstagram, BsTwitter, BsFacebook, BsLinkedin } from 'react-icons/bs'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <BsInstagram className={styles.icon} />
      <BsTwitter className={styles.icon} />
      <BsFacebook className={styles.icon} />
      <BsLinkedin className={styles.icon} />
    </div>
  )
}
