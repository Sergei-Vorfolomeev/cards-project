import React, {useState} from 'react';
import s from './PackButton.module.css'
import {useAppSelector} from "../../../../../app/store";

type PropsType = {
    name: string
    onClick: () => void
}

export const PackButton = ({name, onClick}: PropsType) => {

    return <button className={s.packButton} onClick={onClick} >{name}</button>
};
