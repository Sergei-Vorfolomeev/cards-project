import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./Registration.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { Loader } from "../../common/components/loader/Loader";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setRegisterTC } from "./registration-reducer";
import RegistrationInput from "./registrationInput/RegistrationInput";

const Registration = () => {

  const errorApi = useAppSelector<any>(state => state.registrationReducer.error);
  const loading = useAppSelector(state => state.registrationReducer.loading);
  const register = useAppSelector(state => state.registrationReducer.register);
  const dispatch = useAppDispatch();

  const [emailValue, setEmailValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [registrationError, setRegistrationError] = useState<string>("");

  useEffect(() => {
    setRegistrationError(errorApi);
  }, [errorApi]);

  const ButtonOnClickHandler = () => {
    setRegistrationError("");
    if (password && passwordCheck) {
      if (password === passwordCheck) {
        if (password.length > 2) {
          dispatch(setRegisterTC(emailValue, password));
          setRegistrationError(errorApi);
        } else {
          setRegistrationError("Password is not safe. It must be minimum 3 symbols");
        }
      } else {
        setRegistrationError("Password is different from the confirmed password");
      }
    } else {
      setRegistrationError("Create password and confirm it");
    }
  };

// OnChangeHandlers

  const emailOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value);
    setRegistrationError("");
  };
  const emailOnBlurHandler = () => {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    !EMAIL_REGEXP.test(emailValue) ? setRegistrationError("Add correct email") : setRegistrationError("");
  };

  const passwordOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    registrationError !== "Add correct email" ? setRegistrationError("") : setRegistrationError("Add correct email");
  };
  const passwordCheckOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.currentTarget.value);
    registrationError !== "Add correct email" ? setRegistrationError("") : setRegistrationError("Add correct email");
  };

  if (register) {
    return <Navigate to={"/login"} />;
  } else {
    return (
      <div className={s.registration}>
        {loading && <Loader />}
        <h2>Sign Up</h2>
        <form>
          <RegistrationInput type={"email"} id={"email"} text={"Email"} value={emailValue}
                             onChange={emailOnChangeHandler} onBlur={emailOnBlurHandler} />
          <RegistrationInput type={"password"} id={"password"} text={"Password"} value={password}
                             onChange={passwordOnChangeHandler} />
          <RegistrationInput type={"password"} id={"passwordCheck"} text={"Confirm password"}
                             value={passwordCheck}
                             onChange={passwordCheckOnChangeHandler} />
          <button className={s.registration_button} type={"submit"} onClick={ButtonOnClickHandler}>Sign Up
          </button>
        </form>
        <div className={s.registration_error}>{registrationError}</div>
        <p className={s.registration_haveAccount}>Already have an account?</p>
        <p className={s.registration_loginReference}><NavLink to={"/login"}>Sign In</NavLink></p>
      </div>
    );
  }
};


export default Registration;