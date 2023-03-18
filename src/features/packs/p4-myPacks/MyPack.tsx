import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './MyPack.module.css'
import {BackToPackLists} from '../p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import {PackButton} from '../p5-commonComponents/commonPackComponents/packButton/PackButton'
import {PacksTitle} from '../p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import myPackMenu from '../../../common/assets/pictures/myPackMenu.svg'
import {PacksInput} from '../p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {Loader} from '../../../common/components/loader/Loader'
import {Error} from '../../../common/components/error/Error'
import {useSelector} from 'react-redux'
import {getIsAuth} from '../../login/loginSelectors'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {addCardTC, getCardsTC} from '../cardsReducer'
import {MyPackTable} from './myPackTable/myPackTable'
import {SuperPagination} from "../p5-commonComponents/commonPackComponents/pagination/SuperPagination";
import {getPacksTC} from "../packsReducer";
import useDebouncedEffect from "use-debounced-effect";
import {LocalLoader} from "../p5-commonComponents/usefullComponents/localLoader/LocalLoader";


export const MyPack = () => {
    const cardsData = useAppSelector(state => state.cards.cards)

    const isAuth = useSelector(getIsAuth)
    const isLoading = useAppSelector(state => state.app.loading)
    const errorMessage = useAppSelector(state => state.app.errorMessage)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const minCardsCountValue = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCountValue = useAppSelector(state => state.packs.maxCardsCount)
    const buttonDisableBecauseProcess = useAppSelector(state => state.packs.buttonDisableBecauseProcess)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let {packId, packName} = useParams()


    useEffect(() => {
        if (isAuth) {
            dispatch(getCardsTC({cardsPack_id: packId}))
        } else {
            navigate('/login')
        }
    }, [packId])

    const [myPacksInput, setMyPacksInput] = useState<string>('')

    const onChangeMyPacksInput = (e: ChangeEvent<HTMLInputElement>) =>
        setMyPacksInput(e.currentTarget.value)

    const addCardOnClickHandler = () => {
        packId && dispatch(addCardTC(packId))
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(getPacksTC({
            min: minCardsCountValue,
            max: maxCardsCountValue,
            page: newPage,
            pageCount: newCount,
            packName: myPacksInput
        }))
    }

    useDebouncedEffect(() => {
            dispatch(getCardsTC({cardsPack_id: packId, cardQuestion: myPacksInput})
            )
        },
        1000,
        [myPacksInput])


    return (
        <div className={s.myPacks}>
            <div className={s.myPacks_container}>
                <BackToPackLists/>
                <div className={s.myPacks_titleAndButton}>
                    <div className={s.myPacks_titleMenu}>
                        <PacksTitle title={`My Pack:  ${packName!}`}/>
                        <img src={myPackMenu}/>
                    </div>
                    <PackButton name={'Add new card'} onClick={addCardOnClickHandler} disable={buttonDisableBecauseProcess}/>
                </div>
                <PacksInput
                    id={'myPacksInput'}
                    text={'Search'}
                    type={'text'}
                    value={myPacksInput}
                    width={'98%'}
                    onChange={onChangeMyPacksInput}
                />

                {isLoading ? <LocalLoader/> :
                    cardsData.length !== 0 ?
                        <div className={s.myPacks_table}>
                            <MyPackTable cardsData={cardsData}/>
                        </div>
                        :
                        myPacksInput.length !== 0 ?
                            <div className={s.myPacks_noPacksWasFound}>NO PACKS WERE FOUND. REVISE YOUR FILTERS
                                ;)</div> :
                            <Navigate to={`/emptyPack/${packId}/${packName}`}/>
                }
                <div className={s.myPacks_pagination}>
                    <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount}
                                     onChange={onChangePagination}/>
                </div>
            </div>
            {errorMessage && <Error message={errorMessage}/>}
        </div>
    )
}
