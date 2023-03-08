import React from 'react';
import s from './ForgotTitle.module.css'

const ForgotTitle = ({text}: {text:string}) => {
    return <h2 className={s.forgotTitle}>{text}</h2>
};

export default ForgotTitle;