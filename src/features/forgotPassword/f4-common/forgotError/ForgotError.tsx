import React from 'react';
import s from './ForgotError.module.css'

const ForgotError = ({error}:{error:string}) => {
    return <div className={s.forgotError}> {error} </div>
};

export default ForgotError;