import React from 'react'
import s from './SentEmail.module.css'
import ForgotTitle from '../f4-common/forgotTitle/ForgotTitle'
import checkEmailImg from '../../../../common/assets/pictures/checkEmail.svg'
import ForgotButton from '../f4-common/forgotButton/ForgotButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../common/components/routes/RoutesComponent'
import { useSelector } from 'react-redux'
import { getEmailSelector } from 'features/login/selectors/loginSelectors'

const SentEmail = () => {
  const email = useSelector(getEmailSelector)
  const navigate = useNavigate()

  const buttonOnClickHandler = () => {
    return navigate(PATH.LOGIN)
  }

  return (
    <div className={s.sentEmail}>
      <div className={s.sentEmail_container}>
        <ForgotTitle text={'Check Email'} />
        <img src={checkEmailImg} alt={'check Email picture'} />
        <p>We’ve sent an Email with instructions to </p>
        <p>{email}</p>
        <ForgotButton text={'Back to login'} onClick={buttonOnClickHandler} />
      </div>
    </div>
  )
}

export default SentEmail
