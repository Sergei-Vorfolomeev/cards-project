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
import { Loader } from "../../../common/components/loader/Loader";
import { useSelector } from "react-redux";
import { getLoading } from "../../../app/appSelectors";


export const AllPacks = () => {

    const packs = useAppSelector(state => state.packs.cardPacks)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')
    const [minMaxCardsValue, setMinMaxCardsValue] = useState<number[]>([0, 100]);

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
    const onChangeCardsFilter = (newValue:number[]) =>{
        dispatch(getAllPacksTC({min: newValue[0], max: newValue[1], page: 1, pageCount: count}))
    }
    const resetCardsFilter = () =>{
        dispatch(getAllPacksTC({page: 1, pageCount: count}))
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
    const minMaxCardsValueChangeHandler = ( newValue: number[]) => {
        setMinMaxCardsValue(newValue);
    };

    const loading = useSelector(getLoading)



    return (
            <div className={s.allPacks}>
                <div className={s.allPacks_container}>
                    <div className={s.allPacks_titleAndButton}>
                        <PacksTitle title={'Packs list'} />
                        <PackButton name={'Add new pack'} onClick={buttonOnClickHandler} />
                    </div>
                    <div className={s.allPacks_interface}>
                        <PacksInput id={'allPacks'} text={'Provide your text'} type={'text'} value={inputValue}
                                    width={'413px'} onChange={inputOnChangeHandler} />
                        <ShowPacksCards onClick={showPacksCardsOnClickHandler} />
                        <NumberOfCards onChange={minMaxCardsValueChangeHandler} value={minMaxCardsValue} setMinMaxCardsValue={setMinMaxCardsValue} onChangeCardsFilter={onChangeCardsFilter}/>
                        {/* filtration */}
                        <button onClick={resetCardsFilter} className={s.filter_button}>
                            <img src={cleanFiltersIcon} alt={"filter-image"} />
                        </button>
                    </div>

                          <div className={s.allPacks_table}>
                              {
                                  loading ? <Loader /> :
                              <TableForPacks packsData={packs} minMaxCardsValue={minMaxCardsValue} />
                              }
                          </div>

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


