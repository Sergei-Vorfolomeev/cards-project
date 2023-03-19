import React from 'react'
import s from './EmptyPack.module.css'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { useAppDispatch } from 'app/store'
import { addCardTC } from 'features/packs/cardsReducer'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { Navigate, useParams } from 'react-router-dom'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import {
  getButtonDisableSelector,
  getCardsCountSelector,
} from 'features/packs/selectors/packsSelectors'
import { useSelector } from 'react-redux'

export const EmptyPack = () => {
  const cardsCount = useSelector(getCardsCountSelector)
  const buttonDisableBecauseProcess = useSelector(getButtonDisableSelector)

  const dispatch = useAppDispatch()

  const packId = useParams().packId
  const packName = useParams().packName

  if (cardsCount !== 0) {
    return <Navigate to={`/myPack/${packId}/${packName}`} />
  }

  const onClickButtonHandler = () => {
    dispatch(addCardTC(packId!))
  }

  return (
    <div className={s.emptyPacks_container}>
      <div className={s.emptyPacks}>
        <BackToPackLists />
        <PacksTitle title={packName!} />
        <div className={s.emptyPacks_info}>
          This pack is empty. Click add new card to fill this pack
        </div>
        <PackButton
          disable={buttonDisableBecauseProcess}
          name={'Add new card'}
          onClick={onClickButtonHandler}
        />
      </div>
    </div>
  )
}
