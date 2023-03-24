import React from 'react'

import { useParams } from 'react-router-dom'

import s from './ActionsWithCards.module.css'

import { useAppDispatch } from 'app/store'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import { deleteCardTC, updateCardTC } from 'features/packs/cardsReducer'

type ActionsWithCardsPropsType = {
  cardId: string
  question: string
  answer: string
}

export const ActionsWithCards = ({ cardId, question, answer }: ActionsWithCardsPropsType) => {
  const dispatch = useAppDispatch()
  let { packId } = useParams()

  const deleteOnClickHandler = () => {
    packId && dispatch(deleteCardTC(packId, cardId))
  }

  const updateOnClickHandler = (cardQuestion: string, cardAnswer: string) => {
    packId && dispatch(updateCardTC(packId, cardId, cardQuestion, cardAnswer))
  }

  return (
    <div className={s.actionsWithCards}>
      <AddUpdateCardModal
        type={'update'}
        cardQuestion={question}
        cardAnswer={answer}
        callBack={updateOnClickHandler}
      />
      <DeleteModal type={'card'} title={question} deleteCallBack={deleteOnClickHandler} />
    </div>
  )
}
