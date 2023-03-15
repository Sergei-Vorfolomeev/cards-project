import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './AllPacks.module.css'
import {PacksTitle} from "../p5-commonComponents/commonPackComponents/packTitle/PacksTitle";
import {PackButton} from "../p5-commonComponents/commonPackComponents/packButton/PackButton";
import {PacksInput} from "../p5-commonComponents/commonPackComponents/packsInput/PacksInput";
import {ShowPacksCards} from "../p5-commonComponents/usefullComponents/showPacksCards/ShowPacksCards";
import {NumberOfCards} from "../p5-commonComponents/usefullComponents/numberOfCards/NumberOfCards";
import cleanFiltersIcon from '../../../common/assets/pictures/cleanFiletetIcon.svg'
import { useNavigate } from "react-router-dom";
import {PATH} from '../../../common/components/routes/RoutesComponent';
import {TableForPacks} from "../p5-commonComponents/commonPackComponents/tables/tableForPacks/allPacksTable/TableForPacks";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getAllPacksTC} from "../packsReducer";
import { SuperPagination } from "../p5-commonComponents/commonPackComponents/packPagination/SuperPagination";


export const AllPacks = () => {

    const packs = useAppSelector(state => state.packs.cardPacks)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')
    const [minMaxCardsValue, setMinMaxCardsValue] = React.useState<number[]>([0, 100]);

    //for pagination
    const page = useAppSelector(state => state.packs.page)
    const count = useAppSelector(state => state.packs.pageCount)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(getAllPacksTC({min: minCardsCount, max: maxCardsCount, page: newPage, pageCount: newCount, }))
    }
    //end for pagination

    //for filtration
    const onChangeCardsFilter = () =>{
        dispatch(getAllPacksTC({min: minMaxCardsValue[0], max: minMaxCardsValue[1], page: 1, pageCount: 10}))
    }
    //end for filtration

    useEffect(() => {
        dispatch(getAllPacksTC({min: 0, max: 100, page: 1, pageCount: 10}))

    }, [])

    const buttonOnClickHandler = () => {
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const showPacksCardsOnClickHandler = () => {
        return navigate(PATH.PACK_MY)
    }
    const minMaxCardsValueChangeHandler = (event: Event, newValue: number | number[]) => {
        setMinMaxCardsValue(newValue as number[]);
    };



    return (
        <div className={s.allPacks}>
            <div className={s.allPacks_container}>
                <div className={s.allPacks_titleAndButton}>
                    <PacksTitle title={'Packs list'}/>
                    <PackButton name={'Add new pack'} onClick={buttonOnClickHandler}/>
                </div>
                <div className={s.allPacks_interface}>
                    <PacksInput id={'allPacks'} text={'Provide your text'} type={'text'} value={inputValue}
                                width={'413px'} onChange={inputOnChangeHandler}/>
                    <ShowPacksCards onClick={showPacksCardsOnClickHandler}/>
                    <NumberOfCards onChange={minMaxCardsValueChangeHandler} value={minMaxCardsValue}/>
                    {/* filtration */}
                    <button onClick={onChangeCardsFilter}>
                        <img src={cleanFiltersIcon} alt={"filter-image"}/>
                    </button>
                </div>
                <div className={s.allPacks_table}>
                    <TableForPacks packsData={packs}/>
                </div>
                <div className={s.allPacks_pagination}></div>

                {/* pagination */}
                <SuperPagination
                  page={page}
                  itemsCountForPage={count}
                  totalCount={totalCount}
                  onChange={onChangePagination}
                />
            </div>

        </div>
    );
};


