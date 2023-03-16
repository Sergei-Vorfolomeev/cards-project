import React, {MouseEvent, useState} from 'react'
import s from './ActionsWithPacks.module.css'
import addPack from '../../../../common/assets/pictures/addPack.svg'
import changePack from '../../../../common/assets/pictures/changePack.svg'
import deletePack from '../../../../common/assets/pictures/deletePack.svg'
import { deletePackTC, updatePackTC } from '../../packsReducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'


type PropsType = {
  isVisible: boolean
  cardsQuantity: number
  packId: string
  userId: string
}

export const ActionsWithPacks = ({ isVisible, cardsQuantity, packId, userId }: PropsType) => {
  const isMyPacks = useAppSelector(state => state.packs.isMyPacks)
  const [isDisabled ,setIsDisabled] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  if (!isVisible) {
    return (
      <div className={s.actionsWithPacks}>
        <button style={{ backgroundImage: `url(${addPack})` }}></button>
      </div>
    )
  }

  const deleteOnClickHandler = () => {
    setIsDisabled(true)
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
      <button
        style={!isDisabled ? { backgroundImage: `url(${deletePack})` }: { backgroundImage: 'none' }}
        onClick={deleteOnClickHandler}
        disabled={isDisabled}
      ></button>
    </div>
  )
}
