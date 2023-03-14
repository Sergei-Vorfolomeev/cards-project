import React from 'react';
import s from './EmptyPack.module.css'
import {PacksTitle} from "../p5-commonComponents/commonPackComponents/packTitle/PacksTitle";
import {PackButton} from "../p5-commonComponents/commonPackComponents/packButton/PackButton";
import {BackToPackLists} from "../p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";



export const EmptyPack = () => {
    return (
        <div className={s.emptyPacks}>
            <div className={s.emptyPacks_container}>
                <BackToPackLists/>
                <PacksTitle title={'Name Pack'}/>
                <div className={s.emptyPacks_info}>This pack is empty. Click add new card to fill this pack</div>
                <PackButton name={'Add new card'} onClick={() => {
                }}/>
            </div>
        </div>
    );
};
