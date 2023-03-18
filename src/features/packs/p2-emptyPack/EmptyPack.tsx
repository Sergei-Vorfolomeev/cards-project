import React, {useEffect} from 'react';
import s from './EmptyPack.module.css'
import {PacksTitle} from "../p5-commonComponents/commonPackComponents/packTitle/PacksTitle";
import {PackButton} from "../p5-commonComponents/commonPackComponents/packButton/PackButton";
import {BackToPackLists} from "../p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Navigate, useParams} from "react-router-dom";
import {addCardTC, getCardsTC} from "../cardsReducer";


export const EmptyPack = () => {

    const cardsCount = useAppSelector(state => state.cards.cardsTotalCount)
    const dispatch = useAppDispatch()


    const packId = useParams().packId
    const packName = useParams().packName


    if (cardsCount !== 0) {
        return <Navigate to={`/myPack/${packId}/${packName}`}/>
    }


    const onClickButtonHandler = () => {
        dispatch(addCardTC(packId!));
    }

    return (
        <div className={s.emptyPacks_container}>
            <div className={s.emptyPacks}>

                <BackToPackLists/>
                <PacksTitle title={packName!}/>
                <div className={s.emptyPacks_info}>This pack is empty. Click add new card to fill this pack</div>
                <PackButton name={'Add new card'} onClick={onClickButtonHandler}/>
            </div>
        </div>
    );
};
