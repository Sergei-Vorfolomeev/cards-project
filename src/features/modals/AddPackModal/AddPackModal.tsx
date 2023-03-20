import React, { ChangeEvent, useState } from 'react'
import s from './AddPackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import { useSelector } from 'react-redux'
import { getButtonDisableSelector } from 'features/packs/selectors/packsSelectors'
import styles from 'features/login/Login.module.css'

type AddPackModalPropsType = {
  addPackCallBack: (packName: string, isPrivate: boolean) => void
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddPackModal = ({ addPackCallBack }: AddPackModalPropsType) => {
  const buttonDisableBecauseProcess = useSelector(getButtonDisableSelector)

  const [packName, setPackName] = useState('')
  const [privateField, setPrivateField] = useState(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateField(e.currentTarget.checked)
  }

  return (
    <BasicModal
      childrenButton={handleOpen => (
        <PackButton
          disable={buttonDisableBecauseProcess}
          name={'Add new pack'}
          onClick={() => handleOpen()}
        />
      )}
    >
      {handleClose => (
        <>
          <div className={s.titleBox}>
            <h1 className={s.title}>Add new pack</h1>
          </div>
          <div className={s.contentBox}>
            <div className={styles.loginInputContainer}>
              <label htmlFor="namePack" className={styles.loginInputLabel}>
                Pack Name
              </label>
              <input
                name="namePack"
                type="text"
                className={styles.loginInput}
                value={packName}
                onChange={onChangeHandler}
                autoFocus
              />
            </div>

            <div className={s.checkBoxContainer}>
              <input
                id="private"
                name="private"
                type="checkbox"
                className={s.checkbox}
                checked={privateField}
                onChange={changeCheckBoxHandler}
              />
              <label htmlFor="private" className={styles.rememberMeLabel}>
                Private Pack
              </label>
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
                  addPackCallBack(packName, privateField)
                  handleClose()
                  setPackName('')
                  setPrivateField(false)
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
