import React, { ChangeEvent, useState } from 'react'
import styles from '../Login.module.css'
import { ErrorMessage, Field } from 'formik'
import passwordEye from '../../../common/assets/pictures/eye.svg'
import passwordEyeHide from '../../../common/assets/pictures/eye-off.svg'

type PropsType = {
  isHidden: boolean
  OnClick: () => void
}

export const PasswordInput = ({ isHidden, OnClick }: PropsType) => {
  return (
    <div className={styles.loginInputContainer}>
      <label htmlFor="password" className={styles.loginInputLabel}>
        Password
      </label>
      <Field name="password" type={isHidden ? 'password' : 'text'} className={styles.loginInput} />
      {isHidden ? (
        <img
          className={styles.registrationEye}
          src={passwordEye}
          onClick={OnClick}
          alt={'passwordEye'}
        />
      ) : (
        <img
          className={styles.registrationEye}
          src={passwordEyeHide}
          onClick={OnClick}
          alt={'passwordEyeHide'}
        />
      )}
      <ErrorMessage name="password" component="div" className={styles.error} />
    </div>
  )
}
