import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './UpdatePassword.module.css'
import ForgotTitle from "../f4-common/forgotTitle/ForgotTitle";
import RegistrationInput from "../../registation/registrationInput/RegistrationInput";
import ForgotButton from "../f4-common/forgotButton/ForgotButton";
import ForgotError from "../f4-common/forgotError/ForgotError";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Loader} from "../../../common/components/loader/Loader";
import {updatePasswordTC} from "../forgot-reducer";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../common/components/routes/RoutesComponent";

const UpdatePassword = () => {

    const dispatch = useAppDispatch()
    const errorApi = useAppSelector<string>(state => state.forgotReducer.error)
    const newPasswordWasSet = useAppSelector<boolean>(state => state.forgotReducer.newPasswordWasSet)
    const isLoading = useAppSelector<boolean>(state => state.forgotReducer.isLoading)

    const [newPassword, setNewPassword] = useState<string>('')
    const [updatePasswordError, setUpdatePasswordError] = useState<string>('')

    const updatePasswordParam = useParams().setNewPasswordToken

    useEffect(() => {
        setUpdatePasswordError(errorApi)
    }, [errorApi])

    const buttonOnClickHandler = () => {
        if (newPassword.length > 6) {
            updatePasswordParam ? dispatch(updatePasswordTC(newPassword, updatePasswordParam)) : setUpdatePasswordError('errorApi')
        } else {
            setUpdatePasswordError('Minimum password length is 7 symbols')
        }
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value)
        setUpdatePasswordError('')
    }

    if (newPasswordWasSet) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.updatePassword}>
            <div className={s.updatePassword_container}>
                {isLoading && <Loader/>}
                <ForgotTitle text={"Create new password"}/>
                <div style={{height: '80px'}}></div>
                <RegistrationInput type={'password'} id={'setNewPassword'} text={''} value={newPassword}
                                   onChange={inputOnChangeHandler}/>
                <ForgotError error={updatePasswordError}/>
                <p>Create new password and we will send you further instructions to email</p>
                <ForgotButton text={'Create new password'} onClick={buttonOnClickHandler}/>
            </div>
        </div>
    );
};

export default UpdatePassword;