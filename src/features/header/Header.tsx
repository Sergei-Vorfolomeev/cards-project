import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { Button } from '../../common/components/button/Button'
import { PATH } from '../../common/components/routes/RoutesComponent'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.header}>
      <span>IT-Incubator</span>
      <NavLink to={'/login'}>Login</NavLink>
      <Button
        name={'Sign In'}
        callBack={() => {
          return navigate(PATH.LOGIN)
        }}
      />
    </div>
  )
}
