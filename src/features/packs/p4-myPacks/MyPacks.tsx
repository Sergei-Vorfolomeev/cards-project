import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './MyPack.module.css'
import {BackToPackLists} from "../p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";
import {PackButton} from "../p5-commonComponents/commonPackComponents/packButton/PackButton";
import {PacksTitle} from "../p5-commonComponents/commonPackComponents/packTitle/PacksTitle";
import myPackMenu from '../../../common/assets/pictures/myPackMenu.svg'
import {PacksInput} from "../p5-commonComponents/commonPackComponents/packsInput/PacksInput";
import {MyPackTable} from "./myPackTable/myPackTable";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getCardsTC} from "../cardsReducer";
import {Loader} from "../../../common/components/loader/Loader";
import {Error} from "../../../common/components/error/Error";

export const MyPacks = () => {

    const dispatch = useAppDispatch()
    const myCardsData = useAppSelector(state=>state.cards.cards)
    const myUserId = useAppSelector(state=>state.auth._id)
    const isLoading = useAppSelector(state => state.app.loading)
    const errorMessage = useAppSelector(state => state.app.errorMessage)

    // userId для теста пока нет своих карточек '63de3dc3b10c7af78a7bd186'

    useEffect(()=>{
        dispatch(getCardsTC(myUserId))
    },[myUserId])

    const [myPacksInput, setMyPacksInput] = useState<string>('')
    const onChangeMyPacksInput = (e: ChangeEvent<HTMLInputElement>) => setMyPacksInput(e.currentTarget.value)

    return (
        <div className={s.myPacks}>
            {isLoading && <Loader/>}
            <div className={s.myPacks_container}>
                <BackToPackLists/>
                <div className={s.myPacks_titleAndButton}>
                    <div className={s.myPacks_titleMenu}>
                        <PacksTitle title={'My Pack'}/>
                        <img src={myPackMenu}/>
                    </div>
                    <PackButton name={'Add new card'} onClick={() => {
                    }}/>
                </div>
                <PacksInput id={'myPacksInput'} text={'Search'} type={'text'} value={myPacksInput} width={'98%'}
                            onChange={onChangeMyPacksInput}/>
                <div className={s.myPacks_table}>
                    <MyPackTable cardsData={myCardsData}/>
                </div>
            </div>
            {errorMessage && <Error message={errorMessage} />}
        </div>
    );
};
