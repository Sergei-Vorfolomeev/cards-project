import React from 'react'
import styles from '../Login.module.css'
import { ErrorMessage, Field } from 'formik'

export const EmailInput = () => {
  return (
    <div className={styles.loginInputContainer}>
      <label htmlFor="email" className={styles.loginInputLabel}>
        Email
      </label>
      <Field name="email" type="email" className={styles.loginInput} />
      <ErrorMessage name="email" component="div" className={styles.error} />
    </div>
  )
}
