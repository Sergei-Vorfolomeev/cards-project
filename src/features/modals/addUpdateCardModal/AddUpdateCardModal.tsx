import React, { ChangeEvent, useState } from 'react'

import updatePack from 'common/assets/pictures/changePack.svg'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import s from 'features/modals/addUpdatePackModal/AddUpdatePackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { InputComponent } from 'features/modals/commonComponents/input/InputComponent'
import styles from 'features/modals/commonComponents/input/InputComponent.module.css'
import { Title } from 'features/modals/commonComponents/title/Title'

type AddUpdateCardModalPropsType = {
  type: 'add' | 'update'
  cardQuestion: string
  cardAnswer: string
  callBack: (question: string, answer: string) => void
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddUpdateCardModal = ({
  type,
  cardQuestion,
  cardAnswer,
  callBack,
}: AddUpdateCardModalPropsType) => {
  const [question, setQuestion] = useState(cardQuestion)
  const [answer, setAnswer] = useState(cardAnswer)

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value.trim())
  }
  const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value.trim())
  }

  return (
    <BasicModal
      childrenButton={handleOpen =>
        type === 'update' ? (
          <img src={updatePack} alt={'icon'} onClick={() => handleOpen()} />
        ) : (
          <ButtonComponent name={'Add new card'} callBack={() => handleOpen()} />
        )
      }
    >
      {handleClose => (
        <>
          <Title
            condition={type === 'update'}
            firstTitle={'Edit card'}
            secondTitle={'Add new card'}
          />

          <div className={s.contentBox}>
            <InputComponent
              name={'question'}
              value={question}
              onChange={onChangeQuestionHandler}
              autoFocus={true}
              labelName={'Question'}
            />

            <InputComponent
              name={'answer'}
              value={answer}
              onChange={onChangeAnswerHandler}
              autoFocus={false}
              labelName={'Answer'}
            />

            <div className={s.buttonBox}>
              <ButtonComponent
                name={'Cancel'}
                callBack={() => {
                  handleClose()
                }}
                style={cancelButtonStyle}
              />
              <ButtonComponent
                name={'Save'}
                callBack={() => {
                  if (type === 'update') {
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
                disabled={question === '' || answer === ''}
              />
            </div>
          </div>
        </>
      )}
    </BasicModal>
  )
}
