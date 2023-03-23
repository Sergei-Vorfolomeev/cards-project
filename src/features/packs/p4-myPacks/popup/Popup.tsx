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
import { PATH } from 'common/components/routes/RoutesComponent'

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

  const deleteOnClickHandler = (packId: string, userId: string) => {
    if (!isMyPacks) {
      dispatch(deletePackTC(packId!))
    } else {
      dispatch(deletePackTC(packId!, userId))
    }
    navigate(PATH.PACKS_ALL)
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
        <span onClick={() => learnOnClickHandler('my')}>Learn</span>
      </div>
      <div className={s.rowItem}>
        <AddUpdatePackModal
          type={'update'}
          callBack={updateOnClickHandler}
          packName={packName!}
          isPrivate={true}
        />
        <span>Edit</span>
      </div>
      <div className={s.rowItem}>
        <DeleteModal
          type={'pack'}
          title={packName!}
          deleteCallBack={() => deleteOnClickHandler(packId!, userId)}
        />
        <span>Delete</span>
      </div>
    </div>
  )
}
