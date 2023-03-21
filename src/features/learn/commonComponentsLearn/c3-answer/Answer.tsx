import React from 'react';
import s from './Answer.module.css'

const Answer = ({answer}:{answer:string}) => {
    return <div className={s.answer}>
        <div className={s.answer_text}>Answer: </div>
        <div className={s.answer_answerText}> {answer}</div>
    </div>

};

export default Answer;