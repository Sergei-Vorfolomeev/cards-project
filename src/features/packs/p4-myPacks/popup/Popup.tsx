import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'app/store'
import learnPack from 'common/assets/pictures/addPack.svg'
import { PATH } from 'common/components/routes/RoutesComponent'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import s from 'features/packs/p4-myPacks/popup/Popup.module.css'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import { getPacksSelector } from 'features/packs/selectors/packsSelectors'

type Props = {
  packId: string | undefined
  packName: string
  isPrivate: boolean
  setOpenPopup: (openPopup: boolean) => void
}

export const Popup = ({ packId, packName, isPrivate, setOpenPopup }: Props) => {
  const packs = useSelector(getPacksSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const learnOnClickHandler = (packType: 'my' | 'friend') => {
    navigate(`/learn/${packId}/${packName}/${packType}`)
  }

  const updateOnClickHandler = (newPackName: string, isPrivate: boolean) => {
    packId && dispatch(updatePackTC(packId, newPackName, isPrivate))
    setOpenPopup(false)
  }

  const deleteOnClickHandler = (packId: string) => {
    const promise = dispatch(deletePackTC(packId!))

    promise.then(() => {
      navigate(PATH.PACKS_ALL)
    })
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
          packName={packName}
          isPrivate={isPrivate}
        />
        <span>Edit</span>
      </div>
      <div className={s.rowItem}>
        <DeleteModal
          type={'pack'}
          title={packName}
          deleteCallBack={() => deleteOnClickHandler(packId!)}
        />
        <span>Delete</span>
      </div>
    </div>
  )
}
