import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './FriendsPack.module.css'
import {BackToPackLists} from "../p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";
import {PacksTitle} from "../p5-commonComponents/commonPackComponents/packTitle/PacksTitle";
import {PackButton} from "../p5-commonComponents/commonPackComponents/packButton/PackButton";
import {PacksInput} from "../p5-commonComponents/commonPackComponents/packsInput/PacksInput";
import {
    FriendsPackTable
} from "../p5-commonComponents/commonPackComponents/tables/tableForPacks/friendsPackTable/FriendsPackTable";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getFriendsCardsTC} from "../cardsReducer";

export const FriendsPack = () => {

    const dispatch = useAppDispatch()
    const tableData = useAppSelector(state=> state.cards.cards)
    const [inputValue, setInputValue] = useState<string>('')
    const inputOnChaneHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)


    useEffect(() => {
        dispatch(getFriendsCardsTC("6389f1095eac3fed550edac5"))
    },[])


    console.log(tableData)
    return (
        <div className={s.friendsPack}>
            <div className={s.friendsPack_container}>
                <BackToPackLists/>
                <div className={s.friendsPack_titleAndButton}>
                    <PacksTitle title={'Friend’s Pack'}/>
                    <PackButton name={'Learn to pack'} onClick={() => {
                    }}/>
                </div>
                <PacksInput id={'friendsPackInput'} text={'Search'} type={'text'} value={inputValue} width={'98%'}
                            onChange={inputOnChaneHandler}/>
                <div className={s.friendsPack_table}>
                    <FriendsPackTable  cardsData={tableData}/>
                </div>
            </div>
        </div>
    );
};
