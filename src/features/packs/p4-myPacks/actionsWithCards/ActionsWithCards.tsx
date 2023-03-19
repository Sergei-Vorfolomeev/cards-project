import React, { useState } from 'react'
import s from './ActionsWithCards.module.css'
import changePack from 'common/assets/pictures/changePack.svg'
import deletePack from 'common/assets/pictures/deletePack.svg'
import { useAppDispatch } from 'app/store'
import { useParams } from 'react-router-dom'
import { deleteCardTC, updateCardTC } from 'features/packs/cardsReducer'

type ActionsWithCardsPropsType = {
  cardId: string
}

export const ActionsWithCards = ({ cardId }: ActionsWithCardsPropsType) => {
  const dispatch = useAppDispatch()
  let { packId } = useParams()

  const [deleteButtonDisable, setDeleteButtonDisable] = useState<boolean>(false)

  const deleteOnClickHandler = () => {
    packId && dispatch(deleteCardTC(packId, cardId))
    setDeleteButtonDisable(true)
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
        style={
          !deleteButtonDisable
            ? { backgroundImage: `url(${deletePack})` }
            : {
                backgroundImage: `url(${deletePack})`,
                opacity: 0.5,
              }
        }
        onClick={deleteOnClickHandler}
        disabled={deleteButtonDisable}
      ></button>
    </div>
  )
}
