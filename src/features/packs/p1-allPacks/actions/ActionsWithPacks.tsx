import React, { useState } from 'react'
import s from './ActionsWithPacks.module.css'
import learnPack from 'common/assets/pictures/addPack.svg'
import { useAppDispatch } from 'app/store'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'
import { useSelector } from 'react-redux'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'

type PropsType = {
  isVisible: boolean
  packId: string
  userId: string
  packName: string
  isPrivate: boolean
}

export const ActionsWithPacks = ({ isVisible, packId, userId, packName, isPrivate }: PropsType) => {
  // const packName = useSelector()

  const [isDisabled, setIsDisabled] = useState(false)

  const PacksTypeLocalStorage = localStorage.getItem('PackType')
    ? localStorage.getItem('PackType')
    : 'AllPacks'
  const isMyPacks = PacksTypeLocalStorage !== 'AllPacks'

  const dispatch = useAppDispatch()

  if (!isVisible) {
    return (
      <div className={s.actionsWithPacks}>
        <img src={learnPack} alt="learnPack" />
      </div>
    )
  }

  const deleteOnClickHandler = () => {
    // setIsDisabled(true)
    if (!isMyPacks) {
      dispatch(deletePackTC(packId))
    } else {
      dispatch(deletePackTC(packId, userId))
    }
  }

  const updateOnClickHandler = (packName: string, isPrivate: boolean) => {
    if (!isMyPacks) {
      dispatch(updatePackTC(packId, packName, isPrivate))
    } else {
      dispatch(updatePackTC(packId, packName, isPrivate, userId))
    }
  }

  return (
    <div className={s.actionsWithPacks}>
      <img src={learnPack} alt="learnPack" />
      {/*<button style={{ backgroundImage: `url(${addPack})` }}></button>*/}
      <AddUpdatePackModal
        callBack={updateOnClickHandler}
        packName={packName}
        isPrivate={isPrivate}
      />
      {/*<button*/}
      {/*  style={{ backgroundImage: `url(${changePack})` }}*/}
      {/*  onClick={updateOnClickHandler}*/}
      {/*></button>*/}
      <DeleteModal title={packName} deleteCallBack={deleteOnClickHandler} />
    </div>
  )
}
