import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { BackToPackLists } from '../packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists'

import { LearnTitle } from './commonComponentsLearn/c1-learnTitle/LearnTitle'
import { Question } from './commonComponentsLearn/c2-question/Question'
import Answer from './commonComponentsLearn/c3-answer/Answer'
import LearnButton from './commonComponentsLearn/c4-LearnButton/LearnButton'
import RateYourself from './commonComponentsLearn/c5-rateYourselft/RateYourself'
import s from './Learn.module.css'

import { setLoadingAC } from 'app/appReducer'
import { getLoadingSelector } from 'app/appSelectors'
import { useAppDispatch } from 'app/store'
import { CardType, getCardsTC, learnCardTC } from 'features/packs/cardsReducer'
import { LocalLoader } from 'features/packs/p5-commonComponents/usefullComponents/localLoader/LocalLoader'
import { getCardsDataSelector } from 'features/packs/selectors/packsSelectors'

export const Learn = () => {
  const cards = useSelector(getCardsDataSelector)
  const isLoading = useSelector(getLoadingSelector)
  const dispatch = useAppDispatch()

  const [isQuestionMode, setIsQuestionMode] = useState<boolean>(true)
  const [noMoreQuestion, setNoMoreQuestion] = useState<boolean>(false)
  const { cardsPack_id, packName, packType } = useParams()
  const [firstDataRequest, setFirstDataRequest] = useState<boolean>(true)
  const [card, setCard] = useState<CardType>({
    _id: '',
    user_id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    created: '',
    updated: '',
  })

  const [value, setValue] = useState('knew_the_answer')

  const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

        return { sum: newSum, id: newSum < rand ? i : acc.id }
      },
      { sum: 0, id: -1 }
    )

    return cards[res.id + 1]
  }

  useEffect(() => {
    setValue('knew_the_answer')
    setNoMoreQuestion(false)

    if (firstDataRequest) {
      dispatch(getCardsTC({ cardsPack_id }))
      setFirstDataRequest(false)
    }

    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }, [cardsPack_id, cards, firstDataRequest])

  const onClickNextButtonHandler = () => {
    dispatch(setLoadingAC(true))
    setFirstDataRequest(false)
    let cardGrade: number

    value === 'did_not_know'
      ? (cardGrade = 1)
      : value === 'forgot'
      ? (cardGrade = 2)
      : value === 'a_lot_of_thought'
      ? (cardGrade = 3)
      : value === 'confused'
      ? (cardGrade = 4)
      : (cardGrade = 5)

    if (value === 'knew_the_answer' && cards.length <= 1) {
      setNoMoreQuestion(true)
    } else {
      dispatch(learnCardTC(cardGrade, card._id))
      setIsQuestionMode(true)
    }
  }

  const backToPack =
    packType === 'friend' ? `/friendsPack/${cardsPack_id}` : `/myPack/${cardsPack_id}/${packName}`

  if (noMoreQuestion) {
    return (
      <>
        <div style={{ marginLeft: '10%' }}>
          <BackToPackLists
            navigation={backToPack}
            buttonName={
              packType === 'friend'
                ? `Back to Friend Pack: ${packName}`
                : `Back to My Pack: ${packName}`
            }
          />
        </div>
        <div className={s.noMoreCards}>
          Congratulations! You have learned all cards! Choose another pack :)
        </div>
      </>
    )
  } else {
    return (
      <div className={s.learn}>
        <div style={{ marginLeft: '10%' }}>
          <BackToPackLists
            navigation={`/friendsPack/${cardsPack_id}/${packName}`}
            buttonName={
              packType === 'friend'
                ? `Back to Friend Pack: ${packName}`
                : `Back to My Pack: ${packName}`
            }
          />
        </div>
        <div className={s.learn_container}>
          <LearnTitle title={packName!} />
        </div>

        {/*Loader*/}
        {isLoading ? (
          <LocalLoader />
        ) : (
          <div className={s.learn_body}>
            <Question question={card.question} shots={card.shots} />

            {isQuestionMode ? (
              <LearnButton title={'Show answer'} onClick={() => setIsQuestionMode(false)} />
            ) : (
              <div>
                <Answer answer={`${card.answer}`} />
                <RateYourself value={value} setValue={setValue} />
                <LearnButton title={'Next'} onClick={onClickNextButtonHandler} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
