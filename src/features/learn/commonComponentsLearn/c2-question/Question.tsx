import React from 'react';
import s from './Question.module.css'

type PropsType = {
    question: string
}

export const Question = ({question}: PropsType) => {
    return <div className={s.question}>
        <div className={s.question_text}>Question: <span>{question}</span></div>
        <div className={s.question_attempts}>Количество попыток ответов на вопрос: 10</div>
    </div>

};

