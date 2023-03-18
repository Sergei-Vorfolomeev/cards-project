import React, {useState} from 'react';
import s from './PackButton.module.css'
import {useAppSelector} from "../../../../../app/store";

type PropsType = {
    name: string
    onClick: () => void
    disable: boolean
}

export const PackButton = ({name, onClick,disable}: PropsType) => {

    return <button disabled={disable} className={s.packButton} onClick={onClick} >{name}</button>
};
