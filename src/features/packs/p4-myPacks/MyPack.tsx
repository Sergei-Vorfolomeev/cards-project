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
import {useNavigate, useParams} from 'react-router-dom'
import {addCardTC, getCardsTC} from '../cardsReducer'
import {MyPackTable} from './myPackTable/myPackTable'
import {SuperPagination} from "../p5-commonComponents/commonPackComponents/pagination/SuperPagination";
import {getPacksTC} from "../packsReducer";
import useDebouncedEffect from "use-debounced-effect";

export const MyPack = () => {
    const cardsData = useAppSelector(state => state.cards.cards)
    const myUserId = useAppSelector(state => state.auth._id)
    const isAuth = useSelector(getIsAuth)
    const isLoading = useAppSelector(state => state.app.loading)
    const errorMessage = useAppSelector(state => state.app.errorMessage)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const minCardsCountValue = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCountValue = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let {packId} = useParams()


    useEffect(() => {

        if (isAuth) {
            packId && dispatch(getPacksTC({user_id: myUserId}))
            console.log(packId)
        } else {
            navigate('/login')
        }
    }, [myUserId, packId, isAuth, dispatch, navigate])

    const [myPacksInput, setMyPacksInput] = useState<string>('')

    const onChangeMyPacksInput = (e: ChangeEvent<HTMLInputElement>) =>
        setMyPacksInput(e.currentTarget.value)

    const addCardOnClickHandler = () => {
        packId && dispatch(addCardTC(packId))
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(getPacksTC({min: minCardsCountValue, max: maxCardsCountValue, page: newPage, pageCount: newCount}))
    }

    useDebouncedEffect(() => {
        dispatch(getPacksTC({min, max, user_id: myUserId, packName: myPacksInput}))
    }, 1000, [min, max, myPacksInput])


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
                    <PackButton name={'Add new card'} onClick={addCardOnClickHandler}/>
                </div>
                <PacksInput
                    id={'myPacksInput'}
                    text={'Search'}
                    type={'text'}
                    value={myPacksInput}
                    width={'98%'}
                    onChange={onChangeMyPacksInput}
                />
                <div className={s.myPacks_table}>
                    <MyPackTable cardsData={cardsData} minMaxCardsValue={[minCardsCountValue, maxCardsCountValue]}/>
                    {/*<TableForPacks packsData={cardPacks} />*/}
                </div>
                <div className={s.myPacks_pagination}>
                    <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount}
                                     onChange={onChangePagination}/>
                </div>
            </div>
            {errorMessage && <Error message={errorMessage}/>}
        </div>
    )
}
