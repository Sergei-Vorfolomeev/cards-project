import React, { ChangeEvent, useState } from 'react'
import s from 'features/modals/addUpdatePackModal/AddUpdatePackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import styles from 'features/login/Login.module.css'
import changePack from 'common/assets/pictures/changePack.svg'

type AddUpdateCardModalPropsType = {
  callBack: (question: string, answer: string) => void
  cardQuestion?: string
  cardAnswer?: string
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddUpdateCardModal = ({
  callBack,
  cardQuestion,
  cardAnswer,
}: AddUpdateCardModalPropsType) => {
  const [question, setQuestion] = useState(cardQuestion ? cardQuestion : '')
  const [answer, setAnswer] = useState(cardAnswer ? cardAnswer : '')

  console.log(question, answer)

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  return (
    <BasicModal
      childrenButton={handleOpen =>
        cardQuestion ? (
          <img src={changePack} alt={'icon'} onClick={() => handleOpen()} />
        ) : (
          <PackButton name={'Add new card'} onClick={() => handleOpen()} />
        )
      }
    >
      {handleClose => (
        <>
          <div className={s.titleBox}>
            <h1 className={s.title}>{cardQuestion ? 'Edit card' : 'Add new card'}</h1>
          </div>
          <div className={s.contentBox}>
            <div className={styles.loginInputContainer}>
              <label htmlFor="question" className={styles.loginInputLabel}>
                Question
              </label>
              <input
                name="question"
                type="text"
                className={styles.loginInput}
                value={question}
                onChange={onChangeQuestionHandler}
                autoFocus
              />
            </div>

            <div className={styles.loginInputContainer}>
              <label htmlFor="answer" className={styles.loginInputLabel}>
                Answer
              </label>
              <input
                name="answer"
                type="text"
                className={styles.loginInput}
                value={answer}
                onChange={onChangeAnswerHandler}
              />
            </div>

            <div className={s.buttonBox}>
              <ButtonComponent
                name={'Cancel'}
                callBack={() => handleClose()}
                style={cancelButtonStyle}
              />
              <ButtonComponent
                name={'Save'}
                callBack={() => {
                  if (cardQuestion && cardAnswer) {
                    callBack(question, answer)
                    handleClose()
                  } else {
                    callBack(question, answer)
                    handleClose()
                    setQuestion('')
                    setAnswer('')
                  }
                }}
                style={saveButtonStyle}
              />
            </div>
          </div>
        </>
      )}
    </BasicModal>
  )
}
