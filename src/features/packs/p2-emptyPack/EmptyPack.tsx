import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import s from './EmptyPack.module.css'

import { useAppDispatch } from 'app/store'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'
import { addCardTC } from 'features/packs/cardsReducer'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import { getCardsCountSelector } from 'features/packs/selectors/packsSelectors'

export const EmptyPack = () => {
  const cardsCount = useSelector(getCardsCountSelector)

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

        <AddUpdateCardModal
          type={'add'}
          callBack={addCardOnClickHandler}
          cardQuestion={''}
          cardAnswer={''}
        />
      </div>
    </div>
  )
}
