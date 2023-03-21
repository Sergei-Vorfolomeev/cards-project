import React from 'react';
import s from './LearnTitle.module.css'

type PropsType = {
    title: string
}

export const LearnTitle = ({title}: PropsType) => {
    return (
        <>
            <span className={s.learnTitle_text}>Learn: </span>
            <h2 className={s.learnTitle}>{title}</h2>
        </>)
};

