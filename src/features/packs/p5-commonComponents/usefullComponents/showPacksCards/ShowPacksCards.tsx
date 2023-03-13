import React from 'react';
import s from './ShowPacksCards.module.css'

type PropsType = {
    onClick: () => void
}

export const ShowPacksCards = ({onClick}:PropsType) => {
    return (
        <div className={s.showPacksCards}>
            <h3>Show packs cards</h3>
            <div className={s.showPacksCards_wrapper}>
                <span onClick={onClick} className={s.showPacksCards_myCards}>My</span >
                <span className={s.showPacksCards_allCards}>All</span>
            </div>
        </div>
    );
};

