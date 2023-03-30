import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import s from './EmptyPack.module.css'

import { getLoadingSelector } from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
import defaultCover from 'common/assets/pictures/noCoverImg-resized.jpeg'
import { Loader } from 'common/components/loader/Loader'
import { AddUpdateCardModal } from 'features/modals/addUpdateCardModal/AddUpdateCardModal'
import { addCardTC, getCardsTC } from 'features/packs/cardsReducer'
import { BackToPackLists } from 'features/packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'
import { PacksTitle } from 'features/packs/p5-commonComponents/commonPackComponents/packTitle/PacksTitle'
import {
  getCardsCountSelector,
  getPackDeckCoverSelector,
  getPackNameSelector,
} from 'features/packs/selectors/packsSelectors'

export const EmptyPack = () => {
  // В этой компоненте необходимо делать GET-запрос чтобы получить данные колоды,
  // чтобы отрисовать обложку, имя. Если делать это через useEffect, то после
  // редиректа на 40 строчке, запросы дублируются и один из них реджектится
  // с ошибкой. Нужно переписать эту компоненту. Я думаю можно не делать отдельный
  // роут под Empty Pack, а просто отрисовывать ее в компоненте всех паков, если
  // карточки === 0. А данные прокидывать внутрь через пропсы. Если справишься,
  // будет просто бомбово! Спасибо :)

  // P.S. сейчас обложки и имена в пустых паках отображаются не корректно, тк нет запроса,
  // стор не обновляется и отображаются старые данные

  const cardsCount = useSelector(getCardsCountSelector)
  const packDeckCover = useSelector(getPackDeckCoverSelector)
  const packName = useSelector(getPackNameSelector)
  const isLoading = useSelector(getLoadingSelector)

  const dispatch = useAppDispatch()

  const packId = useParams().packId

  if (cardsCount !== 0) {
    return <Navigate to={`/myPack/${packId}/${packName}`} />
  }

  const addCardOnClickHandler = (
    cardQuestion: string,
    cardAnswer: string,
    questionImg?: string
  ) => {
    packId && dispatch(addCardTC(packId, cardQuestion, cardAnswer, questionImg))
  }

  // useEffect(() => {
  //   packId && dispatch(getCardsTC({ cardsPack_id: packId }))
  // }, [packId])

  if (isLoading) return <Loader />

  return (
    <div className={s.emptyPacks_container}>
      <div className={s.emptyPacks}>
        <BackToPackLists />
        <PacksTitle title={packName} />
        <div className={s.deckCoverBox}>
          {!packDeckCover ? (
            <img src={defaultCover} alt="" className={s.deckCover} />
          ) : (
            <img src={packDeckCover} alt="" className={s.deckCover} />
          )}
        </div>
        <div className={s.emptyPacks_info}>
          This pack is empty. Click add new card to fill this pack
        </div>

        <AddUpdateCardModal
          type={'add'}
          callBack={addCardOnClickHandler}
          cardQuestion={''}
          cardAnswer={''}
          questionFormatValue={'text'}
          questionImg={''}
        />
      </div>
    </div>
  )
}
