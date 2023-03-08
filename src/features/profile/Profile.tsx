import React from "react";
import s from "./Profile.module.css";
import { Dispatch } from "redux";
import { authAPI } from "../login/authAPI";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setProfileTC } from "./profile-reducer";
import { useNavigate } from "react-router-dom";
import { changeDataTC, logoutTC } from "../login/authReducer";
import { EditableSpan } from "../../common/components/editable-span/EditableSpan";


export const Profile = () => {

  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const name = useAppSelector<string>(state => state.auth.name)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(logoutTC())
  }

  const onChangeHandler = (newValue: string) => {
    if(newValue){
      dispatch(changeDataTC({name:newValue}))
    }
  }

  if (!isAuth) {
    navigate('/login')
  }
  return <div className={s.profile_container}>
    <div className={s.backbutton_wrapper}>
      <button className={s.profile_backbutton}>Back to Packs List</button>
    </div>
    <div className={s.profile_wrapper}>
      <h2>Personal Information</h2>
      <div>
        <div>
          <img src="/" alt="" />
        </div>
        <div>
          <EditableSpan value={name} onChange={onChangeHandler}/>
          <img src="/" alt="" />
        </div>
        <div>
         'j&johnson@gmail.com'
        </div>
        <button className={s.profile_button} onClick={onClickHandler}>Log out</button>
      </div>
    </div>
  </div>;
};
