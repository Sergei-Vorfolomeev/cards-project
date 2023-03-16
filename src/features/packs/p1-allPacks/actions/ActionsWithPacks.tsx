import React from 'react';
import s from './ActionsWithPacks.module.css'
import addPack from '../../../../common/assets/pictures/addPack.svg'
import changePack from '../../../../common/assets/pictures/changePack.svg'
import deletePack from '../../../../common/assets/pictures/deletePack.svg'

type PropsType = {
    isMyPack: boolean
    cardsQuantity: number
}

export const ActionsWithPacks = ({isMyPack,cardsQuantity}: PropsType) => {

    if (!isMyPack) {
        return <div className={s.actionsWithPacks}>
            <button style={{backgroundImage:`url(${addPack})`}}></button>
        </div>
    }

    return (
        <div className={s.actionsWithPacks}>
            <button style={{backgroundImage:`url(${addPack})`}}></button>
            <button style={{backgroundImage:`url(${changePack})`}}></button>
            <button style={{backgroundImage:`url(${deletePack})`}}></button>
        </div>
    );
};

