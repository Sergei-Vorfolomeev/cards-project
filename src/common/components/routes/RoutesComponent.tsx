import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../../../features/login/Login'

export const RoutesComponent = () => {
  return (
    <Routes>
      {/*add your routes here*/}
      <Route path={'/'} element={''} />
      <Route path={'/login'} element={<Login />} />
    </Routes>
  )
}
