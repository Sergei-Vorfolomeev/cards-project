import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './AllPacks.module.css'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { PacksInput } from 'features/packs/p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import { ShowPacksCards } from 'features/packs/p5-commonComponents/usefullComponents/showPacksCards/ShowPacksCards'
import { NumberOfCards } from 'features/packs/p5-commonComponents/usefullComponents/numberOfCards/NumberOfCards'
import cleanFiltersIcon from 'common/assets/pictures/cleanFiletetIcon.svg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'app/store'
import { addPackTC, getPacksTC } from 'features/packs/packsReducer'
import { useSelector } from 'react-redux'
import { Error } from 'common/components/error/Error'
import { SuperPagination } from 'features/packs/p5-commonComponents/commonPackComponents/pagination/SuperPagination'
import useDebouncedEffect from 'use-debounced-effect'
import { LocalLoader } from 'features/packs/p5-commonComponents/usefullComponents/localLoader/LocalLoader'
import { PATH } from 'common/components/routes/RoutesComponent'
import { TableForPacks } from 'features/packs/p1-allPacks/allPacksTable/TableForPacks'
import { getIsAuthSelector, getUserIdSelector } from 'features/login/selectors/loginSelectors'
import { getErrorMessageSelector, getLoadingSelector } from 'app/appSelectors'
import {
  getPackPageCountSelector,
  getPackPageSelector,
  getPacksSelector,
  getPageTotalCountSelector,
} from 'features/packs/selectors/packsSelectors'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'

export const AllPacks = () => {
  const packs = useSelector(getPacksSelector)
  const isAuth = useSelector(getIsAuthSelector)
  const isLoading = useSelector(getLoadingSelector)
  const errorMessage = useSelector(getErrorMessageSelector)
  const user_id = useSelector(getUserIdSelector)
  const page = useSelector(getPackPageSelector)
  const pageCount = useSelector(getPackPageCountSelector)
  const totalCount = useSelector(getPageTotalCountSelector)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  let minLocalStorage = localStorage.getItem('minLocalStorage')
    ? localStorage.getItem('minLocalStorage')
    : '0'
  let maxLocalStorage = localStorage.getItem('maxLocalStorage')
    ? localStorage.getItem('maxLocalStorage')
    : '110'

  const [inputValue, setInputValue] = useState('')
  const [minMaxCardsValue, setMinMaxCardsValue] = useState<number[]>([
    +minLocalStorage!,
    +maxLocalStorage!,
  ])

  let PacksTypeLocalStorage = localStorage.getItem('PackType')
    ? localStorage.getItem('PackType')
    : 'AllPacks'
  let myPacks = PacksTypeLocalStorage !== 'AllPacks'

  const [isMyPacks, setIsMyPacks] = useState(myPacks)

  useEffect(() => {
    if (isAuth) {
      if (isMyPacks) {
        dispatch(getPacksTC({ user_id, min: +minLocalStorage!, max: +minLocalStorage! }))
        localStorage.setItem('PackType', 'MyPacks')
        setMinMaxCardsValue([+minLocalStorage!, +maxLocalStorage!])
      } else {
        dispatch(getPacksTC({ min: +minLocalStorage!, max: +minLocalStorage! }))
        localStorage.setItem('PackType', 'AllPacks')
        setMinMaxCardsValue([+minLocalStorage!, +maxLocalStorage!])
      }
    } else {
      navigate(PATH.LOGIN)
    }
  }, [isAuth, isMyPacks, user_id])

  const addPackOnClickHandler = (packName: string, isPrivate: boolean) => {
    if (isMyPacks) {
      dispatch(addPackTC(packName, isPrivate, user_id))
    } else {
      dispatch(addPackTC(packName, isPrivate))
    }
  }
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value)
  const showPacksCardsOnClickHandler = () => setIsMyPacks(!isMyPacks)

  const minMaxCardsValueChangeHandler = (event: Event, newValue: number | number[]) => {
    setMinMaxCardsValue(newValue as number[])
    let value = newValue as number[]
    let minValue = value[0].toString()
    let maxValue = value[1].toString()
    localStorage.setItem('minLocalStorage', minValue)
    localStorage.setItem('maxLocalStorage', maxValue)
  }

  const noFiltersOnClickHandler = () => {
    dispatch(getPacksTC({ min: 0, max: 100, packName: 'english', pageCount: 10, page: 1 }))
    setMinMaxCardsValue([0, 110])
    setInputValue('')
    localStorage.setItem('minLocalStorage', '0')
    localStorage.setItem('maxLocalStorage', '100')
  }

  useDebouncedEffect(
    () => {
      isMyPacks
        ? dispatch(
            getPacksTC({
              min: minMaxCardsValue[0],
              max: minMaxCardsValue[1],
              packName: inputValue,
              user_id,
            })
          )
        : dispatch(
            getPacksTC({ min: minMaxCardsValue[0], max: minMaxCardsValue[1], packName: inputValue })
          )
    },
    800,
    [minMaxCardsValue[0], minMaxCardsValue[1], inputValue]
  )

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(
      getPacksTC({
        min: minMaxCardsValue[0],
        max: minMaxCardsValue[1],
        page: newPage,
        pageCount: newCount,
        packName: inputValue,
      })
    )
  }

  return (
    <div className={s.allPacks}>
      <div className={s.allPacks_container}>
        <div className={s.allPacks_titleAndButton}>
          <PacksTitle title={'Packs list'} />
          <AddUpdatePackModal
            type={'add'}
            packName={''}
            isPrivate={false}
            callBack={addPackOnClickHandler}
          />
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
          <ShowPacksCards onClick={showPacksCardsOnClickHandler} isMyPacks={isMyPacks} />
          <NumberOfCards onChange={minMaxCardsValueChangeHandler} value={minMaxCardsValue} />
          <img onClick={noFiltersOnClickHandler} src={cleanFiltersIcon} alt={'filterIcon'} />
        </div>

        {isLoading ? (
          <LocalLoader />
        ) : packs.length === 0 ? (
          <div className={s.allPacks_noPacksWasFound}>
            NO PACKS WERE FOUND. REVISE YOUR FILTERS ;)
          </div>
        ) : (
          <div className={s.allPacks_table}>
            <TableForPacks packsData={packs} minMaxCardsValue={minMaxCardsValue} />
          </div>
        )}

        <div className={s.allPacks_pagination}>
          <SuperPagination
            page={page}
            itemsCountForPage={pageCount}
            totalCount={totalCount}
            onChange={onChangePagination}
          />
        </div>
      </div>
      {errorMessage && <Error message={errorMessage} />}
    </div>
  )
}
