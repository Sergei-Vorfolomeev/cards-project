import React from 'react';
import s from './ActionsWithCards.module.css'
import changePack from '../../../../common/assets/pictures/changePack.svg'
import deletePack from '../../../../common/assets/pictures/deletePack.svg'


export const ActionsWithCards = () => {
    return (
        <div className={s.actionsWithCards}>
            <button style={{backgroundImage:`url(${changePack})`}}></button>
            <button style={{backgroundImage:`url(${deletePack})`}}></button>
        </div>
    );
};

