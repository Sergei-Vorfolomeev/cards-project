import React, { useState } from 'react'
import s from './ActionsWithPacks.module.css'
import addPack from 'common/assets/pictures/addPack.svg'
import changePack from 'common/assets/pictures/changePack.svg'
import { useAppDispatch } from 'app/store'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import { DeletePackModal } from 'features/modals/DeletePackModal/DeletePackModal'
import { useSelector } from 'react-redux'

type PropsType = {
  isVisible: boolean
  packId: string
  userId: string
  packName: string
}

export const ActionsWithPacks = ({ isVisible, packId, userId, packName }: PropsType) => {
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
        <button style={{ backgroundImage: `url(${addPack})` }}></button>
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

  const updateOnClickHandler = () => {
    if (!isMyPacks) {
      dispatch(updatePackTC(packId))
    } else {
      dispatch(updatePackTC(packId, userId))
    }
  }

  return (
    <div className={s.actionsWithPacks}>
      <button style={{ backgroundImage: `url(${addPack})` }}></button>
      <button
        style={{ backgroundImage: `url(${changePack})` }}
        onClick={updateOnClickHandler}
      ></button>
      <DeletePackModal packName={packName} deleteCallBack={deleteOnClickHandler} />
      {/*<button*/}
      {/*style={*/}
      {/*  !isDisabled*/}
      {/*    ? { backgroundImage: `url(${deletePack})` }*/}
      {/*    : {*/}
      {/*        backgroundImage: `url(${deletePack})`,*/}
      {/*        opacity: 0.5,*/}
      {/*      }*/}
      {/*}*/}
      {/*onClick={}*/}
      {/*disabled={isDisabled}*/}
      {/*></button>*/}
    </div>
  )
}
