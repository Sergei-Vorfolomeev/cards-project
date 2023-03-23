import React from "react";
import s from "./BackToPackLists.module.css";
import arrowBack from "common/assets/pictures/arrowBack.svg";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/components/routes/RoutesComponent";
import { useAppDispatch } from "app/store";
import { setCardDefaultsAC } from "features/packs/cardsReducer";

type PropsType = {
  navigation?: string;
  buttonName?: string;
};

export const BackToPackLists = ({ navigation, buttonName }: PropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    navigation ? navigate(navigation) : navigate(PATH.PACKS_ALL);

    dispatch(setCardDefaultsAC());
  };

  return (
    <div className={s.backToPackLists} onClick={onClickHandler}>
      <img src={arrowBack} alt={"arrow back"} />
      <span> {buttonName ? buttonName : " Back to Packs List"}</span>
    </div>
  );
};
