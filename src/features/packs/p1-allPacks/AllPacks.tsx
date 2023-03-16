import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './AllPacks.module.css'
import {PacksTitle} from '../p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import {PackButton} from '../p5-commonComponents/commonPackComponents/packButton/PackButton'
import {PacksInput} from '../p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import {ShowPacksCards} from '../p5-commonComponents/usefullComponents/showPacksCards/ShowPacksCards'
import {NumberOfCards} from '../p5-commonComponents/usefullComponents/numberOfCards/NumberOfCards'
import cleanFiltersIcon from '../../../common/assets/pictures/cleanFiletetIcon.svg'
import {useNavigate} from 'react-router-dom'
import {PATH} from '../../../common/components/routes/RoutesComponent'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {addPackTC, getPacksTC, setMinMaxCardValuesAC, toggleIsMyPacksAC} from '../packsReducer'
import {getIsAuth} from '../../login/loginSelectors'
import {useSelector} from 'react-redux'
import {Loader} from '../../../common/components/loader/Loader'
import {Error} from '../../../common/components/error/Error'
import {TableForPacks} from './allPacksTable/TableForPacks'
import {SuperPagination} from "../p5-commonComponents/commonPackComponents/pagination/SuperPagination";
import {debounce} from "@mui/material";
import {getCardsTC} from "../cardsReducer";
import useDebouncedEffect from 'use-debounced-effect'

export const AllPacks = () => {
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isAuth = useSelector(getIsAuth)
    const isLoading = useAppSelector(state => state.app.loading)
    const errorMessage = useAppSelector(state => state.app.errorMessage)
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks)
    const user_id = useAppSelector(state => state.auth._id)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')
    const [minMaxCardsValue, setMinMaxCardsValue] = React.useState<number[]>([min, max])

    useEffect(() => {
        if (isAuth) {
            if (!isMyPacks) {
                dispatch(getPacksTC({}))
            } else {
                dispatch(getPacksTC({user_id}))
            }
        } else {
            navigate('/login')
        }
    }, [isAuth, isMyPacks])


    const addPackOnClickHandler = () => {
        dispatch(addPackTC())
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const showPacksCardsOnClickHandler = () => {
        dispatch(toggleIsMyPacksAC(!isMyPacks))
    }
    const minMaxCardsValueChangeHandler = (event: Event, newValue: number | number[]) => {
        setMinMaxCardsValue(newValue as number[])
    }

    const noFiltersOnClickHandler = () => {
        dispatch(getPacksTC({min: 0, max: 100, packName: 'english', pageCount: 10, page: 1}))
        setMinMaxCardsValue([0, 110])
        setInputValue('')
    }

    useDebouncedEffect(() => {
        isMyPacks ?
            dispatch(getPacksTC({min: minMaxCardsValue[0], max: minMaxCardsValue[1], packName: inputValue, user_id})) :
            dispatch(getPacksTC({min: minMaxCardsValue[0], max: minMaxCardsValue[1], packName: inputValue})), 1000
    }, 1000, [minMaxCardsValue[0], minMaxCardsValue[1], inputValue])


    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(getPacksTC({min: minMaxCardsValue[0], max: minMaxCardsValue[1], page: newPage, pageCount: newCount}))
    }

    return (
        <div className={s.allPacks}>
            {isLoading && <Loader/>}
            <div className={s.allPacks_container}>
                <div className={s.allPacks_titleAndButton}>
                    <PacksTitle title={'Packs list'}/>
                    <PackButton name={'Add new pack'} onClick={addPackOnClickHandler}/>
                </div>
                <div className={s.allPacks_interface}>
                    <PacksInput
                        id={'allPacks'}
                        text={'Provide your text'}
                        type={'text'}
                        value={inputValue}
                        width={'413px'}
                        onChange={inputOnChangeHandler}
                    />
                    <ShowPacksCards onClick={showPacksCardsOnClickHandler} isMyPacks={isMyPacks}/>
                    <NumberOfCards onChange={minMaxCardsValueChangeHandler} value={minMaxCardsValue}/>
                    <img onClick={noFiltersOnClickHandler} src={cleanFiltersIcon}/>
                </div>
                {packs.length === 0 ?
                    <div className={s.allPacks_noPacksWasFound}>NO PACKS WERE FOUND. REVISE YOUR FILTERS ;)</div> :
                    <div className={s.allPacks_table}>
                        <TableForPacks packsData={packs} minMaxCardsValue={minMaxCardsValue}/>
                    </div>
                }
                <div className={s.allPacks_pagination}>
                    <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount}
                                     onChange={onChangePagination}/>
                </div>
            </div>
            {errorMessage && <Error message={errorMessage}/>}
        </div>
    )
}
