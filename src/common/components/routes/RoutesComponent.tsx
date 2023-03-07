import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../../../features/login/Login'
import Registration from "../../../features/registation/Registration";
import { Profile } from "../../../features/profile/Profile";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    SET_PASSWORD: '/setPassword',
    UPDATE_PASSWORD: '/updatePassword',
    SHOW_SUPER_COMPONENTS: '/showSuperComponents',
    ERROR_404: '/error404',
}

export const RoutesComponent = () => {
  return (
    <Routes>
      {/*add your routes here*/}
        <Route path={PATH.LOGIN} element={<Login/>}></Route>
        <Route path={PATH.REGISTRATION} element={<Registration/>}></Route>
        <Route path={PATH.PROFILE} element={<Profile />}></Route>
    </Routes>
  )
}
