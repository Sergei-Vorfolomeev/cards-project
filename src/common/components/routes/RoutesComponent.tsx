import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from '../../../features/login/Login'
import {Profile} from '../../../features/profile/Profile'
import Registration from '../../../features/registration/Registration'
import {ForgotPassword} from '../../../features/login/forgotPassword/f1-forgotPassword/ForgotPassword'
import SentEmail from '../../../features/login/forgotPassword/f2-sentEmail/SentEmail'
import UpdatePassword from '../../../features/login/forgotPassword/f3-updatePassword/UpdatePassword'
import Page404 from './page404/Page404'
import {AllPacks} from '../../../features/packs/p1-allPacks/AllPacks'
import {MyPack} from '../../../features/packs/p4-myPacks/MyPack'
import {EmptyPack} from '../../../features/packs/p2-emptyPack/EmptyPack'
import {FriendsPack} from '../../../features/packs/p3-friendsPacks/FriendsPack'
import {Learn} from "../../../features/learn/Learn";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    SET_PASSWORD: '/setPassword',
    UPDATE_PASSWORD: '/updatePassword',
    UPDATE_PASSWORD_INFO: '/updatePassword/info',
    SET_NEW_PASSWORD: '/set-new-password/:setNewPasswordToken?',
    ERROR_404: '/error404',
    PACKS_ALL: '/allPacks',
    PACK_MY: '/myPack/:packId?/:packName?',
    NO_PACKS: '/emptyPack/:packId?/:packName?',
    PACK_FRIEND: '/friendsPack/:packId?/:packName?',
    LEARN: '/learn/:cardsPack_id?/:packName?',
}

export const RoutesComponent = () => {
    return (
        <Routes>
            {/*add your routes here*/}
            <Route path={'/'} element={<AllPacks/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.UPDATE_PASSWORD} element={<ForgotPassword/>}/>
            <Route path={PATH.UPDATE_PASSWORD_INFO} element={<SentEmail/>}/>
            <Route path={PATH.SET_NEW_PASSWORD} element={<UpdatePassword/>}/>
            <Route path={PATH.PACKS_ALL} element={<AllPacks/>}/>
            <Route path={PATH.PACK_MY} element={<MyPack/>}/>
            <Route path={PATH.NO_PACKS} element={<EmptyPack/>}/>
            <Route path={PATH.PACK_FRIEND} element={<FriendsPack/>}/>
            <Route path={PATH.LEARN} element={<Learn/>}/>

            {/*<Route path={PATH.ERROR_404} element={<Page404 />} />*/}
            {/*<Route path="*" element={<Navigate to={PATH.ERROR_404} />} />*/}
        </Routes>
    )
}
