import React, { useState } from 'react'
import s from './ActionsWithPacks.module.css'
import learnPack from 'common/assets/pictures/addPack.svg'
import { useAppDispatch } from 'app/store'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import { useNavigate } from 'react-router-dom'
import { AddUpdatePackModal } from 'features/modals/addUpdatePackModal/AddUpdatePackModal'
import { DeleteModal } from 'features/modals/deleteModal/DeleteModal'

type PropsType = {
  isVisible: boolean
  packId: string
  userId: string
  packName: string
  cardsNumber: number
  isPrivate: boolean
}

export const ActionsWithPacks = ({
  isVisible,
  packId,
  userId,
  packName,
  isPrivate,
  cardsNumber,
}: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isDisabled, setIsDisabled] = useState(false)

  const PacksTypeLocalStorage = localStorage.getItem('PackType')
    ? localStorage.getItem('PackType')
    : 'AllPacks'
  const isMyPacks = PacksTypeLocalStorage !== 'AllPacks'

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

  const learnOnClickHandler = () => {
    navigate(`/learn/${packId}/${packName}`)
  }

  if (!isVisible) {
    return (
        <div className={s.actionsWithPacks}>
          <button disabled={cardsNumber === 0}
                  style={cardsNumber !== 0 ? {
                    backgroundImage: `url(${learnPack})`,
                    cursor: 'pointer'
                  } : {backgroundImage: `url(${learnPack})`, cursor: 'pointer', opacity: 0.5}}
                  onClick={learnOnClickHandler}></button>
        </div>
    )
  }

  return (
    <div className={s.actionsWithPacks}>
      <button
        style={
          cardsNumber !== 0
            ? {
                backgroundImage: `url(${learnPack})`,
                cursor: 'pointer',
              }
            : { backgroundImage: `url(${learnPack})`, cursor: 'pointer', opacity: 0.5 }
        }
        onClick={learnOnClickHandler}
        disabled={cardsNumber === 0}
      ></button>
      <AddUpdatePackModal
        type={'update'}
        callBack={updateOnClickHandler}
        packName={packName}
        isPrivate={isPrivate}
      />
      <DeleteModal type={'pack'} title={packName} deleteCallBack={deleteOnClickHandler} />
    </div>
  )
}
