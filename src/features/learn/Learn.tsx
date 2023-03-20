import React, {useState} from 'react';
import s from './Learn.module.css';
import {LearnTitle} from "./commonComponentsLearn/c1-learnTitle/LearnTitle";
import {boolean} from "yup";
import {Question} from "./commonComponentsLearn/c2-question/Question";
import {useSearchParams} from 'react-router-dom';
import LearnButton from "./commonComponentsLearn/c4-LearnButton/LearnButton";
import Answer from "./commonComponentsLearn/c3-answer/Answer";
import RateYourself from "./commonComponentsLearn/c5-rateYourselft/RateYourself";
import {BackToPackLists} from "../packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";

export const Learn = () => {

    const [isQuestionMode, setIsQuestionMode] = useState<boolean>(true)
    const [searchParams] = useSearchParams()
    const params = Object.fromEntries(searchParams)

    return (
        <div className={s.learn}>
            <div style={{marginLeft: '10%'}}><BackToPackLists/></div>
            <div className={s.learn_container}>

                <LearnTitle title={`Learn: "${params.packName}"`}/>
            </div>
            <div className={s.learn_body}>
                <Question question={`Question: ${params.question}`}/>
                {isQuestionMode ?
                    <LearnButton title={'Show answer'} onClick={() => setIsQuestionMode(false)}/> :
                    <div>
                        <Answer answer={`Answer: ${params.answer}`}/>
                        <RateYourself/>
                        <LearnButton title={'Next'} onClick={() => {
                        }}/>
                    </div>
                }
            </div>
        </div>
    );
};

