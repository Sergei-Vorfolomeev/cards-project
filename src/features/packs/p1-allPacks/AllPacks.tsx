import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './AllPacks.module.css'
import { PacksTitle } from '../p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { PackButton } from '../p5-commonComponents/commonPackComponents/packButton/PackButton'
import { PacksInput } from '../p5-commonComponents/commonPackComponents/packsInput/PacksInput'
import { ShowPacksCards } from '../p5-commonComponents/usefullComponents/showPacksCards/ShowPacksCards'
import { NumberOfCards } from '../p5-commonComponents/usefullComponents/numberOfCards/NumberOfCards'
import cleanFiltersIcon from '../../../common/assets/pictures/cleanFiletetIcon.svg'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../common/components/routes/RoutesComponent'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { addPackTC, getAllPacksTC } from '../packsReducer'
import { getIsAuth } from '../../login/loginSelectors'
import { useSelector } from 'react-redux'
import { Loader } from '../../../common/components/loader/Loader'
import { Error } from '../../../common/components/error/Error'
import { TableForPacks } from './allPacksTable/TableForPacks'

export const AllPacks = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  const isAuth = useSelector(getIsAuth)
  const isLoading = useAppSelector(state => state.app.loading)
  const errorMessage = useAppSelector(state => state.app.errorMessage)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState<string>('')
  const [minMaxCardsValue, setMinMaxCardsValue] = React.useState<number[]>([0, 100])

  useEffect(() => {
    if (isAuth) {
      dispatch(getAllPacksTC())
    } else {
      navigate('/login')
    }
  }, [isAuth])

  const buttonOnClickHandler = () => {
    dispatch(addPackTC())
  }
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const showPacksCardsOnClickHandler = () => {
    return navigate(PATH.PACK_MY)
  }
  const minMaxCardsValueChangeHandler = (event: Event, newValue: number | number[]) => {
    setMinMaxCardsValue(newValue as number[])
  }

  return (
    <div className={s.allPacks}>
      {isLoading && <Loader />}
      <div className={s.allPacks_container}>
        <div className={s.allPacks_titleAndButton}>
          <PacksTitle title={'Packs list'} />
          <PackButton name={'Add new pack'} onClick={buttonOnClickHandler} />
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
          <ShowPacksCards onClick={showPacksCardsOnClickHandler} />
          <NumberOfCards onChange={minMaxCardsValueChangeHandler} value={minMaxCardsValue} />
          <img src={cleanFiltersIcon} />
        </div>
        <div className={s.allPacks_table}>
          <TableForPacks packsData={packs} />
        </div>
        <div className={s.allPacks_pagination}></div>
      </div>
      {errorMessage && <Error message={errorMessage} />}
    </div>
  )
}
