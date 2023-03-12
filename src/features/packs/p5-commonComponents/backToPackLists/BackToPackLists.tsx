import React from 'react';
import s from './BackToPackLists.module.css'
import arrowBack from '../../../../common/assets/pictures/arrowBack.svg'

export const BackToPackLists = () => {
    return (
        <div className={s.backToPackLists}>
            <img src={arrowBack} alt={'arrow back'}/>
            <span>Back to Packs List</span>
        </div>
    );
};

