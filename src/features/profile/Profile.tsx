import React from "react";
import s from "./Profile.module.css";
import { Dispatch } from "redux";
import { authAPI } from "../login/authAPI";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setProfileTC } from "./profile-reducer";


export const Profile = () => {

  const dispatch = useAppDispatch();

  const onclickHandler = () => {
    dispatch(setProfileTC())
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
          <span>Ivan</span>
          <img src="/" alt="" />
        </div>
        <div>
          j&johnson@gmail.com
        </div>
        <button className={s.profile_button} onClick={onclickHandler}>Log out</button>
      </div>
    </div>
  </div>;
};
