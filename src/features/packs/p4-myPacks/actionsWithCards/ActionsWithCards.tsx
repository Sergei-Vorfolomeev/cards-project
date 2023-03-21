import React, { useState } from 'react'
import s from './ActionsWithCards.module.css'
import changePack from 'common/assets/pictures/changePack.svg'
import { useAppDispatch } from 'app/store'
import { useParams } from 'react-router-dom'
import { deleteCardTC, updateCardTC } from 'features/packs/cardsReducer'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'

type ActionsWithCardsPropsType = {
  cardId: string
  question: string
}

export const ActionsWithCards = ({ cardId, question }: ActionsWithCardsPropsType) => {
  const dispatch = useAppDispatch()
  let { packId } = useParams()

  const [deleteButtonDisable, setDeleteButtonDisable] = useState<boolean>(false)

  const deleteOnClickHandler = () => {
    packId && dispatch(deleteCardTC(packId, cardId))
    // setDeleteButtonDisable(true)
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
      <DeleteModal title={question} deleteCallBack={deleteOnClickHandler} />
      {/*<button*/}
      {/*  style={*/}
      {/*    !deleteButtonDisable*/}
      {/*      ? { backgroundImage: `url(${deletePack})` }*/}
      {/*      : {*/}
      {/*          backgroundImage: `url(${deletePack})`,*/}
      {/*          opacity: 0.5,*/}
      {/*        }*/}
      {/*  }*/}
      {/*  onClick={deleteOnClickHandler}*/}
      {/*  disabled={deleteButtonDisable}*/}
      {/*></button>*/}
    </div>
  )
}
