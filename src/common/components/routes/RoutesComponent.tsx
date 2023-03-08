import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Login} from '../../../features/login/Login'
import {Profile} from "../../../features/profile/Profile";
import Registration from "../../../features/registation/Registration";
import ForgotPassword from "../../../features/forgotPassword/f1-forgotPassword/ForgotPassword";
import SentEmail from "../../../features/forgotPassword/f2-sentEmail/SentEmail";
import UpdatePassword from "../../../features/forgotPassword/f3-updatePassword/UpdatePassword";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    SET_PASSWORD: '/setPassword',
    UPDATE_PASSWORD: '/updatePassword',
    UPDATE_PASSWORD_INFO: '/updatePassword/info',
    SHOW_SUPER_COMPONENTS: '/showSuperComponents',
    SET_NEW_PASSWORD: '/set-new-password/:setNewPasswordToken?',
    ERROR_404: '/error404',
}

export const RoutesComponent = () => {
    return (
        <Routes>
            {/*add your routes here*/}
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.UPDATE_PASSWORD} element={<ForgotPassword/>}/>
            <Route path={PATH.UPDATE_PASSWORD_INFO} element={<SentEmail/>}/>
            <Route path={PATH.SET_NEW_PASSWORD} element={<UpdatePassword/>}/>
        </Routes>
    )
}
