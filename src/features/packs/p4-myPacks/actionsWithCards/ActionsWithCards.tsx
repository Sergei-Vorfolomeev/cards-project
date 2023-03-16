import React from 'react'
import s from './ActionsWithCards.module.css'
import changePack from '../../../../common/assets/pictures/changePack.svg'
import deletePack from '../../../../common/assets/pictures/deletePack.svg'
import { deletePackTC, updatePackTC } from '../../packsReducer'
import { useAppDispatch } from '../../../../app/store'
import { deleteCardTC, updateCardTC } from '../../cardsReducer'
import { useParams } from 'react-router-dom'

type ActionsWithCardsPropsType = {
  cardId: string
}

export const ActionsWithCards = ({ cardId }: ActionsWithCardsPropsType) => {
  const dispatch = useAppDispatch()
  let { packId } = useParams()

  const deleteOnClickHandler = () => {
    packId && dispatch(deleteCardTC(packId, cardId))
  }

  const updateOnClickHandler = () => {
    packId && dispatch(updateCardTC(packId, cardId))
  }

  return (
    <div className={s.actionsWithCards}>
      <button
        style={{ backgroundImage: `url(${changePack})` }}
        onClick={updateOnClickHandler}
      ></button>
      <button
        style={{ backgroundImage: `url(${deletePack})` }}
        onClick={deleteOnClickHandler}
      ></button>
    </div>
  )
}
