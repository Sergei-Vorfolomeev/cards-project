import React, { ChangeEvent, useState } from 'react'
import s from 'features/modals/addUpdatePackModal/AddUpdatePackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import { PackButton } from 'features/packs/p5-commonComponents/commonPackComponents/packButton/PackButton'
import styles from 'features/login/Login.module.css'
import changePack from 'common/assets/pictures/changePack.svg'

type AddPackModalPropsType = {
  callBack: (packName: string, isPrivate: boolean) => void
  packName?: string
  isPrivate?: boolean
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddUpdatePackModal = ({ callBack, packName, isPrivate }: AddPackModalPropsType) => {
  const [newPackName, setNewPackName] = useState(packName ? packName : '')
  const [privateField, setPrivateField] = useState(isPrivate ? isPrivate : false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateField(e.currentTarget.checked)
  }

  return (
    <BasicModal
      childrenButton={handleOpen =>
        packName ? (
          <img src={changePack} alt={'icon'} onClick={() => handleOpen()} />
        ) : (
          <PackButton name={'Add new pack'} onClick={() => handleOpen()} />
        )
      }
    >
      {handleClose => (
        <>
          <div className={s.titleBox}>
            <h1 className={s.title}>{packName ? 'Edit pack' : 'Add new pack'}</h1>
          </div>
          <div className={s.contentBox}>
            <div className={styles.loginInputContainer}>
              <label htmlFor="packName" className={styles.loginInputLabel}>
                Pack Name
              </label>
              <input
                name="packName"
                type="text"
                className={styles.loginInput}
                value={newPackName}
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
                  callBack(newPackName, privateField)
                  handleClose()
                  setNewPackName('')
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
