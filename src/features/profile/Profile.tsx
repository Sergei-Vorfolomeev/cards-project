import React, { useEffect, useState } from "react";
import s from "./Profile.module.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Navigate, useParams } from "react-router-dom";
import { changeDataTC, logoutTC, meTC } from "../login/authReducer";
import { EditableSpan } from "./editable-span/EditableSpan";
import { Loader } from "../../common/components/loader/Loader";
import avatar from "./img/avatar.jpg"


export const Profile = () => {

  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth);
  const name = useAppSelector<string>(state => state.auth.name);
  const loading = useAppSelector(state => state.registrationReducer.loading)

  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(logoutTC());
  };

  const onChangeHandler = (newValue: string) => {
    if (newValue) {
      dispatch(changeDataTC({ name: newValue }));
    }
  };

  console.log(isAuth);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (loading ? <Loader/> : <div className={s.profile_container}>
    <div className={s.backbutton_wrapper}>
      <button className={s.profile_backbutton}>Back to Packs List</button>
    </div>
    <div className={s.profile_wrapper}>
      <h2>Personal Information</h2>
      <div>
        <div>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={s.profileName}>
          <EditableSpan value={name} onChange={onChangeHandler} />
        </div>
        <div className={s.profileEmail}>
          'j&johnson@gmail.com'
        </div>
        <button className={s.profileButton} onClick={onClickHandler}>Log out</button>
      </div>
    </div>
  </div>);
};
