import React from 'react'

import s from './Question.module.css'

type PropsType = {
  question: string
  shots: number
}

export const Question = ({ question, shots }: PropsType) => {
  return (
    <div className={s.question}>
      <span className={s.question_text}>Question: </span>
      <span className={s.question_questionText}>{question}</span>
      <div className={s.question_attempts}>{`Количество попыток ответов на вопрос: ${shots}`}</div>
    </div>
  )
}
