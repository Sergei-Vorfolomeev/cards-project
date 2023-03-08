import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ForgotPassword.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from '../../../common/components/routes/RoutesComponent';
import ForgotButton from "../f4-common/forgotButton/ForgotButton";
import ForgotTitle from "../f4-common/forgotTitle/ForgotTitle";
import ForgotError from "../f4-common/forgotError/ForgotError";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {sentEmailTC} from '../forgot-reducer';
import {Loader} from "../../../common/components/loader/Loader";

const ForgotPassword = () => {

    const dispatch = useAppDispatch()
    const errorApi = useAppSelector<string>(state=>state.forgotReducer.error)
    const isLoading = useAppSelector<boolean>(state=>state.forgotReducer.isLoading)
    const letterWasSent = useAppSelector<boolean>(state=>state.forgotReducer.letterWasSent)

    const [email, setEmail] = useState<string>('')
    const [forgotPasswordError, setForgotPasswordError] = useState<string>('')

    useEffect(()=>{
        setForgotPasswordError(errorApi)
    },[errorApi])


    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        setForgotPasswordError('')
    }
    const buttonOnClickHandler = () => {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (EMAIL_REGEXP.test(email)) {
            dispatch(sentEmailTC(email))
        } else {
            setForgotPasswordError('Invalid email')
        }

    }

    if (letterWasSent) {return <Navigate to={PATH.UPDATE_PASSWORD_INFO}/>}

    return (
        <div className={s.forgotPassword}>
            <div className={s.forgotPassword_container}>
                {isLoading && <Loader/>}
                <ForgotTitle text={'Forgot your password?'}/>
                <input placeholder={'Email'} value={email} onChange={onInputChange}/>
                <p className={s.forgotPassword_instruction}>Enter your email address and we will send you further
                    instructions </p>
                <ForgotError error={forgotPasswordError}/>
                <ForgotButton onClick={buttonOnClickHandler} text={'Send Instructions'}/>
                <p className={s.forgotPassword_backToLogin}>Did you remember your password?</p>
                <div className={s.forgotPassword_backToLoginLink}><NavLink to={PATH.LOGIN}>Try logging in</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;