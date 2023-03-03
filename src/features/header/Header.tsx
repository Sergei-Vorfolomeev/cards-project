import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { Button } from '../../common/components/button/Button'

export const Header = () => {
  return (
    <div className={styles.header}>
      <span>IT-Incubator</span>
      {/*<NavLink to={'/login'}>Login</NavLink>*/}
      <Button name={'Sign In'} callBack={() => {}} />
    </div>
  )
}
