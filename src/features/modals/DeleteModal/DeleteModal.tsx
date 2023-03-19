import React from 'react'
import s from './DeleteModal.module.css'
import { BasicModal } from 'features/modals/BasicModal'
import { ButtonComponent } from 'common/components/button/ButtonComponent'
import deletePack from 'common/assets/pictures/deletePack.svg'
import Button from '@mui/material/Button'

type DeleteModalPropsType = {
  packName: string
  cancelCallBack?: () => void
  deleteCallBack: () => void
}

export const DeleteModal = ({ packName, deleteCallBack, cancelCallBack }: DeleteModalPropsType) => {
  return (
    <BasicModal icon={deletePack}>
      <div className={s.titleBox}>
        <h1 className={s.title}>Delete Pack</h1>
      </div>
      <div className={s.contentBox}>
        <span>
          Do you really want to remove <b>{packName}</b>?
          <br />
          All cards will be deleted
        </span>
        {/*<span>All cards will be deleted</span>*/}
        <div className={s.buttonBox}>
          <Button
            variant="outlined"
            style={{ borderRadius: '30px' }}
            color={'primary'}
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ borderRadius: '30px' }}
            color={'error'}
            onClick={() => deleteCallBack()}
          >
            Delete
          </Button>
          {/*<Button name={'Cancel'} callBack={() => {}} />*/}
          {/*<Button name={'Delete'} callBack={() => {}} />*/}
        </div>
      </div>
    </BasicModal>
  )
}
