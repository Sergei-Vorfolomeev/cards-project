import React, {useEffect, useState} from 'react';
import s from './Learn.module.css';
import {LearnTitle} from "./commonComponentsLearn/c1-learnTitle/LearnTitle";
import {Question} from "./commonComponentsLearn/c2-question/Question";
import {useParams} from 'react-router-dom';
import LearnButton from "./commonComponentsLearn/c4-LearnButton/LearnButton";
import Answer from "./commonComponentsLearn/c3-answer/Answer";
import RateYourself from "./commonComponentsLearn/c5-rateYourselft/RateYourself";
import {BackToPackLists} from "../packs/p5-commonComponents/commonPackComponents/backToPackLists/BackToPackLists";
import {CardType, getCardsTC, learnCardTC} from 'features/packs/cardsReducer';
import {useAppDispatch, useAppSelector} from "app/store";


export const Learn = () => {

        const dispatch = useAppDispatch()
        const cards = useAppSelector(state => state.cards.cards)

        const [isQuestionMode, setIsQuestionMode] = useState<boolean>(true)
        const [noMoreQuestion, setNoMoreQuestion] = useState<boolean>(false)
        const {cardsPack_id, packName} = useParams()
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
        });

        const [value, setValue] = React.useState('knew_the_answer');

        const getCard = (cards: CardType[]) => {
            const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
            const rand = Math.random() * sum;
            const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                    const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                    return {sum: newSum, id: newSum < rand ? i : acc.id}
                }
                , {sum: 0, id: -1});
            return cards[res.id + 1];
        }

        useEffect(() => {
            setValue('knew_the_answer')
            setNoMoreQuestion(false)

            if (firstDataRequest) {
                dispatch(getCardsTC({cardsPack_id}))
                setFirstDataRequest(false)
            }

            if (cards.length > 0) {
                setCard(getCard(cards))
            }

        }, [cardsPack_id, cards, firstDataRequest])


        const onClickNextButtonHandler = () => {
            setFirstDataRequest(false);
            let cardGrade: number;

            value === 'did_not_know' ? cardGrade = 1 :
                value === 'forgot' ? cardGrade = 2 :
                    value === 'a_lot_of_thought' ? cardGrade = 3 :
                        value === 'confused' ? cardGrade = 4 :
                            cardGrade = 5

            if (value === 'knew_the_answer' && cards.length <= 1) {
                setNoMoreQuestion(true)
            } else {
                dispatch(learnCardTC(cardGrade, card._id))
                setIsQuestionMode(true)

            }
        }


        if (noMoreQuestion) {
            return (
                <>
                    <div style={{marginLeft: '10%'}}><BackToPackLists
                        navigation={`/friendsPack/${cardsPack_id}/${packName}`}/>
                    </div>
                    <div className={s.noMoreCards}>No more cards in this pack. Start again ;)</div>
                </>)
        } else {

            return (

                <div className={s.learn}>

                    <div style={{marginLeft: '10%'}}><BackToPackLists
                        navigation={`/friendsPack/${cardsPack_id}/${packName}`}/>
                    </div>
                    <div className={s.learn_container}>
                        <LearnTitle title={packName!}/>
                    </div>
                    <div className={s.learn_body}>
                        <Question question={card.question} shots={card.shots}/>

                        {isQuestionMode ?
                            <LearnButton title={'Show answer'} onClick={() => setIsQuestionMode(false)}/> :
                            <div>
                                <Answer answer={`${card.answer}`}/>
                                <RateYourself value={value} setValue={setValue}/>
                                <LearnButton title={'Next'} onClick={onClickNextButtonHandler}/>
                            </div>
                        }

                    </div>
                </div>
            );
        }
    }
;

