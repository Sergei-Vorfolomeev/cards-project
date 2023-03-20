import React from 'react'
import s from './DeleteModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import deletePack from 'common/assets/pictures/deletePack.svg'

type DeleteModalPropsType = {
  packName: string
  deleteCallBack: () => void
}
const cancelButtonStyle = {
  backgroundColor: '#FCFCFC',
  color: 'black',
}
const deleteButtonStyle = {
  backgroundColor: '#d32f2f',
}

export const DeleteModal = ({ packName, deleteCallBack }: DeleteModalPropsType) => {
  return (
    <BasicModal
      childrenCall={handleOpen => (
        <img src={deletePack} alt={'icon'} onClick={() => handleOpen()} />
      )}
    >
      {handleClose => (
        <>
          <div className={s.titleBox}>
            <h1 className={s.title}>Delete Pack</h1>
          </div>
          <div className={s.contentBox}>
            <span>
              Do you really want to remove <b>{packName}</b>?
              <br />
              All cards will be deleted.
            </span>
            <div className={s.buttonBox}>
              <ButtonComponent
                name={'Cancel'}
                callBack={() => handleClose()}
                style={cancelButtonStyle}
              />
              <ButtonComponent
                name={'Delete'}
                callBack={() => deleteCallBack()}
                style={deleteButtonStyle}
              />
            </div>
          </div>
        </>
      )}
    </BasicModal>
  )
}
