import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loginTC } from './authReducer'
import { NavLink } from 'react-router-dom'
import styles from './Login.module.css'
import { Loader } from '../../common/components/loader/Loader'

export const Login = () => {
  const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
  const loading = useAppSelector(state => state.registrationReducer.loading)
  const dispatch = useAppDispatch()

  // eslint-disable-next-line react/jsx-no-undef
  // if (isAuth) return <Navigate to={<Profile />} />
  return (
    <div className={styles.login}>
      {loading && <Loader />}
      <h2>Sign In</h2>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required field'),
          password: Yup.string()
            .max(25, 'Password must be 25 characters or less')
            .min(5, 'Password must be 5 characters or more')
            .required('Required field'),
        })}
        onSubmit={(values, { resetForm }) => {
          dispatch(loginTC(values))
          resetForm()
        }}
      >
        <Form>
          <div className={styles.loginInputContainer}>
            <label htmlFor="email" className={styles.loginInputLabel}>
              Email
            </label>
            <Field name="email" type="email" className={styles.loginInput} />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="password" className={styles.loginInputLabel}>
              Password
            </label>
            <Field name="password" type="password" className={styles.loginInput} />
            <ErrorMessage name="password" />
          </div>

          <div>
            <Field name="rememberMe" type="checkbox" className={styles.loginCheckbox} />
            <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
              Remember me
            </label>
            <ErrorMessage name="rememberMe" />
          </div>

          <div className={styles.forgotPasswordContainer}>
            <NavLink to={'/recover-password'} className={styles.forgotPassword}>
              Forgot password?
            </NavLink>
          </div>

          <button type="submit">Sign In</button>

          <div>Already have an account?</div>
          <p>
            <NavLink to={'/registration'}>Sign Up</NavLink>
          </p>
        </Form>
      </Formik>
    </div>
  )
}
