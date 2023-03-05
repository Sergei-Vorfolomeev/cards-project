import React, {ChangeEvent, useState} from 'react';
import s from "./RegistrationInput.module.css";
import passwordEye from "../../../common/assets/pictures/password-eye.svg";


type PropsType = {
    type: string
    id: string
    text: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
}

const RegistrationInput = (props: PropsType) => {

    const [passwordVisability, setPasswordVisability] = useState<string>(props.type)

    const imgOnClickHandler = () => {
        passwordVisability === 'password' ? setPasswordVisability('text') : setPasswordVisability('password')
    }

    const onBlurHandler = () => props.onBlur ? props.onBlur() : ''


    return (
        <div className={s.registration_input}>
            <label htmlFor={props.id} className={s.registrationLabel}>{props.text}</label>
            <input type={passwordVisability} id={props.id} value={props.value} onChange={props.onChange}
                   onBlur={props.onBlur}/>
            {props.type !== 'email' && <img className={s.registration_eye} src={passwordEye} onClick={imgOnClickHandler}
            />}
        </div>
    );
};

export default RegistrationInput;