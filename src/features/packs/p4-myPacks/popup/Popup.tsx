import React from 'react'
import s from 'features/packs/p4-myPacks/popup/Popup.module.css'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from 'app/store'
import { getUserIdSelector } from 'features/login/selectors/loginSelectors'
import { useSelector } from 'react-redux'
import learnPack from 'common/assets/pictures/addPack.svg'

export const Popup = () => {
  const userId = useSelector(getUserIdSelector)
  const dispatch = useAppDispatch()
  const { packId, packName } = useParams()
  const navigate = useNavigate()

  const PacksTypeLocalStorage = localStorage.getItem('PackType')
    ? localStorage.getItem('PackType')
    : 'AllPacks'
  const isMyPacks = PacksTypeLocalStorage !== 'AllPacks'

  const learnOnClickHandler = (packType: 'my' | 'friend') => {
    navigate(`/learn/${packId}/${packName}/${packType}`)
  }

  const updateOnClickHandler = (packName: string, isPrivate: boolean) => {
    if (!isMyPacks) {
      dispatch(updatePackTC(packId!, packName, isPrivate))
    } else {
      dispatch(updatePackTC(packId!, packName, isPrivate, userId))
    }
  }

  const deleteOnClickHandler = () => {
    // setIsDisabled(true)
    if (!isMyPacks) {
      dispatch(deletePackTC(packId!))
    } else {
      dispatch(deletePackTC(packId!, userId))
    }
  }

  return (
    <div className={s.popupBox}>
      <div className={s.rowItem}>
        <img
          src={learnPack}
          alt={'learnIcon'}
          onClick={() => learnOnClickHandler('my')}
          className={s.learn}
        ></img>
        Learn
      </div>
      <div className={s.rowItem}>
        <AddUpdatePackModal
          type={'update'}
          callBack={updateOnClickHandler}
          packName={packName!}
          isPrivate={true}
        />
        Edit
      </div>
      <div className={s.rowItem}>
        <DeleteModal type={'pack'} title={packName!} deleteCallBack={deleteOnClickHandler} />
        Delete
      </div>
    </div>
  )
}
