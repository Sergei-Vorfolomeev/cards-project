import React, { useState } from 'react'
import s from './ActionsWithCards.module.css'
import changePack from 'common/assets/pictures/changePack.svg'
import { useAppDispatch } from 'app/store'
import { useParams } from 'react-router-dom'
import { deleteCardTC, updateCardTC } from 'features/packs/cardsReducer'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'

type ActionsWithCardsPropsType = {
  cardId: string
  question: string
  answer: string
}

export const ActionsWithCards = ({ cardId, question, answer }: ActionsWithCardsPropsType) => {
  const dispatch = useAppDispatch()
  let { packId } = useParams()

  const [deleteButtonDisable, setDeleteButtonDisable] = useState<boolean>(false)

  const deleteOnClickHandler = () => {
    packId && dispatch(deleteCardTC(packId, cardId))
    // setDeleteButtonDisable(true)
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
      {/*<button*/}
      {/*  style={{ backgroundImage: `url(${changePack})` }}*/}
      {/*  onClick={updateOnClickHandler}*/}
      {/*></button>*/}
      <DeleteModal type={'card'} title={question} deleteCallBack={deleteOnClickHandler} />
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
