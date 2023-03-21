import React, { ChangeEvent, useState } from 'react'
import s from 'features/modals/addUpdatePackModal/AddUpdatePackModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import styles from 'features/login/Login.module.css'
import updatePack from 'common/assets/pictures/changePack.svg'
import { InputComponent } from 'features/modals/commonComponents/input/InputComponent'
import { CheckBoxComponent } from 'features/modals/commonComponents/checkbox/CheckBoxComponent'
import { Title } from 'features/modals/commonComponents/title/Title'

type AddPackModalPropsType = {
  type: 'add' | 'update'
  callBack: (packName: string, isPrivate: boolean) => void
  packName: string
  isPrivate: boolean
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const saveButtonStyle = {
  backgroundColor: '#366EFF',
}

export const AddUpdatePackModal = ({
  type,
  callBack,
  packName,
  isPrivate,
}: AddPackModalPropsType) => {
  const [newPackName, setNewPackName] = useState(packName)
  const [privateField, setPrivateField] = useState(isPrivate)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateField(e.currentTarget.checked)
  }

  return (
    <BasicModal
      childrenButton={handleOpen =>
        type === 'update' ? (
          <img src={updatePack} alt={'icon'} onClick={() => handleOpen()} />
        ) : (
          <ButtonComponent name={'Add new pack'} callBack={() => handleOpen()} />
        )
      }
    >
      {handleClose => (
        <>
          <Title
            condition={type === 'update'}
            firstTitle={'Edit pack'}
            secondTitle={'Add new pack'}
          />

          <div className={s.contentBox}>
            <InputComponent
              labelName={'Pack Name'}
              name={'packName'}
              value={newPackName}
              onChange={onChangeHandler}
              autoFocus={true}
            />

            <CheckBoxComponent
              checked={privateField}
              name={'private'}
              type={'checkbox'}
              labelName={'Private pack'}
              id={'private'}
              onChange={changeCheckBoxHandler}
            />

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
