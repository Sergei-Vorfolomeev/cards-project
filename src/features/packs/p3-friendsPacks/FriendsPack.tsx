import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './FriendsPack.module.css'
import {BackToPackLists} from "../p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";
import {PacksTitle} from "../p5-commonComponents/commonPackComponents/packTitle/PacksTitle";
import {PackButton} from "../p5-commonComponents/commonPackComponents/packButton/PackButton";
import {PacksInput} from "../p5-commonComponents/commonPackComponents/packsInput/PacksInput";
import {
    FriendsPackTable
} from "./friendsPackTable/FriendsPackTable";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getCardsTC} from "../cardsReducer";
import {useParams} from "react-router-dom";
import {Loader} from "../../../common/components/loader/Loader";
import {SuperPagination} from "../p5-commonComponents/commonPackComponents/pagination/SuperPagination";
import {getPacksTC} from "../packsReducer";
import useDebouncedEffect from "use-debounced-effect";
import {LocalLoader} from '../p5-commonComponents/usefullComponents/localLoader/LocalLoader';

export const FriendsPack = () => {

    const dispatch = useAppDispatch()
    const tableData = useAppSelector(state => state.cards.cards)
    const isLoading = useAppSelector(state => state.app.loading)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const buttonDisableBecauseProcess = useAppSelector(state => state.packs.buttonDisableBecauseProcess)

    const [inputValue, setInputValue] = useState<string>('')

    const inputOnChaneHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(getPacksTC({page: newPage, pageCount: newCount, packName: inputValue, min, max}))
    }

    let {packId} = useParams()

    useEffect(() => {
        packId &&
        dispatch(getCardsTC({cardsPack_id: packId}))
    }, [packId])

    useDebouncedEffect(() => {
        dispatch(getCardsTC({cardQuestion: inputValue, cardsPack_id: packId}))},
            1000, [inputValue])

    return (
        <div className={s.friendsPack}>
            <div className={s.friendsPack_container}>
                <BackToPackLists/>
                <div className={s.friendsPack_titleAndButton}>
                    <PacksTitle title={'Friend’s Pack'}/>
                    <PackButton disable={buttonDisableBecauseProcess } name={'Learn to pack'} onClick={() => {
                    }}/>
                </div>
                <PacksInput id={'friendsPackInput'} text={'Search'} type={'text'} value={inputValue} width={'98%'}
                            onChange={inputOnChaneHandler}/>
                {isLoading ? <LocalLoader/> :
                    tableData.length === 0 ?
                        <div className={s.friendsPack_noCardsWasFound}>NO PACKS WERE FOUND. TRY AGAIN ;)</div> :
                        <div className={s.friendsPack_table}>
                            <FriendsPackTable cardsData={tableData}/>
                        </div>
                }
                <div className={s.friendsPack_pagintion}>
                    <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount}
                                     onChange={onChangePagination}/>

                </div>
            </div>
        </div>
    );
};
