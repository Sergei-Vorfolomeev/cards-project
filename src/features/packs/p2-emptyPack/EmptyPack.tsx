import React from 'react'
import s from './EmptyPack.module.css'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { useAppDispatch } from 'app/store'
import { addCardTC } from 'features/packs/cardsReducer'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { Navigate, useParams } from 'react-router-dom'
import {
  getButtonDisableSelector,
  getCardsCountSelector,
} from 'features/packs/selectors/packsSelectors'
import { useSelector } from 'react-redux'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/addUpdateCardModal'

export const EmptyPack = () => {
  const cardsCount = useSelector(getCardsCountSelector)
  const buttonDisableBecauseProcess = useSelector(getButtonDisableSelector)

  const dispatch = useAppDispatch()

  const packId = useParams().packId
  const packName = useParams().packName

  if (cardsCount !== 0) {
    return <Navigate to={`/myPack/${packId}/${packName}`} />
  }

  const addCardOnClickHandler = (cardQuestion: string, cardAnswer: string) => {
    packId && dispatch(addCardTC(packId, cardQuestion, cardAnswer))
  }

  return (
    <div className={s.emptyPacks_container}>
      <div className={s.emptyPacks}>
        <BackToPackLists />
        <PacksTitle title={packName!} />
        <div className={s.emptyPacks_info}>
          This pack is empty. Click add new card to fill this pack
        </div>
        <AddUpdateCardModal callBack={addCardOnClickHandler} />
        {/*<PackButton*/}
        {/*  disable={buttonDisableBecauseProcess}*/}
        {/*  name={'Add new card'}*/}
        {/*  onClick={onClickButtonHandler}*/}
        {/*/>*/}
      </div>
    </div>
  )
}
