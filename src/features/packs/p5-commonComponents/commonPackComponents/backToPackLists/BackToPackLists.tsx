import React from 'react'
import s from './BackToPackLists.module.css'
import arrowBack from '../../../../../common/assets/pictures/arrowBack.svg'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../common/components/routes/RoutesComponent'
import { toggleIsMyPacksAC } from '../../../packsReducer'
import { useAppDispatch } from '../../../../../app/store'

export const BackToPackLists = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickHandler = () => {
    dispatch(toggleIsMyPacksAC(false))
    navigate(PATH.PACKS_ALL)
  }

  return (
    <div className={s.backToPackLists} onClick={onClickHandler}>
      <img src={arrowBack} alt={'arrow back'} />
      <span>Back to Packs List</span>
    </div>
  )
}
