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
import { TableForPacks } from '../p5-commonComponents/commonPackComponents/tables/tableForPacks/TableForPacks'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { addPackTC, getAllPacksTC } from '../packsReducer'

export const AllPacks = () => {
  console.log('AllPacks render')
  const packs = useAppSelector(state => state.packs.cardPacks)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('')
  const [minMaxCardsValue, setMinMaxCardsValue] = useState<number[]>([0, 100])

  useEffect(() => {
    dispatch(getAllPacksTC())
  }, [])

  const buttonOnClickHandler = () => {
    dispatch(addPackTC())
  }
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const showPacksCardsOnClickHandler = () => {
    return navigate(PATH.PACKS_MY)
  }
  const minMaxCardsValueChangeHandler = (event: Event, newValue: number | number[]) => {
    setMinMaxCardsValue(newValue as number[])
  }

  return (
    <div className={s.allPacks}>
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
    </div>
  )
}

let testData = [
  {
    _id: 'string',
    user_id: 'string',
    name: 'string',
    cardsCount: 1,
    created: '12.11.2002',
    updated: '11.22.2022',
  },
  {
    _id: 'string',
    user_id: 'string',
    name: 'string',
    cardsCount: 110,
    created: '12.11.2001',
    updated: '1.22.2005',
  },
  {
    _id: 'string',
    user_id: 'string',
    name: 'string',
    cardsCount: 12,
    created: '2.11.2006',
    updated: '1.22.2010',
  },
]
